import TeamModel from '../Models/Team.model';
import MatchModel from '../Models/Match.model';
import Leaderboard from '../Utils/Leaderboard';

export default class LeaderboardService {
  public getResultOfHome = async () => {
    const teams = await new TeamModel().getAllTeams();
    const matches = await new MatchModel().getAllMatchesNotInProgress();

    const allTeamsOfHome = await Promise.all(teams.map((team) => {
      const allMatchesOfHomeTeam = matches.filter((match) => match.homeTeam === team.id);
      return new Leaderboard().leaderboard('home', team, allMatchesOfHomeTeam);
    }));

    return new Leaderboard().putInOrder(allTeamsOfHome);
  };

  public getResultOfAway = async () => {
    const teams = await new TeamModel().getAllTeams();
    const matches = await new MatchModel().getAllMatchesNotInProgress();

    const allTeamsOfAway = await Promise.all(teams.map((team) => {
      const allMatchesOfAwayTeam = matches.filter((match) => match.awayTeam === team.id);
      return new Leaderboard().leaderboard('away', team, allMatchesOfAwayTeam);
    }));

    return new Leaderboard().putInOrder(allTeamsOfAway);
  };

  public getResult = async () => {
    const teams = await new TeamModel().getAllTeams();
    const matches = await new MatchModel().getAllMatchesNotInProgress();

    const allTeams = await Promise.all(teams.map((team) => {
      const allMatchesTeam = matches
        .filter((match) => match.awayTeam === team.id || match.homeTeam === team.id);
      return new Leaderboard().leaderboard('any', team, allMatchesTeam);
    }));

    return new Leaderboard().putInOrder(allTeams);
  };
}
