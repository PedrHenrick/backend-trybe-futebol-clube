import Team from '../database/models/team';

export default class TeamModel {
  public getAllTeams = () => Team.findAll();

  public getOneTeam = (id: number) => Team.findOne({ where: { id } });
}
