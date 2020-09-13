import CreateInviteService from '../services/CreateInviteService';

class InviteController {
  async store(req, res) {
    const { invites } = req.body;
    const invite = await CreateInviteService.run({
      invites,
      userId: req.userId,
      teamId: req.team.id,
    });
    return res.json(invite);
  }
}

export default new InviteController();
