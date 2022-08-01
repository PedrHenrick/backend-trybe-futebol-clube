// import ErrorHandle from '../Middleware/Class/error';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../Models/Match.model';

export default class MatchService {
  public getAllMatches = async () => {
    const allMatches = await new MatchModel().getAllMatches();
    return allMatches;
  };

  public getMatchesInProgress = async (inProgress: boolean) => {
    const matchesInProgress = await new MatchModel().getMatchesInProgress(inProgress);
    return matchesInProgress;
  };

  public addMatch = async (additionScheme: IMatch) => {
    const resultMatch = await new MatchModel().addMatch(additionScheme);
    return resultMatch;
  };
}
