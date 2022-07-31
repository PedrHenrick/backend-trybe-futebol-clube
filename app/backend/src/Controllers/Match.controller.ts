import { Request, Response } from 'express';
import MatchService from '../Services/Match.service';

export default class MatchController {
  public getAllMatches = async (_request: Request, response: Response): Promise<Response> => {
    const allMatches = await new MatchService().getAllMatches();
    return response.status(200).json(allMatches);
  };
}
