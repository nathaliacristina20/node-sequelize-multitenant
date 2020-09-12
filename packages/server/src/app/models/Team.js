import Sequelize, { Model, DataTypes } from "sequelize";
import SequelizeSlugify from "sequelize-slugify";

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
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
      }
    );

    SequelizeSlugify.slugifyModel(Team, {
      source: ["slug"],
    });

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
