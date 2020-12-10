//@flow

const _      = require('lodash');

const Config = require('../../config/index');
const PgQuery = require('../clients/pg');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const getByEmail = async({email}: {email: string}): any => {
  const query: string = `SELECT * from ${Config.POSTGRES.TABLES.USERS.BASE} WHERE email = $/email/`;
  const rows = await PgQuery.query({query, bindings: {email}});
  if (_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.INVALID_USER);
  }
  return rows[0];
}

const getByUserId = async({user_id}: {user_id: string}): any => {
  const query: string = `SELECT * from ${Config.POSTGRES.TABLES.USERS.BASE} WHERE user_id = $/user_id/`;
  const rows = await PgQuery.query({query, bindings: {user_id}});
  if (_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.INVALID_USER);
  }
  return rows[0];
}

const existingEmail = async({email}: {email: string}): any => {
  try {
    await getByEmail({email});
    return true
  } catch(e){
    return false
  }
}

module.exports = {
  getByEmail,
  existingEmail,
  getByUserId
}