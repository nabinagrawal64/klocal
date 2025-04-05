import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import OTP from "../models/otp.js";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        // Check if email exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            alert("User already exists with this email");
            return res.status(404).json({ 
                success: false, 
                message: "User id already exists" 
            });
        }

        // Generate and send OTP
        const otpCode = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("Generated OTP:", otpCode);

        // Check if an OTP already exists for this email
        await OTP.findOneAndUpdate(
            { email }, // Find by email
            { 
                code: otpCode, 
                expiresAt: Date.now() + 10 * 60 * 1000 // OTP expires in 10 minutes
            },
            { upsert: true, new: true } // Create if not exists
        );

        await mailSender(email, `<p>Your OTP is: <b>${otpCode}</b></p>`, "Verify Your Email");

        return res.status(200).json({ 
            success: true,
            message: "OTP sent to email",
            otpCode,
        });
    } catch (error) {
        console.log("OTP Error: ",error)
        return res.status(500).json({ 
            success: false,
            error: "Error sending OTP" 
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ 
                error: "Email and OTP are required" 
            });
        }
    
        const otpRecord = await OTP.findOne({ email });
        console.log("otpRecord", otpRecord);
        console.log("verify-otp: ", otp);
    
        if (!otpRecord || otpRecord.code !== otp || otpRecord.expiresAt < new Date()) {
            return res.status(400).json({ 
                error: "Invalid or expired OTP" 
            });
        }
    
        // OTP verified, delete it from DB
        await OTP.deleteOne({ email });
    
        return res.json({ 
            success: true, 
            message: "OTP verified" 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            error: "Error verifying OTP" 
        });
    }
};

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array() 
        });
    }

    const { firstName, lastName, email, phoneNumber, location, password } = req.body;

    try {
        // check if user already exist
        let existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ 
                error: "User already exists" 
            });
        }

        // secure password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the user
        const user = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword, location });
        await user.save();

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        return res.status(200).json({
            success: true,
            token, 
            message: "User registered,",
            user: { 
                id: user._id, 
                firstName, 
                lastName, 
                email,
                location,
            } 
        });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            message: "Register Error"
        });
    }
};

export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                location: user.location,
                email: user.email,
            },
            token, // If not using cookies, return token here
        });
        
    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({ 
            success: false,
            error: "Internal server error" 
        });

    }
};

export const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ valid: false, message: "No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ valid: false, message: "Token expired or invalid" });
            }
            return res.status(200).json({ 
                success: true,
                valid: true 
            });
        });
    } catch (error) {
        console.log("error in verify token: ", error);
        return res.status(500).json({ 
            success: false,
            error: "Error verifying token" 
        });
    }
}


