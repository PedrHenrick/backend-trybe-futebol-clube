import { Request, Response } from 'express';
import LeaderboardService from '../Services/Leaderboard.service';

export default class LeaderboardController {
  public getResultOfHome = async (_request: Request, response: Response): Promise<Response> => {
    const resultOfHome = await new LeaderboardService().getResultOfHome();
    return response.status(200).json(resultOfHome);
  };

  public getResultOfAway = async (_request: Request, response: Response): Promise<Response> => {
    const resultOfAway = await new LeaderboardService().getResultOfAway();
    return response.status(200).json(resultOfAway);
  };

  public getResult = async (_request: Request, response: Response): Promise<Response> => {
    const result = await new LeaderboardService().getResult();
    return response.status(200).json(result);
  };
}
