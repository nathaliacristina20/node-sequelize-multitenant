import Team from '../models/Team';
import AppError from '../errors/AppError';

class DeleteTeamService {
  async run({ id, userId }) {
    const team = await Team.findByPk(id);

    if (!team) {
      throw new AppError('Team not found');
    }

    if (team.user_id !== userId) {
      throw new AppError('Not authorized', 401);
    }

    await team.destroy();
  }
}

export default new DeleteTeamService();
