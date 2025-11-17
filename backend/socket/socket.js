import { Server } from "socket.io";
import http from "http";
import express from "express";
import { updateUserInfo } from "../controllers/auth.controller.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://chat-webapp-6wmr.onrender.com",
    ],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  updateUserInfo(userId, { currentStatus: "online" });

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    delete userSocketMap[userId];

    updateUserInfo(userId, {
      currentStatus: "offline",
      lastActive: new Date(),
    });

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
