export interface Player {
  firstName: string;
  secondName: string;
  displayName: string;
  totalPoints: number;
  team: string;
  statistic1: any;
  statistic2: any;
}

export enum League {
  EPL = "EPL",
  ChampionsLeague = "Champions League",
}
