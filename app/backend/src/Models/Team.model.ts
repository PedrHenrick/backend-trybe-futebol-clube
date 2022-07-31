// import ITeam from '../Interfaces/ITeam';
import Team from '../database/models/team';

export default class TeamModel {
  public getAllTeams = () => Team.findAll();
}
