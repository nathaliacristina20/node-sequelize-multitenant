import Team from '../models/Team';
import CreateTeamService from '../services/CreateTeamService';
import UpdateTeamService from '../services/UpdateTeamService';
import DeleteTeamService from '../services/DestroyTeamService';
import AppError from '../errors/AppError';

class TeamController {
  async index(req, res) {
    const teams = await Team.findAll({
      where: {
        user_id: req.userId,
      },
    });
    return res.json(teams);
  }

  async store(req, res) {
    const { name } = req.body;
    const team = await CreateTeamService.run({ name, userId: req.userId });
    return res.json(team);
  }

  async show(req, res) {
    const { id } = req.params;

    const teams = await Team.findByPk(id);

    if (!teams) {
      throw new AppError('Team not found');
    }

    if (teams.user_id !== req.userId) {
      throw new AppError('Not authorized', 401);
    }
    return res.json(teams);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const team = await UpdateTeamService.run({ id, name, userId: req.userId });
    return res.json(team);
  }

  async delete(req, res) {
    const { id } = req.params;
    await DeleteTeamService.run({ id, userId: req.userId });
    return res.status(204).send();
  }
}

export default new TeamController();
