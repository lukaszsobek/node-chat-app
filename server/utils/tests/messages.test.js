const { makeMessage } = require("../messages");

describe("Messages", () => {
    it("makeMessage creates a well-formated message", () => {
        const from = "Me";
        const text = "test message.";
        const testMessage = makeMessage(from, text);

        expect(testMessage.from).toBe(from);
        expect(testMessage.text).toBe(text);
        expect(typeof testMessage.createdAt).toBe("number");
    });
});