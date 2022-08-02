import ITeam from '../Interfaces/ITeam';
import IMatch from '../Interfaces/IMatch';
import { ILeaderboards } from '../Interfaces/ILeaderboards';

export default class Leaderboard {
  public calculateWins = (type: string, id: number, matches: IMatch[]) => {
    let wins = 0;
    matches.forEach((match) => {
      if (type === 'home') {
        if (match.homeTeamGoals > match.awayTeamGoals) wins += 1;
      } else if (type === 'away') {
        if (match.awayTeamGoals > match.homeTeamGoals) wins += 1;
      } else if (match.homeTeam === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) wins += 1;
      } else if (match.awayTeamGoals > match.homeTeamGoals) wins += 1;
    });
    return wins;
  };

  public calculateDraws = (type: string, id: number, matches: IMatch[]) => {
    let draws = 0;
    matches.forEach((match) => {
      if (type === 'home') {
        if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
      } else if (type === 'away') {
        if (match.awayTeamGoals === match.homeTeamGoals) draws += 1;
      } else if (match.homeTeam === id) {
        if (match.homeTeamGoals === match.awayTeamGoals) draws += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) draws += 1;
    });
    return draws;
  };

  public calculateLosses = (type: string, id: number, matches: IMatch[]) => {
    let losses = 0;
    matches.forEach((match) => {
      if (type === 'home') {
        if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
      } else if (type === 'away') {
        if (match.awayTeamGoals < match.homeTeamGoals) losses += 1;
      } else if (match.homeTeam === id) {
        if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
      } else if (match.awayTeamGoals < match.homeTeamGoals) losses += 1;
    });
    return losses;
  };

  public calculateGoalsFavor = (type: string, id: number, matches: IMatch[]) => {
    let goals = 0;
    matches.forEach((match) => {
      if (type === 'home') {
        goals += match.homeTeamGoals;
      } else if (type === 'away') {
        goals += match.awayTeamGoals;
      } else if (match.homeTeam === id) {
        goals += match.homeTeamGoals;
      } else if (match.awayTeam === id) goals += match.awayTeamGoals;
    });
    return goals;
  };

  public calculateGoalsOwn = (type: string, id: number, matches: IMatch[]) => {
    let goals = 0;
    matches.forEach((match) => {
      if (type === 'home') {
        goals += match.awayTeamGoals;
      } else if (type === 'away') {
        goals += match.homeTeamGoals;
      } else if (match.homeTeam === id) {
        goals += match.awayTeamGoals;
      } else if (match.awayTeam === id) goals += match.homeTeamGoals;
    });
    return goals;
  };

  public putInOrder = async (leaderboards: ILeaderboards[]) => leaderboards
    .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);

  public leaderboard = async (type: string, team: ITeam, matches: IMatch[]) => {
    const name = team.teamName;
    const totalGames = matches.length;
    const totalVictories = this.calculateWins(type, team.id, matches);
    const totalDraws = this.calculateDraws(type, team.id, matches);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const totalLosses = this.calculateLosses(type, team.id, matches);
    const goalsFavor = this.calculateGoalsFavor(type, team.id, matches);
    const goalsOwn = this.calculateGoalsOwn(type, team.id, matches);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const firstReturn = { totalPoints, totalGames, totalVictories, totalDraws };
    const secondReturn = { totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };

    return { name, ...firstReturn, ...secondReturn };
  };
}
