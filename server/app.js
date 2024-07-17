const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} is connected`);

    socket.on("messagereciver", (data) => {
        console.log(data);
        io.emit("messagedistributer", `${socket.id.substring(0, 5)}: ${data}`);
    });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
