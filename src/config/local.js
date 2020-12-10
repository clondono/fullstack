const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const ProdConfig = require('./prod.js');

const config = { } ;

config.PORT = Argv.port || 9085;
config.CLIENT_HOST ='localhost:3000',

//Postgres params
config.POSTGRES = {};
config.POSTGRES.USER = 'postgres';
config.POSTGRES.HOST = 'localhost' ; //need to add
config.POSTGRES.DATABASE = 'honeypot_db'; //TODO: fill in
config.POSTGRES.PORT = 5432;
config.POSTGRES.PASSWORD ='';

module.exports = _.merge({}, ProdConfig, config);
