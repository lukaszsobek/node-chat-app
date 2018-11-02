const MSG = {};

MSG.SERVER = { 
    USER_JOINED: "New user joined",
    USER_CONNECTION: "New user connected",
    USER_DISCONNECT: "User disconnected",
    USER_LEFT_ROOM: "A user left the room",

    RUNNING: port => `Running server on port ${port}`
};

MSG.CLIENT = {
    USER_WELCOME: (user, room) => `Hi, ${user}! Welcome to room ${room}`
};

MSG.ERR = {
    INVALID_ROOM_USER: "User and room name need to be valid"
};

module.exports = { MSG };