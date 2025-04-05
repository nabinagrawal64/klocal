import { History, LoaderCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useAuthStore } from "../store/authStore";

const VerifyOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const { loading, setLoading } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const email = location?.state?.email || "";

    const handleVerifyOTP = async () => {
        if (!email) {
            alert("Email is missing. Please restart the process.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(`https://kinspace.onrender.com/api/auth/verify-otp`, {
                email,
                otp: otp.join(""), // Convert array to string
            });

            if (response.data.success) {
                navigate("/register", { state: { email }}); // Redirect on success
            } else {
                alert("Invalid OTP. Please try again.");
                return;
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-bl from-pink-300 via-blue-500 to-purple-400">
            <div className="w-full max-w-sm p-6 text-center">
                {/* Back Button */}
                <div onClick={() => navigate("/signup")} className="absolute top-5 left-5 cursor-pointer">
                    <span className="text-white text-2xl">←</span>
                </div>

                {/* Title */}
                <h2 className="text-white text-2xl mx-2 text-start font-semibold mb-2">Enter OTP</h2>
                <p className="text-white text-sm mb-4 text-start p-2">
                    Please wait, a one-time password (OTP) will be sent to your registered number/email shortly.
                    Use it to verify your account securely.
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center space-x-2 mb-6">
                    <OtpInput
                        value={otp.join("")}
                        onChange={(val) => setOtp(val.split(""))} // Converts string back to array
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder=""
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="size-[46px] bg-white text-lg text-center rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        )}
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                        }}
                    />
                </div>

                {/* Verify Email Button */}
                <button onClick={handleVerifyOTP} disabled={loading} className="w-[95%]  bg-gradient-to-br cursor-pointer from-blue-600 to-pink-500 text-white font-semibold py-2 rounded-md">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <LoaderCircle className="animate-spin text-center w-6 h-6 mr-2" />
                            <h2>Verifying</h2>
                        </div>
                    ) : "Verify email"}
                </button>

                {/* Back to Sign Up & Resend OTP */}
                <div className="flex text-xs justify-between items-center text-white mx-2 mt-4">
                    <button onClick={() => navigate("/signup")} className="flex ml-1 items-center">
                        ← Back to Sign Up
                    </button>
                    <button className="flex items-center opacity-60">
                        <History className="size-3.5 mr-1 mt-1" /> Resend it
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;