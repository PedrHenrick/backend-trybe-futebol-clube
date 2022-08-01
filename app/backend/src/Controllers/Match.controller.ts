import { Request, Response } from 'express';
import MatchService from '../Services/Match.service';

export default class MatchController {
  public getAllMatches = async (request: Request, response: Response): Promise<Response> => {
    const { inProgress } = request.query;

    if (inProgress) {
      const matchesInProgress = await new MatchService()
        .getMatchesInProgress(inProgress === 'true');
      return response.status(200).json(matchesInProgress);
    }

    const allMatches = await new MatchService().getAllMatches();
    return response.status(200).json(allMatches);
  };

  public addMatch = async (request: Request, response: Response): Promise<Response> => {
    const resultMatch = await new MatchService().addMatch(request.body);
    return response.status(201).json(resultMatch);
  };
}
