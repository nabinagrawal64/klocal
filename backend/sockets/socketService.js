import { Server } from "socket.io";

const activeRooms = new Map(); // Track active rooms and users

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("🔵 A user connected:", socket.id);

        // **Join Room**
        socket.on("joinRoom", ({ roomCode, user }) => {
            socket.join(roomCode);

            if (!activeRooms.has(roomCode)) {
                activeRooms.set(roomCode, []);
            }

            activeRooms.get(roomCode).push({ socketId: socket.id, user });

            console.log(`✅ ${user.username} joined room: ${roomCode}`);
            io.to(roomCode).emit("roomUpdate", activeRooms.get(roomCode));
        });

        // **Leave Room**
        socket.on("leaveRoom", ({ roomCode, user }) => {
            socket.leave(roomCode);

            if (activeRooms.has(roomCode)) {
                activeRooms.set(
                    roomCode,
                    activeRooms.get(roomCode).filter((u) => u.socketId !== socket.id)
                );
                io.to(roomCode).emit("roomUpdate", activeRooms.get(roomCode));
            }

            console.log(`❌ ${user.username} left room: ${roomCode}`);
        });

        // **Send Chat Message**
        socket.on("sendMessage", ({ roomCode, message, user }) => {
            io.to(roomCode).emit("receiveMessage", { message, user });
        });

        // **Disconnect**
        socket.on("disconnect", () => {
            console.log("🔴 A user disconnected:", socket.id);
            activeRooms.forEach((users, roomCode) => {
                activeRooms.set(
                    roomCode,
                    users.filter((u) => u.socketId !== socket.id)
                );
                io.to(roomCode).emit("roomUpdate", activeRooms.get(roomCode));
            });
        });
    });

    return io;
};

// Function to get io instance
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized!");
    }
    return io;
};