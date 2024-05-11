import axios from "axios";
import { League, Player, PlayerResponse } from "../types/index.js";

/**
 * Fetches a list of football players for a specified league.
 * @param league
 * @returns list of players
 */
export const fetchPlayers = async (league: string): Promise<Player[]> => {
  const url =
    league === League.EPL
      ? "https://fantasy.premierleague.com/api/bootstrap-static/"
      : "https://gaming.uefa.com/en/uclfantasy/services/feeds/players/players_60_en_7.json";

  try {
    const response = await axios.get(url);

    return response.data.elements.map(
      (playerData: PlayerResponse): Player => ({
        firstName: playerData.first_name,
        secondName: playerData.second_name,
        displayName: playerData.web_name,
        totalPoints: playerData.total_points,
        team: playerData.team_name,
        cost: playerData.now_cost,
        selectedPercent: playerData.selected_by_percent,
      })
    );
  } catch (error) {
    console.error("Error fetching players: ", JSON.stringify(error));
    return [];
  }
};
