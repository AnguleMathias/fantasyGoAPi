export interface Player {
  firstName: string;
  secondName: string;
  displayName: string;
  totalPoints: number;
  team: string;
  cost: number;
  selectedPercent: string;
}

export interface PlayerResponse {
  first_name: string;
  second_name: string;
  web_name: string;
  total_points: number;
  team_name: string;
  now_cost: number;
  selected_by_percent: string;
}

export enum League {
  EPL = "EPL",
  ChampionsLeague = "UEFA",
}
