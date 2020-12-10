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



const createUser = async({email, password, first_name, last_name, company }: {email: string, first_name?: string, last_name?: string, password: string, company?: string}): any => {
  if( !email){
    throw new CustomError(ErrorOptions.MISSING_EMAIL);
  }
  if( !password) {
    throw new CustomError(ErrorOptions.MISSING_PASSWORD);
  }
    const exists = await UsersGet.existingEmail({email})
  if (exists) {
    throw new CustomError(ErrorOptions.EXISTING_EMAIL);
  }

  const binding_variables = [];
  const columns = [];
  const bindings = {};
 
  columns.push('email');
  binding_variables.push('$/email/');
  bindings.email = email;

  const password_hash: string = await Bcrypt.hash(password, Config.PASSWORD_SALT_ROUNDS);
  columns.push('password_hash');
  binding_variables.push('$/password_hash/');
  bindings.password_hash = password_hash;

  columns.push('user_id');
  binding_variables.push('$/user_id/');
  bindings.user_id = UuidBase62.v4();
 
  if(!_.isEmpty(first_name)) {
    columns.push('first_name');
    binding_variables.push('$/first_name/');
    bindings.first_name = first_name;
  }
  if(!_.isEmpty(last_name)) {
    columns.push('last_name');
    binding_variables.push('$/last_name/');
    bindings.last_name = last_name;
  }
  if(!_.isEmpty(company)) {
    columns.push('company');
    binding_variables.push('$/company/');
    bindings.company = company;
  }
  
  columns.push('created_at'); 
  const query: string = `insert into ${Config.POSTGRES.TABLES.USERS.BASE}(${columns.join(', ')}) VALUES(${binding_variables.join(', ')}, EXTRACT( EPOCH FROM NOW()) ) `;
  await PgQuery.query({query, bindings});

  return UsersGet.getByEmail({email})
}

const createInvited = async({email, first_name, last_name,}: {email: string, first_name?: string, last_name?: string}): any => {
  // const password = GeneratePassword.generate({
  //     length: 10,
  //     numbers: true
  // });
  const password = Config.DEFAULT_PASSWORD;
  const created_user= await createUser({email, password, first_name, last_name, })
  //TODO email for invites
  return created_user;
}

module.exports = {
  createUser,
  createInvited
}