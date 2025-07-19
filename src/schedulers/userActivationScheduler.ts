import cron from 'node-cron';
import { Op } from 'sequelize';
import User from '../models/user';
import { sendActivationEmail } from "../utils/emailService"

export const activateUsersJob = async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const usersToActivate = await User.findAll({
    where: {
      status: 'inactive',
      createdAt: {
        [Op.lte]: fifteenMinutesAgo,
      },
    },
  });

  for (const user of usersToActivate) {
    user.status = 'active';
    await user.save();
    sendActivationEmail(user.email);
  }
};


cron.schedule('* * * * *', activateUsersJob);
