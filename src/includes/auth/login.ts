import Bcrypt from 'bcrypt';
import { session_record } from '../../ts/interfaces/user';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';
import UsersGet from '../users/get';

const login = async({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<session_record> => {
  const user = await UsersGet.getByEmail({ email });
  const passwords_match: boolean = await Bcrypt.compare(
    password,
    user.password_hash,
  );
  if (!passwords_match) {
    throw new CustomError(ErrorOptions.WRONG_PASSWORD);
  }

  delete user.password_hash;
  return user;
};

export default {
  login,
};
