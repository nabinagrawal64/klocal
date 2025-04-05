/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Function to generate random gradients
const generateRandomGradient = () => {
    const colors = [
        "#6a11cb", "#2575fc", "#4facfe", "#00c6ff", "#0072ff",
        "#6d5dfc", "#5a00ff", "#6a00f4", "#4834d4", "#192f6a"
    ];
    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(circle, ${randomColor1}, ${randomColor2})`;
};

// Reusable Gradient Background Component
const Gradient = ({ children, duration = 3 }) => {
    const [gradient, setGradient] = useState(generateRandomGradient());

    useEffect(() => {
        const interval = setInterval(() => {
            setGradient(generateRandomGradient());
        }, duration * 1000); // Change gradient every `duration` seconds

        return () => clearInterval(interval);
    }, [duration]);

    return (
        <motion.div
            animate={{ background: gradient }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex items-center justify-center h-screen w-full bg-cover bg-no-repeat"
            style={{ background: gradient }}
        >
            {children}
        </motion.div>
    );
};

export default Gradient;
