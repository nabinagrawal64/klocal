import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();
    const { user, token, isAuthenticated, logout } = useAuthStore();
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        // Start animation after 2 seconds
        const animationTimer = setTimeout(() => {
            setStartAnimation(true);
        }, 2000);

        // Navigate to Welcome Page 
        const navigationTimer = setTimeout(async() => {
            console.log("token from frontend: ", token);
            if (user) {
                try {
                    if(token){
                        // Verify if token is valid
                        const response = await axios.get("http://localhost:5000/api/auth/verify-token", {
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        if (response.data.valid) {
                            navigate("/social-feed"); // Redirect if token is valid
                        } else {
                            logout(); // Expired token, logout user
                        }
                    }
                    else {
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Token verification failed:", error);
                    logout(); // Logout on error (like expired token)
                    navigate("/login");
                }
            } else {
                navigate("/signup"); // No token, go to signup
            }
        }, 3000);

        return () => {
            clearTimeout(animationTimer);
            clearTimeout(navigationTimer);
        };
    }, [navigate,isAuthenticated, token, logout, user]);

    return (
        <motion.div
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            className="flex items-center justify-center h-screen bg-gradient-to-bl from-purple-400 via-blue-600 to-purple-400 bg-[length:200%_200%]"
        >
            <motion.h1
                initial={{ y: 0, opacity: 1 }}
                animate={startAnimation ? { y: -100, opacity: 0 } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-5xl font-lobster tracking-wider text-white"
            >
                Kinspace
            </motion.h1>
        </motion.div>
    )
}

export default Home