//@flow

const Bluebird = require('bluebird');
const _      = require('lodash');

const UsersGet = require('../users/get');
const UsersCreate = require('../users/create');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const inviteUsers = async(invite_list: {email: string, first_namne?: string, last_name?: string}[]): any => {
  
  const failed_invites = new Set(_.map(invite_list, ({email}) => email));
  const successful_invites = new Set();
  await Bluebird.map(invite_list, (invite_params) => {
    return UsersCreate.createInvited(invite_params)
      .then( (new_user) => {
        failed_invites.delete(new_user.email);
        successful_invites.add(new_user.email);
    }).catch( e=>{});
  }, {concurrency: 5});
  return {
    successful_invites: Array.from(successful_invites),
    failed_invites: Array.from(failed_invites),
    }
}

module.exports = {
  inviteUsers
}