import Team from '../database/models/Team';
import Match from '../database/models/Match';
import TMatchData from './interfaces/TMatchData';
import TeamsService from './teams';
import IScore from './interfaces/IScore';

export default class MatchesService {
  public model = Match;
  public auxService;

  constructor() {
    this.auxService = new TeamsService();
  }

  public async getAllMatches(inProgress: string) {
    const allMatches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const matchesDataValues = allMatches.map((match) => match.dataValues);

    if (inProgress === 'true') {
      const matchesInProgress = matchesDataValues.filter((match) => match.inProgress === true);
      return matchesInProgress;
    }

    if (inProgress === 'false') {
      const finishedMatches = matchesDataValues.filter((match) => match.inProgress === false);
      return finishedMatches;
    }

    return matchesDataValues;
  }

  public async verifyTeams(homeId: number, awayId: number) {
    const homeTeam = await this.auxService.getTeamById(homeId);
    const awayTeam = await this.auxService.getTeamById(awayId);

    if (!homeTeam || !awayTeam) return { message: 'There is no team with such id!' };
  }

  public async addMatchInProgress(matchData: TMatchData) {
    const error = await this.verifyTeams(matchData.homeTeamId, matchData.awayTeamId);
    if (error) return error;

    const newMatch = await this.model.create({ ...matchData, inProgress: true });
    return { ...newMatch.dataValues };
  }

  public async finishMatch(id: string) {
    await this.model.update(
      { inProgress: 'false' },
      { where: { id } },
    );
    return { message: 'Finished' };
  }

  public async updateScore(id: string, newScore: IScore) {
    const { homeTeamGoals, awayTeamGoals } = newScore;
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { message: 'Score updated!' };
  }
}
