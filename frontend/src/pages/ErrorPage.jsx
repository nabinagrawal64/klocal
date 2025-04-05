
export const ErrorPage = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
            style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,landscape')" }}>
            
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Error Content */}
            <div className="relative z-10 text-center text-white px-6">
                <h1 className="text-6xl md:text-8xl font-bold">404</h1>
                <p className="text-xl md:text-2xl mt-4">{"Oops! The page you're looking for doesn't exist."}</p>
                <a href="/" className="mt-6 inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-600 transition">
                    Go Home
                </a>
            </div>
        </div>
    );
}
