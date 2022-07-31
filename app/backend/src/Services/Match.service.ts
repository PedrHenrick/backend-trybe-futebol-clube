// import ErrorHandle from '../Middleware/Class/error';
import MatchModel from '../Models/Match.model';

export default class MatchService {
  public getAllMatches = async () => {
    const allMatches = await new MatchModel().getAllMatches();
    return allMatches;
  };
}
