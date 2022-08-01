import ErrorHandle from '../Middleware/Class/error';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../Models/Match.model';
import TeamModel from '../Models/Team.model';

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
    const homeTeam = await new TeamModel().getOneTeam(additionScheme.homeTeam);
    const awayTeam = await new TeamModel().getOneTeam(additionScheme.awayTeam);

    if (!homeTeam || !awayTeam) throw new ErrorHandle(404, 'There is no team with such id!');

    if (additionScheme.homeTeam === additionScheme.awayTeam) {
      throw new ErrorHandle(401, 'It is not possible to create a match with two equal teams');
    }

    const resultMatch = await new MatchModel().addMatch(additionScheme);
    return resultMatch;
  };

  public endMatch = async (id: number, inProgress: boolean) => {
    const match = await new MatchModel().getOneMatch(id);

    if (!match) throw new ErrorHandle(400, 'The match does not exist');

    const editedResult = await new MatchModel().updateMatch(id, inProgress);
    return editedResult;
  };
}
