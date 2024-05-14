import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = http.createServer(app);
const io = new SocketIOServer(server);
const PORT = process.env.PORT || 3000;


app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Send the index.html file for any other requests
app.get("*", (req, res) => {
    const indexPath = path.resolve(publicDirectoryPath, "index.html");
    res.sendFile(indexPath);
});

io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("sendMessage", (message, callback) => {
        console.log(`Message received: ${message}`);
        io.emit("message", message);
        callback();
    });

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

