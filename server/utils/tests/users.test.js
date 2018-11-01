const { Users } = require("../users");

describe("Users class", () => {
    it(".addUser() creates a new user besed on params", () => {
        const testUser = {
            socketId: 1,
            userName: 1,
            room: 1
        };

        const users = new Users();
        const addedUser = users.addUser(
            testUser.socketId, testUser.userName, testUser.room
        );
        
        expect(addedUser).toEqual(testUser);
        expect(users.userList.length).toBe(1);
        expect(users.userList[0]).toEqual(testUser);
    });
});