// import ErrorHandle from '../Middleware/Class/error';
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
}
