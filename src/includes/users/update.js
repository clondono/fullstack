//@flow

const _                = require('lodash');
const Bcrypt           = require('bcrypt');
const UuidBase62       = require('uuid-base62');
const GeneratePassword = require('generate-password')

const Config       = require('../../config/index');
const PgQuery      = require('../clients/pg');
const CustomError    = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');
const UsersGet     = require('../users/get');
const AuthLogin    = require('../auth/login');

const updatePassword = async({user_id, password, new_password}: {user_id: string, password: string, new_password: string}): any => {

  const user  = await UsersGet.getByUserId({user_id});
  const passwords_match: boolean = await Bcrypt.compare(password, user.password_hash);
  if (!passwords_match) {
    throw new CustomError(ErrorOptions.WRONG_PASSWORD);
  }
  const password_hash: string = await Bcrypt.hash(password, Config.PASSWORD_SALT_ROUNDS);  
  
  const query: string = `update ${Config.POSTGRES.TABLES.USERS.BASE} set password_hash=$/password_hash/ WHERE user_id=$/user_id/`;
  await PgQuery.query({query, bindings: {user_id: user_id, password_hash}});
  return await UsersGet.getByUserId({user_id});;
}

module.exports = {
  updatePassword
}