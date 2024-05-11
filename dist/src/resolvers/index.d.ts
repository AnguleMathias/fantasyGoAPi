declare const resolvers: {
    Query: {
        /**
         * Generates a JWT token for the given mobile number and password.
         * @param _ parent
         * @param param1 mobileNumber and password
         * @returns JWT token
         */
        getToken: (_: any, { mobileNumber, password }: {
            mobileNumber: string;
            password: string;
        }) => string;
        /**
         * Returns a list of football players for a specified league. Requires JWT authentication.
         * @param _ parent
         * @param param1 league
         * @param param2 token
         * @returns list of players
         */
        getPlayers: (_: any, { league }: {
            league: string;
        }, { token }: {
            token: string;
        }) => Promise<import("../types").Player[]>;
    };
};
export default resolvers;
