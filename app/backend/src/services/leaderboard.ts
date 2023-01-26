import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IHomeTeamsData } from './interfaces/ITeamsData';
import LeaderboardFormat from './useful/leaderboardFormat';

export default class LeaderboardService {
  public model = Team;
  public auxModel = Match;
  public formatter;

  constructor() {
    this.formatter = new LeaderboardFormat();
  }

  public async getAllHomeTeams() {
    const matches = await this.model.findAll({
      include: [
        {
          model: this.auxModel,
          where: { inProgress: false },
          as: 'homeTeam',
          attributes: { exclude: ['id', 'inProgress'] },
        },
      ],
    }) as unknown as IHomeTeamsData[];

    const formatedMatches = this.formatter.formatHomeTeamData(matches);
    return formatedMatches;
  }
}
