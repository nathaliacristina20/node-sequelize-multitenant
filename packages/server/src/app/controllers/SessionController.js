import jwt from "jsonwebtoken";
import User from "../models/User";
import authConfig from "../../config/auth";
import AppError from "../errors/AppError";

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    if (!(await user.checkPassword(password))) {
      throw new AppError('Password does not match');
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControler();
