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

  public getAllMatchesNotInProgress = () => Match.findAll({
    where: { inProgress: false },
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  public getOneMatch = (id: number) => Match.findOne({ where: { id } });

  public getMatchesInProgress = (inProgress: boolean) => Match.findAll({
    where: { inProgress },
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });

  public addMatch = (additionScheme: IMatch) => Match.create(additionScheme);

  public finishMatch = async (id: number, inProgress: boolean) => Match
    .update({ inProgress }, { where: { id } });

  public updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => Match
    .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
}
