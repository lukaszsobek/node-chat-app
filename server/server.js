const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { makeMessage } = require("./utils/messages");
const { MSG } = require("./constants/messages");

io.on("connection", socket => {
    console.log(MSG.SERVER.USER_CONNECTION);

    const welcomeMessage = makeMessage("Server", MSG.SERVER.USER_WELCOME);
    socket.emit("welcomeMessage", welcomeMessage );

    const joinedMessage = makeMessage("Server", MSG.SERVER.USER_JOINED);
    socket.broadcast.emit("newMessage", joinedMessage);

    socket.on("createMessage", ({ from, text }, cb ) => {
        const chatMessage = makeMessage(from, text);
        io.emit("newMessage", chatMessage);
        cb();
    });

    socket.on("disconnect", () => {
        console.log(MSG.SERVER.USER_DISCONNECT);
    });
});

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile("./index.html");
});

server.listen(port, () => {
    console.log(MSG.SERVER.RUNNING(port));
});
