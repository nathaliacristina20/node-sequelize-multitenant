import Sequelize, { Model, DataTypes } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.fn('uuid_generate_v4'),
        }
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
  }

}

export default Project;