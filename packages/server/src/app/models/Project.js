import Sequelize, { Model, DataTypes } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
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