// import ErrorHandle from '../Middleware/Class/error';
import TeamModel from '../Models/Team.model';

export default class TeamService {
  public getAllTeams = async () => {
    const allTeams = await new TeamModel().getAllTeams();
    return allTeams;
  };
}
