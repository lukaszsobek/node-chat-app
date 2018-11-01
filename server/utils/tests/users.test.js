const { Users } = require("../users");

describe("Users class", () => {
    it(".addUser() creates a new user besed on params", () => {
        const testUser = { socketId: 1, userName: 1, room: 1 };

        const users = new Users();
        const addedUser = users.addUser(1, 1, 1);
        
        expect(addedUser).toEqual(testUser);
        expect(users.userList.length).toBe(1);
        expect(users.userList[0]).toEqual(testUser);
    });

    it(".getUser() finds the correct user if present", () => {
        const users = new Users();
        users.addUser(1 ,1, 1);
        users.addUser(2, 2, 2);
        testUser3 = users.addUser(3, 3, 3);

        const returnedUser = users.getUser(3);
        expect(returnedUser).toEqual(testUser3);
        expect(users.userList.length).toBe(3);
    });

    it(".getRoomUserList() gets all users in a room", () => {
        const testRoom2 = 2;

        const users = new Users();
        users.addUser(1 ,1, 1);
        const testuser2 = users.addUser(2, 2, testRoom2);
        const testuser3 = users.addUser(3, 3, testRoom2);

        const returnedUsers = users.getRoomUserList(testRoom2);
        expect(returnedUsers).toEqual([testuser2, testuser3]);
    });

    
});