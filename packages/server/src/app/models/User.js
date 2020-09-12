import Sequelize, { Model, DataTypes } from "sequelize";

class User extends Model {
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
    this.belongsToMany(models.Team, {
      through: "user_team",
      as: "teams",
      foreignKey: "user_id",
      otherKey: "team_id",
    });
  }
}

export default User;
