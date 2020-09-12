import Sequelize, { Model, DataTypes } from "sequelize";

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: "user_team",
      as: "users",
      foreignKey: "team_id",
      otherKey: "user_id",
    });
  }
}

export default Team;
