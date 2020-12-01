const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const ProdConfig = require('./prod.js');

const config = { } ;

config.PORT = Argv.port || 9085;

//Postgres params
config.POSTGRES = {};
config.POSTGRES.USER = 'hitsquad';
config.POSTGRES.HOST = 'localhost' ; //need to add
config.POSTGRES.DATABASE = 'honeypot';
config.POSTGRES.PORT = 5432;
config.POSTGRES.PASSWORD ='2btamBnUgUB1';

module.exports = _.merge({}, ProdConfig, config);
