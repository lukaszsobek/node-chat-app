class Users {
    constructor() {
        this.userList = [];
    }

    addUser(socketId, userName, room) {
        const newUser = { socketId, userName, room };

        this.userList.push(newUser);
        return newUser;
    }

    getUser(id) {
        return this.userList.find(user => user.socketId === id);
    }

}

module.exports = {
    Users
};