const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { Users } = require("./utils/users");
const {
    isValidString,
    makeLocationLinkMessage,
    makeMessage
} = require("./utils");
const { MSG, type } = require("./constants");

const users = new Users();

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

        if(msg) {
            return;
        }

        socket.join(room);

        users.removeUser(socket.id);
        users.addUser(socket.id, user, room);
        const usersInRoom = users.getRoomUserList(room);
        io.to(room).emit(type.userListChange, usersInRoom);

        console.log(MSG.SERVER.USER_JOINED(user, room));

        const welcomeMessage = makeMessage("Server", MSG.CLIENT.USER_WELCOME(user, room));
        socket.emit(type.welcomeMessage, welcomeMessage );
    
        const joinedMessage = makeMessage("Server", MSG.CLIENT.USER_JOINED(user));
        socket.broadcast.to(room).emit(type.newMessage, joinedMessage);
    });

    socket.on(type.disconnect, () => {
        const removedUser = users.removeUser(socket.id);

        if(!removedUser) {
            return;
        }

        const usersInRoom = users.getRoomUserList(removedUser.room);
        io.to(removedUser.room).emit(type.userListChange, usersInRoom);

        const leaveMessage = makeMessage("Server", MSG.CLIENT.USER_LEFT(removedUser.userName));
        io.to(removedUser.room).emit(type.newMessage, leaveMessage);
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
