const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const BaseConfig = require('./base.js');

const config = { } ;


config.CLIENT_HOST ='',
//Postgres params
config.POSTGRES = {};
config.POSTGRES.USER = 'psotgres';
config.POSTGRES.HOST = '' ; //need to add
config.POSTGRES.DATABASE = '';
config.POSTGRES.PORT = 6432;
config.POSTGRES.PASSWORD ='' || Argv.pg_password;

module.exports = _.merge({}, BaseConfig, config);
