import {
  validateMobileNumber,
  validatePassword,
} from "../src/utils/validators";

describe("Validator Functions", () => {
  describe("validateMobileNumber", () => {
    test("returns true for valid mobile number", () => {
      expect(validateMobileNumber("0123456789")).toBe(true);
    });

    test("returns false for mobile number not starting with 0", () => {
      expect(validateMobileNumber("1123456789")).toBe(false);
    });

    test("returns false for mobile number that is too short", () => {
      expect(validateMobileNumber("012345678")).toBe(false);
    });

    test("returns false for mobile number that is too long", () => {
      expect(validateMobileNumber("01234567890")).toBe(false);
    });

    test("returns false for mobile number with non-numeric characters", () => {
      expect(validateMobileNumber("012345678X")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    test("returns true for a valid password", () => {
      expect(validatePassword("Abcdef")).toBe(true);
    });

    test("returns false for password without an uppercase letter", () => {
      expect(validatePassword("abcdef")).toBe(false);
    });

    test("returns false for password that is too short", () => {
      expect(validatePassword("Abcde")).toBe(false);
    });

    test("returns false for password that is long enough but without an uppercase", () => {
      expect(validatePassword("abcdefg")).toBe(false);
    });

    test("returns true for longer password with multiple uppercase letters", () => {
      expect(validatePassword("AbcdefGhI")).toBe(true);
    });
  });
});
