import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  public model = Match;

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
}
