const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const BaseConfig = require('./base.js');

const config = { } ;


config.CLIENT_HOST ='honeypot.thehive.ai',
//Postgres params
config.POSTGRES = {};
config.POSTGRES.USER = 'honeypot';
config.POSTGRES.HOST = 'honeypot-pg.o7.castle.fm' ; //need to add
config.POSTGRES.DATABASE = 'honeypot_db';
config.POSTGRES.PORT = 6432;
config.POSTGRES.PASSWORD ='' || Argv.pg_password;

module.exports = _.merge({}, BaseConfig, config);
