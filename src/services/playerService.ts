import axios from "axios";
import { League, Player } from "../types";

/**
 * Fetches a list of football players for a specified league.
 * @param league
 * @returns list of players
 */
export const fetchPlayers = async (league: string): Promise<Player[]> => {
  const url =
    league === League.EPL
      ? process.env.EPL_API || ""
      : process.env.UEFA_API || "";

  try {
    const response = await axios.get(url);

    return response.data.elements.map(
      (playerData: any): Player => ({
        firstName: playerData.first_name,
        secondName: playerData.second_name,
        displayName: playerData.web_name,
        totalPoints: playerData.total_points,
        team: playerData.team_name,
        statistic1: playerData.statistic1,
        statistic2: playerData.statistic2,
      })
    );
  } catch (error) {
    console.error("Error fetching players: ", JSON.stringify(error));
    return [];
  }
};
