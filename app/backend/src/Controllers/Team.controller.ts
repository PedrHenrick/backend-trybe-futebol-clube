import { Request, Response } from 'express';
import TeamService from '../Services/Team.service';

export default class TeamController {
  public getAllTeams = async (_request: Request, response: Response): Promise<Response> => {
    const allTeams = await new TeamService().getAllTeams();
    return response.status(200).json(allTeams);
  };

  public getOneTeam = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const team = await new TeamService().getOneTeam(Number(id));
    return response.status(200).json(team);
  };
}
