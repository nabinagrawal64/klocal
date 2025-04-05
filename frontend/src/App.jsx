import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore"; // Zustand store
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { Layout } from "./pages/Layout";
import Signup2 from "./pages/Signup2";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VerifyOtp from "./pages/VerifyOTP";
import Register from "./pages/Register";
import Follow from "./pages/Follow";
import SocialFeed from "./pages/SocialFeed";

const ProtectedRoute = ({ element }) => {
    const { token, logout } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
                if (decodedToken.exp * 1000 < Date.now()) {
                    logout(); // Expired token → Logout user
                }
            } catch (error) {
                console.log("error: ", error);
                logout();
            }
        }
        setLoading(false);
    }, [token, logout]);

    if (loading) return <div>Loading...</div>; // Prevent flickering

    return token ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/signup", element: <Signup2 /> },
            { path: "/verify-otp", element: <VerifyOtp /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/follow", element: <Follow />}, // Protect this route
            { path: "/home", element: <Home />}, // Protect this route
            { path: "/social-feed", element: <SocialFeed />}, // Protect this route
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
