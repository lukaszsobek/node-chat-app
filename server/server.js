const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { makeMessage } = require("./utils/messages");
const { MSG } = require("./constants/message_strings");
const { type } = require("./constants/event_types");

io.on(type.connection, socket => {
    console.log(MSG.SERVER.USER_CONNECTION);

    const welcomeMessage = makeMessage("Server", MSG.SERVER.USER_WELCOME);
    socket.emit(type.welcomeMessage, welcomeMessage );

    const joinedMessage = makeMessage("Server", MSG.SERVER.USER_JOINED);
    socket.broadcast.emit(type.newMessage, joinedMessage);

    socket.on(type.createMessage, ({ from, text }, cb ) => {
        const chatMessage = makeMessage(from, text);
        io.emit(type.newMessage, chatMessage);
        cb();
    });

    socket.on(type.disconnect, () => {
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
