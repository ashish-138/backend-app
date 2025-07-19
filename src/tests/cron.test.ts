import { activateUsersJob } from '../schedulers/userActivationScheduler';
import User from '../models/user';

it('should activate users created 15 minutes ago', async () => {
  const user = await User.create({
    fullname: 'Test User',
    email: `cron${Date.now()}@test.com`,
    password: 'hashed',
    gender: 'Male',
    mobile: '9876543210',
    status: 'inactive',
    createdAt: new Date(Date.now() - 16 * 60 * 1000),
  });

  await activateUsersJob();

  const updated = await User.findByPk(user.id);
  expect(updated?.status).toBe('active');
});
