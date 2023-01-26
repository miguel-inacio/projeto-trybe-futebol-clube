export interface IHomeMatches {
  homeTeamGoals: number,
  homeTeamId: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IAwayMatches {
  awayTeam?: {
    homeTeamGoals: number,
    homeTeamId: number,
    awayTeamId: number,
    awayTeamGoals: number,
  }[]
}

export interface IHomeTeamsData {
  id?: number;
  teamName: string;
  homeTeam: IHomeMatches[]
}
