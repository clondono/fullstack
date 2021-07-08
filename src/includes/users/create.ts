import Bcrypt from 'bcrypt';
import _ from 'lodash';
import UuidBase62 from 'uuid-base62';
import Config from '../../config';
import PgQuery from '../clients/pg';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';
import UsersGet from './get';

interface createUserParams {
  email: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  password: string;
  user_id?: string | undefined;
  company?: string | undefined;
}

const create = async ({ email, password, first_name, last_name, company }: createUserParams) => {
  if (!email) {
    throw new CustomError(ErrorOptions.MISSING_EMAIL);
  }
  if (!password) {
    throw new CustomError(ErrorOptions.MISSING_PASSWORD);
  }
  const exists = await UsersGet.existingEmail({ email });
  if (exists) {
    throw new CustomError(ErrorOptions.EXISTING_EMAIL);
  }

  const password_hash: string = await Bcrypt.hash(password, Config.PASSWORD_SALT_ROUNDS);

  const binding_variables = [];
  const columns = [];
  const bindings: createUserParams = {
    email,
    password: password_hash,
  };

  columns.push('email');
  binding_variables.push('$/email/');
  bindings.email = email;

  columns.push('password_hash');
  binding_variables.push('$/password/');

  columns.push('user_id');
  binding_variables.push('$/user_id/');
  bindings.user_id = UuidBase62.v4();

  if (!_.isEmpty(first_name)) {
    columns.push('first_name');
    binding_variables.push('$/first_name/');
    bindings.first_name = first_name;
  }
  if (!_.isEmpty(last_name)) {
    columns.push('last_name');
    binding_variables.push('$/last_name/');
    bindings.last_name = last_name;
  }
  if (!_.isEmpty(company)) {
    columns.push('company');
    binding_variables.push('$/company/');
    bindings.company = company;
  }

  columns.push('created_at');
  columns.push('updated_at');
  const query = `insert into ${Config.POSTGRES.TABLES.USERS.BASE}(${columns.join(
    ', '
  )}) VALUES(${binding_variables.join(', ')}, NOW(), NOW()) `;
  await PgQuery.query({ query, bindings });

  return UsersGet.getByEmail({ email });
};

const createInvited = async ({
  email,
  first_name,
  last_name,
}: {
  email: string;
  first_name?: string;
  last_name?: string;
}) => {
  // const password = GeneratePassword.generate({
  //     length: 10,
  //     numbers: true
  // });
  const password = Config.DEFAULT_PASSWORD;
  const created_user = await create({ email, password, first_name, last_name });
  // TODO email for invites
  return created_user;
};

export default {
  create,
  createInvited,
};
