import Bluebird from 'bluebird';
import UsersCreate from '../../includes/users/create';

const main = async () => {
  const users = [
    {
      first_name: 'test',
      last_name: '',
      email: 'test_login@thehive.ai',
      password: 'Honey3pot8',
      company: 'thehive.ai',
    },
  ];
  await Bluebird.map(
    users,
    (user) => {
      return UsersCreate.create(user);
    },
    { concurrency: 1 }
  );

  process.exit(0);
};

main();
