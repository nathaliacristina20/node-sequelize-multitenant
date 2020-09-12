import Sequelize, { Model, DataTypes } from "sequelize";

class Invite extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn("uuid_generate_v4"),
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        team_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Team, { foreignKey: "team_id", as: "team" });
  }
}

export default Invite;
