import Sequelize, { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Team, {
      through: "user_team",
      as: "teams",
      foreignKey: "user_id",
      otherKey: "team_id",
    });
  }
}

export default User;
