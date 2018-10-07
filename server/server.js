const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { makeMessage } = require("./utils/messages");

io.on("connection", socket => {
    console.log("User connected");

    const welcomeMessage = makeMessage("Server", "Welcome to the server");
    socket.emit("welcomeMessage", welcomeMessage );

    const joinedMessage = makeMessage("Server", "A new user joined");
    socket.broadcast.emit("newMessage", joinedMessage);

    socket.on("createMessage", ({ from, text }) => {
        const chatMessage = makeMessage(from, text);
        io.emit("newMessage", chatMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile("./index.html");
});

server.listen(port, () => {
    console.log(`Running server on port ${port} ...`);
});
