class Users {
    constructor() {
        this.userList = [];
    }

    addUser(socketId, userName, room) {
        const newUser = { socketId, userName, room };

        this.userList.push(newUser);
        return newUser;
    }
}

module.exports = {
    Users
};