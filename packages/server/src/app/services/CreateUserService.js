import User from '../models/User';
import Invite from '../models/Invite';
import AppError from '../errors/AppError';

class CreateUserService {
  async run(body) {
    const teamsQuery = await Invite.findOne({
      where: {
        email: body.email,
      },
    });

    if (!teamsQuery) {
      throw new AppError(`You're not invited to any team`);
    }

    const findUser = await User.findOne({
      where: { email: body.email },
    });

    if (findUser) {
      throw new AppError('User already exists');
    }

    const user = await User.create(body);

    await user.setTeams(teamsQuery.dataValues.team_id);

    await teamsQuery.destroy();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default new CreateUserService();
