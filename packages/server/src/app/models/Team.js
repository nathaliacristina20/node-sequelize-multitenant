import Sequelize, { Model, DataTypes } from "sequelize";

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn("uuid_generate_v4"),
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
