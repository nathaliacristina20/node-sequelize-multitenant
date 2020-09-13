/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Sequelize, { Model } from 'sequelize';
import User from './User';
import Team from './Team';

class Invite extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        user_id: {
          type: Sequelize.UUIDV4,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        team_id: {
          type: Sequelize.UUIDV4,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('afterBulkCreate', async invites => {
      let email = null;

      for (const invite of invites) {
        email = invite.dataValues.email;

        const invited = await User.findOne({
          where: {
            email,
          },
          include: {
            model: Team,
            as: 'teams',
          },
        });

        if (invited) {
          await invited.setTeams(invite.dataValues.team_id);
        } else {
          console.log('Criar conta e enviar email');
        }
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team' });
  }
}

export default Invite;
