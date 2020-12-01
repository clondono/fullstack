/* @flow */


const Argv    = require('minimist')(process.argv.slice(2)) ;
const _ = require('lodash')

let config: any= {};

if (Argv.use_local) {
  config = require('./local.js') ;
} else if (Argv.use_prod) {
  config = require('./prod.js') ;
} else {
  console.error('Please use --use_local / --use_prod') ;
  process.exit(1);
}

//Affixes a suffix to all queues so that none of them chain to a production version that could cause problems when testing locally.
if (Argv.post_affix) {
  config.QUEUES = _.reduce(
    Object.keys(config.QUEUES),
    (acc, queue_name) => {
      acc[queue_name] =
        config.QUEUES[queue_name] + "_" + Argv.post_affix.toString();
      return acc;
    },
    {}
  );
}

// Make config immutable
Object.freeze(config);
module.exports = config ;