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

  public async queryTeamsByPitch(pitch: string) {
    const matches = await this.model.findAll({
      include: [{
        model: this.auxModel,
        where: { inProgress: false },
        as: pitch,
        attributes: { exclude: ['id', 'inProgress'] },
      }],
    }) as unknown as IHomeTeamsData[];
    console.log(pitch);
    return matches;
  }

  public async queryAllTeams() {
    const matches = await this.model.findAll({
      include: [{
        model: this.auxModel,
        where: { inProgress: false },
        as: 'homeTeam',
        attributes: { exclude: ['id', 'inProgress'] },
      },
      {
        model: this.auxModel,
        where: { inProgress: false },
        as: 'awayTeam',
        attributes: { exclude: ['id', 'inProgress'] },
      },
      ],
    }) as unknown as IHomeTeamsData[];
    return matches;
  }

  public async getAllTeamsByPitch(pitch: string) {
    let matches;
    if (pitch === '/home') matches = await this.queryTeamsByPitch('homeTeam');
    if (pitch === '/away') matches = await this.queryTeamsByPitch('awayTeam');
    else matches = await this.queryAllTeams();
    // console.log(pitch);
    // console.log(matches[0].homeTeam);
    // console.log(matches[0].awayTeam);

    const formatedMatches = this.formatter.formatHomeTeamData(matches);
    return formatedMatches;
  }
}
