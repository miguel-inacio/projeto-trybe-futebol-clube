import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchesService {
  public model = Match;

  // public async getAllMatches() {
  //   const allMatches = await this.model.findAll();
  //   console.log('resultado da query: ', allMatches);
  //   return allMatches;
  // }

  public async getAllMatches() {
    const allMatches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    const matchesDataValues = allMatches.map((match) => match.dataValues);
    console.log(matchesDataValues);
    return matchesDataValues;
  }
}
