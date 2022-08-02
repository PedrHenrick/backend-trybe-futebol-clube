import ITeam from '../Interfaces/ITeam';
import IMatch from '../Interfaces/IMatch';
import { ILeaderboards } from '../Interfaces/ILeaderboards';

export default class Leaderboard {
  public calculateWins = (matches: IMatch[]) => {
    let wins = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) wins += 1;
    });
    return wins;
  };

  public calculateDraws = (matches: IMatch[]) => {
    let draws = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
    });
    return draws;
  };

  public calculateLosses = (matches: IMatch[]) => {
    let losses = 0;
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
    });
    return losses;
  };

  public calculateGoalsFavor = (matches: IMatch[]) => {
    let goals = 0;
    matches.forEach((match) => { goals += match.homeTeamGoals; });
    return goals;
  };

  public calculateGoalsOwn = (matches: IMatch[]) => {
    let goals = 0;
    matches.forEach((match) => { goals += match.awayTeamGoals; });
    return goals;
  };

  public putInOrder = async (leaderboards: ILeaderboards[]) => leaderboards
    .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

  public leaderboard = async (team: ITeam, matches: IMatch[]) => {
    const name = team.teamName;
    const totalGames = matches.length;
    const totalVictories = this.calculateWins(matches);

    const totalDraws = this.calculateDraws(matches);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const totalLosses = this.calculateLosses(matches);
    const goalsFavor = this.calculateGoalsFavor(matches);
    const goalsOwn = this.calculateGoalsOwn(matches);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const firstReturn = { totalPoints, totalGames, totalVictories, totalDraws };
    const secondReturn = { totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };

    return { name, ...firstReturn, ...secondReturn };
  };
}
