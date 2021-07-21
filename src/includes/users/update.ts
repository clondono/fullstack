import Bcrypt from 'bcrypt';
import _ from 'lodash';
import Config from '../../config/';
import { user_record } from '../../ts/interfaces/user';
import PgQuery from '../clients/pg';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';
import UsersGet from '../users/get';

const USERS_TABLE = Config.POSTGRES.TABLES.USERS.BASE;

interface UpdatePersonalDetailsParams {
  user_id: string;
  first_name?: string;
  last_name?: string;
  company?: string;
}
const updatePersonalDetails = async({
  user_id,
  first_name,
  last_name,
  company,
}: UpdatePersonalDetailsParams): Promise<user_record> => {
  const old_user = await UsersGet.getByUserId({ user_id });

  const bindings: UpdatePersonalDetailsParams = { user_id };
  const update_parts = [];

  if (old_user.first_name !== first_name) {
    update_parts.push('first_name=$/first_name/');
    bindings.first_name = first_name;
  }
  if (old_user.last_name !== last_name) {
    update_parts.push('last_name=$/last_name/');
    bindings.last_name = last_name;
  }
  if (old_user.company !== company) {
    update_parts.push('company=$/company/');
    bindings.company = company;
  }
  if (!_.isEmpty(update_parts)) {
    const query = `UPDATE ${USERS_TABLE} SET ${update_parts.join(
      ', ',
    )} WHERE user_id=$/user_id/ `;
    await PgQuery.query({ query, bindings });
    return UsersGet.getByUserId({ user_id });
  }

  return old_user;
};

interface UpdatePaswordParams {
  user_id: string;
  password: string;
  new_password: string;
  new_password_confirm: string;
}

const updatePassword = async({
  user_id,
  password,
  new_password,
  new_password_confirm,
}: UpdatePaswordParams): Promise<user_record> => {
  if (new_password !== new_password_confirm) {
    throw new CustomError(ErrorOptions.PASSWORDS_MISMATCH);
  }
  const user = await UsersGet.getByUserId({ user_id });
  const passwords_match: boolean = await Bcrypt.compare(
    password,
    user.password_hash,
  );
  if (!passwords_match) {
    throw new CustomError(ErrorOptions.WRONG_PASSWORD);
  }
  const password_hash: string = await Bcrypt.hash(
    password,
    Config.PASSWORD_SALT_ROUNDS,
  );

  const query = `update ${USERS_TABLE} set password_hash=$/password_hash/ WHERE user_id=$/user_id/`;
  await PgQuery.query({ query, bindings: { user_id: user_id, password_hash } });
  return UsersGet.getByUserId({ user_id });
};

export default {
  updatePassword,
  updatePersonalDetails,
};
