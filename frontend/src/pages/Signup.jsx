import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const { setAuthData } = useAuthStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        location: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Error message state

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
            const response = await axios.post("https://kinspace.onrender.com/api/auth/register", formData);
            const { user, token } = response.data;

            console.log("signup se: ",user, token);

            // Store user & token in Zustand
            setAuthData(user, token);
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            setError(error.response?.data?.error || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>

                {error && <p className="text-red-500 mb-3">{error}</p>} {/* Display error message */}

                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded mb-4" />
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
