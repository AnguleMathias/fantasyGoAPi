import { AuthenticationError } from "apollo-server";
import resolvers from "../src/resolvers";
import {
  validateMobileNumber,
  validatePassword,
} from "../src/utils/validators";
import { generateToken, verifyToken } from "../src/services/authService";
import { fetchPlayers } from "../src/services/playerService";

jest.mock("../src/services/authService", () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
}));

jest.mock("../src/services/playerService", () => ({
  fetchPlayers: jest.fn(),
}));

jest.mock("../src/utils/validators", () => ({
  validateMobileNumber: jest.fn(),
  validatePassword: jest.fn(),
}));

describe("GraphQL Resolvers", () => {
  describe("getToken Resolver", () => {
    const { getToken } = resolvers.Query;

    it("should generate a token for valid credentials", () => {
      (validateMobileNumber as jest.Mock).mockReturnValue(true);
      (validatePassword as jest.Mock).mockReturnValue(true);
      (generateToken as jest.Mock).mockReturnValue("mocked_token");

      const result = getToken(
        {},
        { mobileNumber: "0123456789", password: "Password1" }
      );
      expect(validateMobileNumber).toHaveBeenCalledWith("0123456789");
      expect(validatePassword).toHaveBeenCalledWith("Password1");
      expect(generateToken).toHaveBeenCalledWith("0123456789");
      expect(result).toBe("mocked_token");
    });

    it("should throw an error for invalid credentials", () => {
      (validateMobileNumber as jest.Mock).mockReturnValue(false);
      (validatePassword as jest.Mock).mockReturnValue(false);

      expect(() => {
        getToken({}, { mobileNumber: "invalid", password: "pwd" });
      }).toThrow("Invalid mobile number or password");
    });
  });

  describe("getPlayers Resolver", () => {
    const { getPlayers } = resolvers.Query;

    it("should fetch players for a valid token and league", async () => {
      (verifyToken as jest.Mock).mockReturnValue(true);
      (fetchPlayers as jest.Mock).mockResolvedValue(["player1", "player2"]);

      const result = await getPlayers(
        {},
        { league: "EPL" },
        { token: "valid_token" }
      );

      expect(verifyToken).toHaveBeenCalledWith("valid_token");
      expect(fetchPlayers).toHaveBeenCalledWith("EPL");
      expect(result).toEqual(["player1", "player2"]);
    });

    it("should throw an AuthenticationError for an invalid token", async () => {
      (verifyToken as jest.Mock).mockReturnValue(false);

      await expect(
        getPlayers({}, { league: "EPL" }, { token: "invalid_token" })
      ).rejects.toThrow(AuthenticationError);
    });
  });
});
