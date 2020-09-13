import User from '../models/User';
import AppError from '../errors/AppError';

class CreateUserService {
  async run(body) {
    const userExists = await User.findOne({
      where: { email: body.email },
    });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const { id, name, email } = await User.create(body);

    return {
      id,
      name,
      email,
    };
  }
}

export default new CreateUserService();
