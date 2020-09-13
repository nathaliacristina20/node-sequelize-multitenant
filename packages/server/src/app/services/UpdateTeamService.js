import Team from '../models/Team';
import AppError from '../errors/AppError';

class UpdateTeamService {
  async run({ id, name, userId }) {
    const team = await Team.findByPk(id);

    if (!team) {
      throw new AppError('Team not found');
    }

    if (team.user_id !== userId) {
      throw new AppError('Not authorized', 401);
    }

    team.name = name;
    await team.save();
    return team;
  }
}

export default new UpdateTeamService();
