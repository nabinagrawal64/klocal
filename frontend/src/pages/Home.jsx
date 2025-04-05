import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to home after logout
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="flex gap-10">
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
