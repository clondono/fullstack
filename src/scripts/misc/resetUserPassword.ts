import Minimist from 'minimist';
import AuthPasswordReset from '../../includes/auth/passwordReset';

const Argv = Minimist(process.argv.slice(2));

const main = async() => {
  const email = Argv.email;
  const new_password = Argv.new_password;
  await AuthPasswordReset.forceResetFromEmail({
    email,
    new_password,
  });
  process.exit(0);
};

main();
