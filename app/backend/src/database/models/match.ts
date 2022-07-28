import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

Match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    unique: true,
    allowNull: false,
    field: 'away_team',
    references: { model: 'teams', key: 'id' },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id' });
Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'id' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'id' });

export default Match;
