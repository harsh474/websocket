const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);
  // upon connection - only to current user
  socket.emit("message", "welcome to Chat App");

  // upon connection - to all other user
  socket.broadcast.emit("message", `User ${socket.id.substring(0,5)}  connected`
  );

  // upon disconnection - to all user
  socket.on("disconnect", () => {
    socket.broadcast.emit("message",`User ${socket.id.substring(0,5)} disconnected`
    );
  });

  // capturing the activity event
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("messagereciver", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
