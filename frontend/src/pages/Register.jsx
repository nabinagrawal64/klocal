import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import axios from "axios";

const Register = () => {
    const location = useLocation();
    const email = location?.state?.email || "";
    console.log("email:",email)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: email,
        phoneNumber: "",
        password: "",
        location: "",
    });
    
    const navigate = useNavigate();
    const { setAuthData, loading, setLoading } = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(formData).some((value) => value.trim() === "")) {
            alert("All fields are required!");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);

            console.log(response.data)
            
            if (response.data.success) {
                console.log("Signup Success:", response.data);
                alert("Account created successfully!");
                setAuthData(response.data.user, response.data.token); // Set token in store
                navigate("/social-feed"); // Redirect on success
            } else {
                alert("Failed to register");
                return;
            }
            
        } catch (err) {
            console.error("Signup Error:", err);
            alert(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-pink-300 via-blue-500 to-purple-400">
            <div className="w-full max-w-md p-6">
                {/* Back Button */}
                <div onClick={() => navigate("/")} className="absolute top-5 left-5 cursor-pointer">
                    <span className="text-white text-2xl">←</span>
                </div>

                {/* Title */}
                <h2 className="text-white text-2xl font-semibold mb-4">Tell us about yourself!</h2>

                {/* Input Fields */}
                <div className="space-y-4">
                    {/* name */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* first name */}
                        <div>
                            <label className="text-white text-sm">First Name <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* last name */}
                        <div>
                            <label className="text-white text-sm">Last Name </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* email */}
                    <div>
                        <label className="text-white text-sm">Email Address <span className="text-red-600">*</span></label>
                        <input
                            type="email"
                            name="email"
                            disabled
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className="w-full cursor-not-allowed mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="text-white text-sm">Password <span className="text-red-600">*</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (<Eye />) : (<EyeOff />)}
                            </span>
                        </div>
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label className="text-white text-sm">Phone Number <span className="text-red-600">*</span></label>
                        <div className="flex">
                            <select className="px-2 py-2 rounded-md bg-white outline-none">
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="12345 67890"
                                className="w-full ml-2 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>   
                        <label className="text-white text-sm">Location <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter Location"
                            className="w-full mt-1 px-3 py-2 rounded-md bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>
                </div>

                {/* Create Account Button */}
                <button onClick={handleSubmit} disabled={loading} className="w-full mt-6 bg-gradient-to-br cursor-pointer from-blue-600 to-pink-500 text-white font-semibold py-2 rounded-md">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <LoaderCircle className="animate-spin text-center w-6 h-6 mr-2" />
                            <h2>Creating</h2>
                        </div>
                    ) : "Create Account"}
                </button>
            </div>
        </div>
    );
};

export default Register;
