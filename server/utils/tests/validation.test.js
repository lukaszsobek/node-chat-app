const { isValidString } = require("../validation");

describe("String validation is", () => {
    it("falsy on empty string", () => {
        const testString = "";
        expect(isValidString(testString)).toBeFalsy();
    });
    it("falsy on non-string", () => {
        const testString = {};
        expect(isValidString(testString)).toBeFalsy();
    });
    it("falsy on string made of spaces", () => {
        const testString = "     ";
        expect(isValidString(testString)).toBeFalsy();
    });

    it("truthy on valid string", () => {
        const testString = " asdsdsdadad ";
        expect(isValidString(testString)).toBeTruthy();
    });    

});
