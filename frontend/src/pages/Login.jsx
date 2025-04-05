import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const Login = () => {
    const { setAuthData } = useAuthStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // State for error messages
    const [showPassword, setShowPassword] = useState(false);


    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error before making request

        try {
            const response = await axios.post("https://kinspace.onrender.com/api/auth/login", formData);
            const { user, token } = response.data;

            console.log("login se: ",user, token);

            // Store auth data in Zustand
            setAuthData(user, token);
            navigate("/home"); // Redirect to dashboard
        } catch (error) {
            setError(error.response?.data?.error || "Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-500">
            <h1 className="text-white text-5xl font-lobster mt-20 mb-30 tracking-wider"> Kinspace </h1>
            
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 text-center">

                {/* Logo */}
                <h1 className="text-white flex text-2xl font-semibold mb-4"> Login </h1>

                {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

                {/* email */}
                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        required 
                        className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                </div>

                {/* password input */}
                <div className="relative mt-4">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                        className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (<Eye />) : (<EyeOff />)}
                    </span>
                </div>

                {/* login button */}
                <button disabled={loading} className="w-full mt-6 bg-gradient-to-br cursor-pointer from-blue-600 to-pink-500 text-white font-semibold py-2 rounded-md">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <LoaderCircle className="animate-spin text-center w-6 h-6 mr-2" />
                            <h2>Loogging in</h2>
                        </div>
                    ) : "Login"}
                </button>

            </form>
        </div>
    );
};

export default Login;
