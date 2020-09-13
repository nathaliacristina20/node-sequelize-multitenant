import Sequelize, { Model } from 'sequelize';
import slugify from 'slugify';

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        slug: {
          type: Sequelize.STRING,
          unique: true,
        },
        user_id: {
          type: Sequelize.UUIDV4,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async team => {
      team.slug = slugify(team.name).toLowerCase();
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'users_teams',
      as: 'users',
      foreignKey: 'team_id',
      otherKey: 'user_id',
    });
  }
}

export default Team;
