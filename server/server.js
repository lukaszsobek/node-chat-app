const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {
    isValidString,
    makeLocationLinkMessage,
    makeMessage
} = require("./utils");
const { MSG, type } = require("./constants");

io.on(type.connection, socket => {
    socket.on(type.geolocationMessage, (location) => {
        const from = "Hello";
      
        const locationMessage = makeLocationLinkMessage(
            from,
            location
        );

        io.emit(type.newLocationMessage, locationMessage);
    });

    socket.on(type.createMessage, ({ from, text }, cb ) => {
        const chatMessage = makeMessage(from, text);
        io.emit(type.newMessage, chatMessage);
        cb();
    });

    socket.on(type.join, ({ user, room }, cb) => {
        const msg = (!isValidString(user) || !isValidString(room))
            ? MSG.ERR.INVALID_ROOM_USER
            : "";
        
        cb(msg);

        socket.join(room);
        console.log(`${MSG.SERVER.USER_CONNECTION} to room "${room}"`);

        const welcomeMessage = makeMessage("Server", MSG.SERVER.USER_WELCOME);
        socket.emit(type.welcomeMessage, welcomeMessage );
    
        const joinedMessage = makeMessage("Server", `${MSG.SERVER.USER_JOINED} - ${user}`);
        socket.broadcast.to(room).emit(type.newMessage, joinedMessage);
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
