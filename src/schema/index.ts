import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    """
    Generates a JWT token for the given mobile number and password.
    The mobile number should be 10 numeric characters long starting with a zero.
    The password must be at least 6 characters long and contain at least one uppercase letter.
    """
    getToken(mobileNumber: String!, password: String!): String

    """
    Returns a list of football players for a specified league. Requires JWT authentication.
    """
    getPlayers(league: String!): [Player]
  }

  type Player {
    firstName: String
    secondName: String
    displayName: String
    totalPoints: Int
    team: String
    cost: Int
    selectedPercent: String
  }
`;
