//@flow

const Bcrypt = require('bcrypt');
const _      = require('lodash');

const UsersGet = require('../users/get');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const login = async({email, password}: {email: string, password: string}): any => {
  const user  = await UsersGet.getByEmail({email});
  const passwords_match: boolean = await Bcrypt.compare(password, user.password_hash);
  if (!passwords_match) {
    throw new CustomError(ErrorOptions.WRONG_PASSWORD);
  }

  delete user.password_hash;
  return user;
}

module.exports = {
  login
}