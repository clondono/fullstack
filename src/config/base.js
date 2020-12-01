
const Argv = require('minimist')(process.argv.slice(2));
const config = {};

/* General HTTP */
config.PORT = Argv.port || 8080;


module.exports = config