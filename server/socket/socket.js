// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// import Chat from "../models/chat.model.js";
// import User from "../models/user.model.js";

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // io.on("connection", (socket) => {
// //   console.log("New client connected");

// //   socket.on("joinChat", async ({ chatId }) => {
// //     socket.join(chatId);
// //   });

// //   socket.on("sendMessage", async ({ chatId, senderId, content }) => {
// //     console.log(chatId, senderId, content);

// //     try {
// //       const chat = await Chat.findById(chatId);
// //       const sender = await User.findById(senderId);

// //       if (chat && sender) {
// //         // Ensure the sender is part of the chat
// //         if (chat.userId.equals(senderId) || chat.doctorId.equals(senderId)) {
// //           const message = { sender: senderId, content };
// //           chat.messages.push(message);
// //           await chat.save();

// //           io.to(chatId).emit("receiveMessage", message);
// //         } else {
// //           console.log("Unauthorized access to chat.");
// //         }
// //       } else {
// //         console.log("Chat or sender not found.");
// //       }
// //     } catch (error) {
// //       console.error("Error sending message:", error.message);
// //     }
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //   });
// // });

// io.on("connection", (socket) => {
//   console.log("New client connected for signaling");

//   socket.on("joinRoom", ({ userId, doctorId }) => {
//     const room =
//       userId > doctorId ? `${userId}_${doctorId}` : `${doctorId}_${userId}`;
//     socket.join(room);
//   });

//   socket.on("chatMessage", ({ message, userId, doctorId }) => {
//     const room =
//       userId > doctorId ? `${userId}_${doctorId}` : `${doctorId}_${userId}`;
//     io.to(room).emit("chatMessage", message);
//   });

//   // WebRTC signaling
//   socket.on("offer", (payload) => {
//     const { userId, doctorId, offer } = payload;
//     const room =
//       userId > doctorId ? `${userId}_${doctorId}` : `${doctorId}_${userId}`;
//     socket.to(room).emit("offer", offer);
//   });

//   socket.on("answer", (payload) => {
//     const { userId, doctorId, answer } = payload;
//     const room =
//       userId > doctorId ? `${userId}_${doctorId}` : `${doctorId}_${userId}`;
//     socket.to(room).emit("answer", answer);
//   });

//   socket.on("ice-candidate", (payload) => {
//     const { userId, doctorId, candidate } = payload;
//     const room =
//       userId > doctorId ? `${userId}_${doctorId}` : `${doctorId}_${userId}`;
//     socket.to(room).emit("ice-candidate", candidate);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// export { app, io, server };

import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverId = (receivedId) => {
  return userSocketMap[receivedId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  //Send events to all connected clients.
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("startCall", (data) => {
    const { receiverId } = data;
    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callStarted", { from: socket.id });
    }
  });

  socket.on("endCall", (data) => {
    const { receiverId } = data;
    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callEnded", { from: socket.id });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
