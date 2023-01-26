import { IHomeMatches, IHomeTeamsData } from '../interfaces/ITeamsData';

export default class LeaderboardFormat {
  public setHomeTotalPoints = (matches: IHomeMatches[]) => {
    let totalPoints = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
      }
    });
    return totalPoints;
  };

  public setTotalMatches = (matches: IHomeMatches[]) => {
    const totalMatches = matches.length;
    return totalMatches;
  };

  public setTotalVictories = (matches: IHomeMatches[]) => {
    let totalVictories = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) totalVictories += 1;
    });
    return totalVictories;
  };

  public setTotalDraws = (matches: IHomeMatches[]) => {
    let totalDraws = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
    });
    return totalDraws;
  };

  public setTotalLosses = (matches: IHomeMatches[]) => {
    let totalLosses = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
    });
    return totalLosses;
  };

  public setTotalGoalsFor = (matches: IHomeMatches[]) => {
    let totalGoalsFor = 0;
    matches.forEach((match) => {
      totalGoalsFor += match.homeTeamGoals;
    });
    return totalGoalsFor;
  };

  public setTotalGoalsAgainst = (matches: IHomeMatches[]) => {
    let totalGoalsAgainst = 0;
    matches.forEach((match) => {
      totalGoalsAgainst += match.awayTeamGoals;
    });
    return totalGoalsAgainst;
  };

  public setTotalGoalsDifferece = (matches: IHomeMatches[]) => {
    let totalGoalsDifference = 0;
    matches.forEach((match) => {
      totalGoalsDifference = totalGoalsDifference + match.homeTeamGoals - match.awayTeamGoals;
    });
    return totalGoalsDifference;
  };

  public setTeamEfficiency = (matches: IHomeMatches[]) => {
    const totalPoints = this.setHomeTotalPoints(matches);
    const totalPossiblePoints = this.setTotalMatches(matches) * 3;
    const efficiency = (totalPoints / totalPossiblePoints) * 100;
    return (Math.round(efficiency * 100) / 100).toFixed(2);
  };

  public formatHomeTeamData(teamsData: IHomeTeamsData[]) {
    const tableData = teamsData.map((team) => ({
      name: team.teamName,
      totalPoints: this.setHomeTotalPoints(team.homeTeam),
      totalGames: this.setTotalMatches(team.homeTeam),
      totalVictories: this.setTotalVictories(team.homeTeam),
      totalDraws: this.setTotalDraws(team.homeTeam),
      totalLosses: this.setTotalLosses(team.homeTeam),
      goalsFavor: this.setTotalGoalsFor(team.homeTeam),
      goalsOwn: this.setTotalGoalsAgainst(team.homeTeam),
      goalsBalance: this.setTotalGoalsDifferece(team.homeTeam),
      efficiency: this.setTeamEfficiency(team.homeTeam),
    })).sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return tableData;
  }
}
