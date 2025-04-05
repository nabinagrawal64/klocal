import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
// import http from "http";
import connectDB from "./config/database.js"; // Ensure the file extension is `.js`
import auth from "./routes/authRoute.js"
import { initializeSocket } from "./sockets/socketService.js";

const app = express();
app.use(express.json());
app.use(cors());

// connect database
dotenv.config();
connectDB(); 

// ✅ Initialize WebSockets
// const server = http.createServer(app);
// initializeSocket(server);

// connect routes
app.use("/api/auth", auth);

// start the server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
