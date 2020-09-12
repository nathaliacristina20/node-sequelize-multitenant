import Sequelize, { Model, DataTypes } from 'sequelize';

class Invite extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
        user_id: Sequelize.STRING,
        team_id: Sequelize.STRING
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
  }

}

export default Invite;