import { IAwayMatches, IHomeMatches, IHomeTeamsData } from '../interfaces/ITeamsData';

export default class LeaderboardFormat {
  public pointsCounter = (matches: IHomeMatches[], pitch: string) => {
    let totalHomePoints = 0;
    let totalAwayPoints = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalHomePoints += 3;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        totalHomePoints += 1;
        totalAwayPoints += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        totalAwayPoints += 3;
      }
    });
    return pitch === 'home' ? totalHomePoints : totalAwayPoints;
  };

  public setTotalPoints = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    // console.log('homeMatches do setTotalPoints: ', homeMatches);
    const homePoints = homeMatches ? this.pointsCounter(homeMatches, 'home') : 0;
    // console.log('homePoints do setTotalPoints: ', homePoints);

    const awayPoints = awayMatches ? this.pointsCounter(awayMatches, 'away') : 0;
    // console.log('awayPoints do setTotalPoints: ', awayPoints);

    return homePoints + awayPoints;
  };

  public setTotalMatches = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeMatches = homeMatches ? homeMatches.length : 0;
    const totalAwayMatches = awayMatches ? awayMatches.length : 0;
    // console.log('home: ', totalHomeMatches, 'away: ', totalAwayMatches);

    return totalHomeMatches + totalAwayMatches;
  };

  public victoriesCounter = (
    matches: IHomeMatches[],
    pitch: string,
  ) => {
    let totalHomeVictories = 0;
    let totalAwayVictories = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) totalHomeVictories += 1;
      if (match.homeTeamGoals < match.awayTeamGoals) totalAwayVictories += 1;
    });

    return pitch === 'home' ? totalHomeVictories : totalAwayVictories;
  };

  public setTotalVictories = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeVictories = homeMatches ? this.victoriesCounter(homeMatches, 'home') : 0;
    const totalAwayVictories = awayMatches ? this.victoriesCounter(awayMatches, 'away') : 0;

    return totalHomeVictories + totalAwayVictories;
  };

  public drawsCounter = (
    matches: IHomeMatches[],
  ) => {
    let totalDraws = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) totalDraws += 1;
    });

    return totalDraws;
  };

  public setTotalDraws = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeDraws = homeMatches ? this.drawsCounter(homeMatches) : 0;
    const totalAwayDraws = awayMatches ? this.drawsCounter(awayMatches) : 0;
    return totalHomeDraws + totalAwayDraws;
  };

  public lossesCounter = (
    matches: IHomeMatches[],
    pitch: string,
  ) => {
    let totalHomeLosses = 0;
    let totalAwayLosses = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) totalHomeLosses += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) totalAwayLosses += 1;
    });

    return pitch === 'home' ? totalHomeLosses : totalAwayLosses;
  };

  public setTotalLosses = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeLosses = homeMatches ? this.lossesCounter(homeMatches, 'home') : 0;
    const totalAwayLosses = awayMatches ? this.lossesCounter(awayMatches, 'away') : 0;
    return totalHomeLosses + totalAwayLosses;
  };

  public totalGoalsCounter = (matches: IHomeMatches[], pitch: string) => {
    let totalHomeGoals = 0;
    let totalAwayGoals = 0;
    matches.forEach((match) => {
      totalHomeGoals += match.homeTeamGoals;
      totalAwayGoals += match.awayTeamGoals;
    });
    return pitch === 'home' ? totalHomeGoals : totalAwayGoals;
  };

  public setTotalGoalsFor = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeGoalsFor = homeMatches ? this.totalGoalsCounter(homeMatches, 'home') : 0;
    const totalAwayGoalsFor = awayMatches ? this.totalGoalsCounter(awayMatches, 'away') : 0;
    return totalHomeGoalsFor + totalAwayGoalsFor;
  };

  public setTotalGoalsAgainst = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalHomeGoalsAgainst = homeMatches ? this.totalGoalsCounter(homeMatches, 'away') : 0;
    const totalAwayGoalsAgainst = awayMatches ? this.totalGoalsCounter(awayMatches, 'home') : 0;
    return totalHomeGoalsAgainst + totalAwayGoalsAgainst;
  };

  public setTotalGoalsDifferece = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalGoalsFor = this.setTotalGoalsFor(homeMatches, awayMatches);
    const totalGoalsAgainst = this.setTotalGoalsAgainst(homeMatches, awayMatches);
    return totalGoalsFor - totalGoalsAgainst;
  };

  public setTeamEfficiency = (
    homeMatches: IHomeMatches[] | undefined,
    awayMatches: IAwayMatches[] | undefined,
  ) => {
    const totalPoints = this.setTotalPoints(homeMatches, awayMatches);
    const totalPossiblePoints = this.setTotalMatches(homeMatches, awayMatches) * 3;
    const efficiency = (totalPoints / totalPossiblePoints) * 100;
    return (Math.round(efficiency * 100) / 100).toFixed(2);
  };

  public formatHomeTeamData(teamsData: IHomeTeamsData[]) {
    const tableData = teamsData.map(({ teamName, awayTeam, homeTeam }) => ({
      name: teamName,
      totalPoints: this.setTotalPoints(homeTeam, awayTeam),
      totalGames: this.setTotalMatches(homeTeam, awayTeam),
      totalVictories: this.setTotalVictories(homeTeam, awayTeam),
      totalDraws: this.setTotalDraws(homeTeam, awayTeam),
      totalLosses: this.setTotalLosses(homeTeam, awayTeam),
      goalsFavor: this.setTotalGoalsFor(homeTeam, awayTeam),
      goalsOwn: this.setTotalGoalsAgainst(homeTeam, awayTeam),
      goalsBalance: this.setTotalGoalsDifferece(homeTeam, awayTeam),
      efficiency: this.setTeamEfficiency(homeTeam, awayTeam),
    })).sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return tableData;
  }
}
