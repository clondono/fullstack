const _ =require('lodash');
const Argv = require('minimist')(process.argv.slice(2));

const BaseConfig = require('./base.js');

const config = { } ;
config.API_URL = ''
module.exports = _.merge({}, BaseConfig, config);
