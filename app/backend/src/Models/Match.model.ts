import Team from '../database/models/team';
import Match from '../database/models/match';
import IMatch from '../Interfaces/IMatch';

export default class MatchModel {
  public getAllMatches = () => Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  public getMatchesInProgress = (inProgress: boolean) => Match.findAll({
    where: { inProgress },
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  public addMatch = async (additionScheme: IMatch) => {
    const result = await Match.create(additionScheme);
    return result;
  };
}
