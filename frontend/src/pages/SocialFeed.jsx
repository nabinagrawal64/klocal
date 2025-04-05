import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, Mic, Heart, Share2, MessageCircle, Rss, MessageSquareText, CircleUser, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SocialFeed() {
    const [activeTab, setActiveTab] = useState("public");
    const [likedPosts, setLikedPosts] = useState([]);
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to home after logout
    };

    const toggleLike = (postId) => {
        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId)); // remove
        } else {
          setLikedPosts([...likedPosts, postId]); // add
        }
    };

    return (
        <div className="min-h-screen feed-background text-gray-900">
            {/* Header */}
            <div className="flex justify-between">
                <h1 className="text-white font-lobster p-4 font-medium tracking-wide text-2xl">Kinspace</h1>
                <div>
                    <button className="p-2 bg-white bg-gradient mx-5 mt-5 rounded-lg shadow-md" onClick={handleLogout}>
                        <LogOut className="text-white" size={18} />
                    </button>
                </div>
            </div>

            {/* search */}
            <div className="flex flex-col justify-between p-4">
                <div className="flex gap-3">
                    <div className="relative w-full ">
                        <input
                            type="text"
                            placeholder="Search Here Anything"
                            className="w-full p-2 pl-8.5 rounded-xl placeholder:-translate-y-0.5 placeholder:font-light bg-white shadow-md focus:outline-none"
                        />
                        <Search
                            className="absolute text--gradient left-3 top-2.5 text-gray-500"
                            size={18}
                        />
                    </div>
                    <button className="p-2 bg-white bg-gradient rounded-lg shadow-md">
                        <Mic className="text-white" />
                    </button>
                </div>
            </div>
            
            {/* Tabs */}
            <motion.div 
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex justify-center transition-all duration-300 ease-in-out bg-white rounded-full w-fit p-1 mx-auto space-x-4 my-4"
            >
                <button
                    className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 text-gray-400 ${
                        activeTab === "public" ? "bg-gradient text-white animate-pulse" : ""
                    }`}
                    onClick={() => setActiveTab("public")}
                >
                    Public
                </button>
                <button
                    className={`px-3 py-1 rounded-full cursor-pointer transition-colors duration-300 text-gray-400 ${
                        activeTab === "private" ? "bg-gradient text-white animate-pulse" : ""
                    }`}
                    onClick={() => setActiveTab("private")}
                >
                    Private
                </button>
            </motion.div>

            {/* Posts */}
            <div className="bg-white shadow-md space-y-4 mt-1">
                <div className="absolute top-[23%] left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-[21%] left-0 w-full h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
                {[1, 2, 3].map((post, index) => (
                    <div key={index} className="pb-4 mt-10 ">

                        {/* user name & picture */}
                        <div className="flex p-3 items-center space-x-3">
                            <img src="/user-image.png" alt="user-image" className="size-10 bg-gray-300 rounded-full" />
                            <div>
                                <h3 className="font-semibold text-sm">
                                    Sambit Pradhan
                                </h3>
                                <p className="text-[10px] text-gray-500">
                                    Published: September, 15 2024 08:19 PM
                                </p>
                            </div>
                        </div>

                        {/* post description */}
                        <p className="text-[#9A9999] text-xs p-3">
                            World's most beautiful car in Curabitur #test drive booking! the most beautiful car available in America and Saudi Arabia.
                        </p>

                        {/* post image */}
                        <div className="mt-3 bg-gray-200 overflow-hidden">
                            <img
                                src={"/post-image.png"}
                                alt="Post"
                                className="w-full h-64 object-cover"
                            />
                        </div>

                        {/* like share comment */}
                        <div className="flex items-center mt-3 space-x-2 px-3 text-gray-600">
                            {/* like */}
                            <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => toggleLike(index)}
                            >
                                <Heart
                                    className={`transition-all size-5 duration-200 ${
                                        likedPosts.includes(index)
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-500"
                                    }`}

                                />
                                <span className="-mt-0.5 text-sm">{likedPosts.includes(index) ? "3.1K" : "3K"}</span>
                            </div>   

                            {/* comment */}
                            <div className="flex items-center gap-1">
                                <MessageCircle size={18} />
                                <span className="text-sm">25</span>
                            </div>

                            {/* share */}
                            <div className="flex items-center gap-1 pr-1">
                                <Share2 size={18} />
                                <span className="">8</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-5 left-[25%] right-[25%] justify-between bg-white space-x-2 text-black flex p-3 rounded-2xl">
                <button className="flex gap-0.5 sm:gap-1 items-center">
                    <span><Rss size={18} /></span>
                    <span className="text-xs">Feed</span>
                </button>
                <button className="flex gap-0.5 sm:gap-1 items-center">
                    <span><MessageSquareText size={18} /></span>
                    <span className="text-xs">Chat</span>
                </button>
                <button className="flex gap-0.5 sm:gap-1 items-center">
                    <span><CircleUser size={18} /></span>
                    <span className="text-xs">Profile</span>
                </button>
            </div>
        </div>
    );
}
