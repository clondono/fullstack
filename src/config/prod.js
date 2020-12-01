const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const BaseConfig = require('./base.js');

const config = { } ;


//Postgres params
config.POSTGRES = {};
config.POSTGRES.USER = 'hitsquad';
config.POSTGRES.HOST = '' ; //need to add
config.POSTGRES.DATABASE = 'honeypot';
config.POSTGRES.PORT = 6432;
config.POSTGRES.PASSWORD ='2btamBnUgUB1';

module.exports = _.merge({}, BaseConfig, config);
