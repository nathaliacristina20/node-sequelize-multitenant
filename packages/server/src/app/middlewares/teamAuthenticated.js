import AppError from '../errors/AppError';
import Team from '../models/Team';

export default async (req, res, next) => {
  const slug = req.header('TEAM');

  let team = null;

  if (slug) {
    team = await Team.findOne({
      where: {
        slug,
        user_id: req.userId,
      },
    });
  }

  if (!team) {
    throw new AppError('Not authorized', 401);
  }

  // req.user.currentTeam = team.id;
  req.team = team;

  return next();
};
