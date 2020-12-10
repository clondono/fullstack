//@flow

const _      = require('lodash');
const Bcrypt = require('bcrypt');
const GeneratePassword = require('generate-password')

const Config = require('../../config/index');
const PgQuery = require('../clients/pg');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const temporaryResetPassword = async({user_id}: {user_id: string }): any => {
  const password = GeneratePassword.generate({
      length: 10,
      numbers: true
  });
  const password_hash: string = await Bcrypt.hash(password, Config.PASSWORD_SALT_ROUNDS);
  const query: string = `update ${Config.POSTGRES.TABLES.USERS.BASE} set password_hash=$/password_hash/ WHERE user_id=$/user_id/`;
  await PgQuery.query({query, bindings: {user_id, password_hash}});
  return password;
}

module.exports = {
  temporaryResetPassword
}