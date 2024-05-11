import { Player } from "../types";
/**
 * Fetches a list of football players for a specified league.
 * @param league
 * @returns list of players
 */
export declare const fetchPlayers: (league: string) => Promise<Player[]>;
