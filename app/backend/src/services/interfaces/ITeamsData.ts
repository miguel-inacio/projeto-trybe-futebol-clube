export interface IHomeMatches {
  homeTeamGoals: number,
  homeTeamId: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IAwayMatches {
  homeTeamGoals: number,
  homeTeamId: number,
  awayTeamId: number,
  awayTeamGoals: number,
}

export interface IHomeTeamsData {
  id?: number;
  teamName: string;
  homeTeam: IHomeMatches[] | undefined
  awayTeam: IAwayMatches[] | undefined
}

export interface ITeamsData {
  id?: number;
  teamName: string;
  homeTeam: IHomeMatches[]
  awayTeam: IAwayMatches[]
}
