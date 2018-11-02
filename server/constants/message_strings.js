const MSG = {};

MSG.SERVER = { 
    USER_JOINED: (user, room) => `User "${user}" joined room "${room}".`,
    USER_LEFT: (user, room) => `User "${user}" left the room "${room}".`,

    RUNNING: port => `Running server on port ${port}...`
};

MSG.CLIENT = {
    USER_WELCOME: (user, room) => `Hi, ${user}! Welcome to room "${room}".`,
    USER_JOINED: (user) => `User "${user}" joined the room.`,
    USER_LEFT: (user) => `User "${user}" left the room.`
};

MSG.ERR = {
    INVALID_ROOM_USER: "User and room name need to be valid"
};

module.exports = { MSG };