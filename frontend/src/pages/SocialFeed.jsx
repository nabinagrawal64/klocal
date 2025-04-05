import { useState } from "react";
import { Search, Mic, Heart, MessageSquare, Share2, User } from "lucide-react";

export default function SocialFeed() {
    const [activeTab, setActiveTab] = useState("public");

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-blue-300 p-4 text-gray-900">

            {/* Header */}
            <div className="flex flex-col justify-between py-4">
                <h1 className="text-white font-semibold text-2xl">Kinspace</h1>
                <div className="flex gap-3">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search Here Anything"
                            className="w-full p-3 pl-10 rounded-full bg-white shadow-md focus:outline-none"
                        />
                        <Search
                            className="absolute left-3 top-3 text-gray-500"
                            size={18}
                        />
                    </div>
                    <button className="p-3 bg-white rounded-full shadow-md">
                        <Mic className="text-purple-500" />
                    </button>
                </div>
            </div>
            
            {/* Tabs */}
            <div className="flex justify-center space-x-4 my-4">
                <button
                    className={`px-4 py-2 rounded-full text-white ${
                        activeTab === "public" ? "bg-purple-500" : "bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("public")}
                >
                    Public
                </button>
                <button
                    className={`px-4 py-2 rounded-full text-white ${
                        activeTab === "private"
                            ? "bg-purple-500"
                            : "bg-gray-300"
                    }`}
                    onClick={() => setActiveTab("private")}
                >
                    Private
                </button>
            </div>

            {/* Posts */}
            <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                {[1, 2, 3].map((post, index) => (
                    <div key={index} className="border-b pb-4 last:border-none">
                        <div className="flex items-center space-x-3">
                            <User className="w-10 h-10 bg-gray-300 rounded-full" />
                            <div>
                                <h3 className="font-semibold">
                                    Sambit Pradhan
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Published: September, 15 2024 08:19 PM
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700 mt-2">
                            World's most beautiful car in Curabitur #test drive
                            booking! the most beautiful car available in America
                            and Saudi Arabia.
                        </p>
                        <div className="mt-3 bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src="https://source.unsplash.com/featured/?architecture"
                                alt="Post"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-3 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <Heart className="text-red-500" />
                                <span>3K</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageSquare />
                                <span>25</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Share2 />
                                <span>8</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around py-3 rounded-t-lg">
                <button className="flex flex-col items-center">
                    <span>📃</span>
                    <span className="text-sm">Feed</span>
                </button>
                <button className="flex flex-col items-center">
                    <span>💬</span>
                    <span className="text-sm">Chat</span>
                </button>
                <button className="flex flex-col items-center">
                    <span>👤</span>
                    <span className="text-sm">Profile</span>
                </button>
            </div>
        </div>
    );
}
