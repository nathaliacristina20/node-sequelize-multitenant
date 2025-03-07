import Team from '../models/Team';

class CreateTeamService {
  async run({ name, userId }) {
    const team = await Team.create({ name, user_id: userId });
    return team;
  }
}

export default new CreateTeamService();
