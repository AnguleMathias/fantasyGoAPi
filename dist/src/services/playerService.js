import axios from "axios";
import { League } from "../types";
/**
 * Fetches a list of football players for a specified league.
 * @param league
 * @returns list of players
 */
export const fetchPlayers = async (league) => {
    const url = league === League.EPL
        ? process.env.EPL_API || ""
        : process.env.UEFA_API || "";
    const response = await axios.get(url);
    return response.data.elements.map((playerData) => ({
        firstName: playerData.first_name,
        secondName: playerData.second_name,
        displayName: playerData.web_name,
        totalPoints: playerData.total_points,
        team: playerData.team_name,
        statistic1: playerData.statistic1,
        statistic2: playerData.statistic2,
    }));
};
