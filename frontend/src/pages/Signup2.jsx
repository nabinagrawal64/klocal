import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {LoaderCircle} from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const { loading, setLoading, setOtp } = useAuthStore();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendOTP = async () => {
        if (!email) {
            alert("Please enter an email.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`https://kinspace.onrender.com/api/auth/send-otp`, {
                headers: {
                    "Content-Type": "application/json",
                },
                email
            });

            if (response.data.success) {
                console.log("OTP Sent Successfully: ", response.data.otpCode);
                setOtp(response.data.otpCode);
                alert("OTP sent successfully!");
                alert(response.data.otpCode);
                navigate("/verify-otp", { state: { email }});
            } else {
                alert("Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error in sending OTP:", error);
            alert("Error sending OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items- justify-center bg-gradient-to-b from-blue-500 to-purple-500">
            <div className="w-full max-w-sm p-6 text-center">
                {/* Logo */}
                <h1 className="text-white text-5xl font-lobster mt-20 mb-30 tracking-wider"> Kinspace </h1>

                <form className="space-y-2 ">
                    {/* Sign Up Title */}
                    <h2 className="text-white flex text-2xl font-semibold mb-4"> Sign Up </h2>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block mt-7 text-white text-left text-sm font-medium mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter Email"
                            className="w-full bg-white px-4 py-2 text-lg rounded-md border-none focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                    </div>

                    {/* Send OTP Button */}
                    <button onClick={handleSendOTP} disabled={loading} className="w-full bg-gradient-to-br cursor-pointer from-blue-600 to-pink-500 text-white font-semibold py-2 rounded-md mt-4">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <LoaderCircle className="animate-spin text-center w-6 h-6 mr-2" />
                                <h2>Sending</h2>
                            </div>
                        ) : "Send OTP"}
                    </button>

                    {/* Sign In with WhatsApp */}
                    <button className="w-full flex cursor-pointer items-center justify-center bg-white text-gray-800 font-medium py-2 rounded-md mt-4 shadow-md">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                            alt="WhatsApp"
                            className="w-6 h-6 mr-2"
                        />
                        Sign In with WhatsApp
                    </button>

                    {/* Sign In with Instagram */}
                    <button className="w-full flex cursor-pointer items-center justify-center bg-white text-gray-800 font-medium py-2 rounded-md mt-4 shadow-md">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                            alt="Instagram"
                            className="w-6 h-6 mr-2"
                        />
                        Sign In with Instagram
                    </button>
                </form>
            </div>
        </div>
    );
}
