import { generateToken, verifyToken } from "../src/services/authService";
describe("Authentication Service", () => {
    const mockMobileNumber = "0123456789";
    test("should generate a JWT token", () => {
        const token = generateToken(mockMobileNumber);
        expect(typeof token).toBe("string");
        expect(token.split(".").length).toBe(3); // Basic check for JWT structure
    });
    test("should verify a valid JWT token", () => {
        const token = generateToken(mockMobileNumber);
        expect(verifyToken(token)).toBeTruthy();
    });
    test("should reject an invalid JWT token", () => {
        const token = "invalid.token.here";
        expect(verifyToken(token)).toBeFalsy();
    });
});
