import _ from 'lodash';
import Config from '../../config';
import PgQuery from '../clients/pg';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';
const _capitalize = (word?: string) => {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return '';
};

const formatUser = (row: any) => {
  const display_name = row.first_name ? `${_capitalize(row.first_name)} ${_capitalize(row.last_name)}` : row.email;
  return {
    ...row,
    display_name,
  };
};

const getByEmail = async ({ email }: { email: string }) => {
  const query = `SELECT 
      email,
      password_hash,
      user_id,
      first_name,
      last_name,
      created_at, 
      updated_at 
    FROM  ${Config.POSTGRES.TABLES.USERS.BASE} WHERE email = $/email/`;
  const rows = await PgQuery.query({ query, bindings: { email } });
  if (_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.INVALID_USER);
  }
  return formatUser(rows[0]);
};

const getByUserId = async ({ user_id }: { user_id: string }) => {
  const query = `
    SELECT 
      email,
      password_hash,
      user_id,
      first_name,
      last_name,
      created_at, 
      updated_at 
    FROM  ${Config.POSTGRES.TABLES.USERS.BASE} WHERE user_id = $/user_id/`;
  const rows = await PgQuery.query({ query, bindings: { user_id } });
  if (_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.INVALID_USER);
  }
  return formatUser(rows[0]);
};

const existingEmail = async ({ email }: { email: string }) => {
  try {
    await getByEmail({ email });
    return true;
  } catch (e) {
    return false;
  }
};

export default {
  getByEmail,
  existingEmail,
  getByUserId,
};
