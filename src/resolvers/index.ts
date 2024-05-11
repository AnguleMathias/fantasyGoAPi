import { AuthenticationError } from "apollo-server";

import { fetchPlayers } from "../services/playerService";
import { generateToken, verifyToken } from "../services/authService";
import { validateMobileNumber, validatePassword } from "../utils/validators";

const resolvers = {
  Query: {
    /**
     * Generates a JWT token for the given mobile number and password.
     * @param _ parent
     * @param param1 mobileNumber and password
     * @returns JWT token
     */
    getToken: (
      _: any,
      { mobileNumber, password }: { mobileNumber: string; password: string }
    ) => {
      if (!validateMobileNumber(mobileNumber) || !validatePassword(password)) {
        throw new Error("Invalid mobile number or password");
      }
      return generateToken(mobileNumber);
    },
    /**
     * Returns a list of football players for a specified league. Requires JWT authentication.
     * @param _ parent
     * @param param1 league
     * @param param2 token
     * @returns list of players
     */
    getPlayers: async (
      _: any,
      { league }: { league: string },
      { token }: { token: string }
    ) => {
      if (!token || !verifyToken(token)) {
        throw new AuthenticationError(
          "You must be logged in and provide a valid token."
        );
      }
      return fetchPlayers(league);
    },
  },
};
export default resolvers;
