import Team from '../database/models/Team';

export default class TeamsService {
  public model = Team;

  public async getAllTeams() {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
