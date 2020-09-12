import Sequelize from "sequelize";
import Invite from '../app/models/Invite';
import Project from '../app/models/Project';
import Team from '../app/models/Team';
import User from '../app/models/User';

import databaseConfig from "../config/database";

const models = [Invite, Project, Team, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
