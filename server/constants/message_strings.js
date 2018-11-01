const MSG = {};

MSG.SERVER = {
    USER_WELCOME: "Welcome to the server",
    USER_JOINED: "New user joined",
    USER_CONNECTION: "New user connected",
    USER_DISCONNECT: "User disconnected",
    USER_LEFT_ROOM: "A user left the room",

    RUNNING: port => `Running server on port ${port}`
};

MSG.ERR = {
    INVALID_ROOM_USER: "User and room name need to be valid"
};

module.exports = { MSG };