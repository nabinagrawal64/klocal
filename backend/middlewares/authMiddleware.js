import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization");
    console.log("token: ", token);

    if (!token)
        return res.status(401).json({ 
            success: false, message: "Access Denied" 
        });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(400).json({ 
            success: false, message: "Invalid token" 
        });
    }
};
