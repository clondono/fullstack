/* @flow */
import Bcrypt from 'bcrypt';
import UuidBase62 from 'uuid-base62';
import Config from '../../config';
import { SqlQueryParams } from '../../ts/interfaces/pg';
import Logger from '../clients/logger';
import PgQuery from '../clients/pg';
import Email from '../emails/email';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';
import UsersGet from '../users/get';

const logger = new Logger();

const PASSWORD_RESETS_TABLE = Config.POSTGRES.TABLES.USERS.PW_RESETS;
const USERS_TABLE = Config.POSTGRES.TABLES.USERS.BASE;

const forceResetFromEmail = async ({
  email,
  new_password,
}: {
  email: string;
  new_password: string;
}) => {
  const user_id = (await UsersGet.getByEmail({ email })).user_id;
  const password_hash: string = await Bcrypt.hash(new_password, Config.PASSWORD_SALT_ROUNDS);
  const queries: SqlQueryParams[] = [];
  //update password
  await PgQuery.query([
    {
      query: `UPDATE ${USERS_TABLE} SET password_hash=$/password_hash/ WHERE user_id=$/user_id/`,
      bindings: {
        user_id,
        password_hash,
      },
    },
  ]);
  return await UsersGet.getByUserId({ user_id });
};

const reset = async ({
  user_id,
  token,
  new_password,
  new_password_confirm,
}: {
  user_id: string;
  token: string;
  new_password: string;
  new_password_confirm: string;
}) => {
  if (new_password != new_password_confirm) {
    throw new CustomError(ErrorOptions.PASSWORDS_MISMATCH);
  }
  const resetToken = await PgQuery.query([
    {
      query: `SELECT used FROM ${PASSWORD_RESETS_TABLE} WHERE user_id=$/user_id/ AND token=$/token/`,
      bindings: { user_id, token },
    },
  ]);

  if (!resetToken || (resetToken && resetToken[0].used)) {
    throw new CustomError(ErrorOptions.BAD_REQUEST);
  }

  try {
    const password_hash: string = await Bcrypt.hash(new_password, Config.PASSWORD_SALT_ROUNDS);
    const queries: SqlQueryParams[] = [];
    //update password
    queries.push({
      query: `UPDATE ${USERS_TABLE} SET password_hash=$/password_hash/ WHERE user_id=$/user_id/`,
      bindings: {
        user_id,
        password_hash,
      },
    });
    //delete old tokens
    queries.push({
      query: `DELETE FROM ${PASSWORD_RESETS_TABLE} WHERE used=TRUE AND user_id=$/user_id/`,
      bindings: {
        user_id,
      },
    });
    //delete old tokens
    queries.push({
      query: `UPDATE ${PASSWORD_RESETS_TABLE} SET used=TRUE WHERE user_id=$/user_id/ AND token=$/token/`,
      bindings: {
        user_id,
        token,
      },
    });
    await PgQuery.query(queries);
    return await UsersGet.getByUserId({ user_id });
  } catch (e) {
    logger.error(e);
    throw new CustomError(ErrorOptions.PASSWORD_RESET_FAIL);
  }
};

const request = async ({
  email,
  endpoint,
}: {
  email: string;
  endpoint: string;
}): Promise<{ display_message: string }> => {
  try {
    const user = await UsersGet.getByEmail({ email: email.toLowerCase() });
    const user_id: string = user.user_id;
    let token: string = UuidBase62.v4();

    const query: string = `INSERT INTO ${PASSWORD_RESETS_TABLE} ("user_id", "email", "token") VALUES ($/user_id/, $/email/, $/token/)`;
    const bindings = { user_id, email, token };
    try {
      await PgQuery.query([{ query, bindings }]);
    } catch (e) {
      if (e.code == '23505') {
        // user has already requested pw reset, and the token is still valid (unexpired and not used). therefore re-send email, don't alter database
        const query_match = `SELECT token from ${PASSWORD_RESETS_TABLE} WHERE user_id=$/user_id/ AND NOT used`;
        const bindings_match = { user_id };
        const match = await PgQuery.query([{ query: query_match, bindings: bindings_match }]);
        token = match[0].token;
      } else {
        logger.error(e);
        throw new CustomError(ErrorOptions.POSTGRES);
      }
    }
    await sendPasswordResetEmail({ user_id, email, token, endpoint });
  } catch (e) {
    logger.error(e);
  }
  return {
    display_message:
      'Password reset link has been sent to the email, if the user email matches our record.',
  };
};

type UserDetails = {
  user_id: string;
  email: string;
  token: string;
  endpoint: string;
};

const sendPasswordResetEmail = async ({ user_id, email, token, endpoint }: UserDetails) => {
  const prepend =
    endpoint.indexOf('https://') == -1 && !endpoint.includes('localhost') ? 'https://' : ''; //workaround to ensure the link is constructed correctly (even in localhost)
  const base_url = `${prepend}${endpoint}`;
  const reset_url = `${base_url}/passwordReset?user_id=${encodeURIComponent(
    user_id
  )}&email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  const data = {
    reset_url,
    email: email,
    website_url: base_url,
    contact_email: Config.EMAILS.CONTACT_US,
  };
  return Email.sendTo({
    subject: 'Reset Mensio account password',
    to: email.toString(),
    template: 'reset_password.html',
    data,
    bcc: [],
  });
};

export default {
  reset,
  request,
  forceResetFromEmail,
};
