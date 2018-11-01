class Users {
    constructor() {
        this.userList = [];
    }

    addUser(socketId, userName, room) {
        const newUser = { socketId, userName, room };

        this.userList.push(newUser);
        return newUser;
    }

    removeUser(id) {
        const thisUser = this.getUser(id);
        const initialUserCount = this.userList.length;
        this.userList = this.userList.filter(user => user.socketId !== id);

        return initialUserCount !== this.userList.length ? thisUser : null;
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