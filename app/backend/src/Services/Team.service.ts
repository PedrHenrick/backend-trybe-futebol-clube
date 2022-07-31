import ErrorHandle from '../Middleware/Class/error';
import TeamModel from '../Models/Team.model';

export default class TeamService {
  public getAllTeams = async () => {
    const allTeams = await new TeamModel().getAllTeams();
    return allTeams;
  };

  public getOneTeam = async (id: number) => {
    const team = await new TeamModel().getOneTeam(id);
    if (!team) throw new ErrorHandle(400, 'User is not exists');
    return team;
  };
}
