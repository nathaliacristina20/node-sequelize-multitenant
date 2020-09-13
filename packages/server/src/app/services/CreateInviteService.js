import Invite from '../models/Invite';

class CreateInviteService {
  async run({ invites, userId, teamId }) {
    const data = invites.map(email => ({
      email,
      user_id: userId,
      team_id: teamId,
    }));

    const invite = await Invite.bulkCreate(data);
    return invite;
  }
}

export default new CreateInviteService();
