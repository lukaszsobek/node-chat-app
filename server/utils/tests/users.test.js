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

    it(".getUser() finds the correct user if present", () => {
        const testUser3 = {
            socketId: 3,
            userName: 3,
            room: 3
        };

        const users = new Users();
        users.addUser(1 ,1, 1);
        users.addUser(2, 2, 2);
        users.addUser(testUser3.socketId, testUser3.userName, testUser3.room);

        const returnedUser = users.getUser(3);
        expect(returnedUser).toEqual(testUser3);
        expect(users.userList.length).toBe(3);

    });
});