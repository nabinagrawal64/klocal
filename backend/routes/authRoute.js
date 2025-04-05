import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, verifyOTP, sendOTP, verifyToken } from "../controllers/auth.js";
const router = express.Router();

// Send OTP
router.post(
    "/send-otp",
    [body("email").isEmail().withMessage("Valid email required")],
    sendOTP
);

// Verify OTP
router.post(
    "/verify-otp",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP format"),
    ],
    verifyOTP
);

// Register
router.post(
    "/register",
    [
        body("firstName").not().isEmpty().withMessage("First name is required"),
        body("phoneNumber")
            .matches(/^\+?[0-9]{10,15}$/)
            .withMessage("Valid phone number required"),
        body("location").not().isEmpty().withMessage("Location is required"),
        body("email").isEmail().withMessage("Valid email required"), // Auto-fetched
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    registerUser
);

// Login
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").exists().withMessage("Password is required"),
    ],
    loginUser
);

// Verify Token (GET request)
router.get("/verify-token", verifyToken);

export default router;
