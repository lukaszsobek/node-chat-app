const MSG = {};

MSG.SERVER = {
    USER_WELCOME: "Welcome to the server",
    USER_JOINED: "New user joined",
    USER_CONNECTION: "New user connected",
    USER_DISCONNECT: "User disconnected",

    RUNNING: port => `Running server on port ${port}`
};

module.exports = { MSG };