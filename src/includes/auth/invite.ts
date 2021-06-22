import _ from 'lodash';
import UuidBase62 from 'uuid-base62';
import Config from '../../config';
import { SqlQueryParams } from '../../ts/interfaces/pg';
import Logger from '../clients/logger';
import PgQuery from '../clients/pg';
import Email from '../emails/email';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';

const logger = new Logger();

const insertUserInvite = async ({ email, token: _token }: { email: string; token: string }) => {
  let token = _token;
  const CREATE_INVITE = `INSERT INTO ${Config.POSTGRES.TABLES.USERS.INVITES}(email, token) VALUES ( $/email/, $/token/ )`;
  const queries: SqlQueryParams[] = [{ query: CREATE_INVITE, bindings: { email, token } }];
  try {
    await PgQuery.query(queries);
  } catch (e) {
    if (e.code == '23505') {
      // user has already requested pw reset, and the token is still valid (unexpired and not used). therefore re-send email, don't alter database
      const query_match = `SELECT token from ${Config.POSTGRES.TABLES.USERS.INVITES} WHERE email=$/email/ AND NOT used`;
      const bindings_match = { email };
      const match = await PgQuery.query([{ query: query_match, bindings: bindings_match }]);
      token = match[0].token;
    } else {
      logger.error(e);
      throw new CustomError(ErrorOptions.POSTGRES);
    }
  }
  return token;
};

const isValidEmailForInvite = async ({ email }: { email: string }) => {
  const USER_EXISTS_QUERY = 'SELECT * FROM users WHERE email=$/email/';
  const bindings = { email };
  const rows = await PgQuery.query([{ query: USER_EXISTS_QUERY, bindings: bindings }]);
  if (!_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.EXISTING_EMAIL);
  }
  return true;
};

const sendInviteEmail = async ({
  email,
  token,
  endpoint,
}: {
  email: string;
  token: string;
  endpoint: string;
}) => {
  const prepend =
    endpoint.indexOf('https://') == -1 && !endpoint.includes('localhost') ? 'https://' : '';
  const template = 'get_started.html';
  const base_url = `${prepend}${endpoint}`;
  const signup_url = `${base_url}/signup?token=${encodeURIComponent(
    token
  )}&email=${encodeURIComponent(email)}`;
  const data = {
    signup_url,
    email,
  };

  return Email.sendTo({
    subject: '',
    to: email,
    headers: {},
    template: 'invite.html',
    data,
    bcc: [],
  });
};

const invite = async ({ email, endpoint }: { email: string; endpoint: string }) => {
  let token: string = UuidBase62.v4();
  await isValidEmailForInvite({ email });
  token = await insertUserInvite({ email, token });
  await sendInviteEmail({ email, token, endpoint });
};

export default {
  invite,
};
