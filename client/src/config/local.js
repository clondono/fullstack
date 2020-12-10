const _ =require('lodash');

const ProdConfig = require('./prod.js');

const config = { } ;
config.PORT = 9085;

config.API_URL  = `http://localhost:9085`;

module.exports = _.merge({}, ProdConfig, config);
