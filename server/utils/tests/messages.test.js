const {
    makeLocationLinkMessage,
    makeMessage
} = require("../");

describe("Messages", () => {

    it("makeMessage creates a well-formatted message", () => {
        const from = "Me";
        const text = "test message.";
        const testMessage = makeMessage(from, text);

        expect(testMessage.from).toBe(from);
        expect(testMessage.text).toBe(text);
        expect(typeof testMessage.createdAt).toBe("number");
    });

    it("makeLocationLinkMessage creates a well-formatted location message", () => {
        const from = "Me";
        const location = { latitude: 10, longitude: 20 };
        const locationMessage = makeLocationLinkMessage(
            from,
            location
        );

        const returnedLink = 
        "https://www.google.com/maps/place/"
        + location.latitude
        + "/" + location.longitude;

        expect(locationMessage.from).toBe(from);
        expect(locationMessage.locationUrl).toBe(returnedLink);
    });
});