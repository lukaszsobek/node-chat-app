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

    getRoomUserList(room) {
        return this.userList.filter(user => user.room === room);
    }

}

module.exports = {
    Users
};