/* @flow */

let config: any= {};
const node_env = process.env.NODE_ENV;
  console.info(`using env: ${node_env}`) ;
if (['development', 'test'].includes(node_env)) {
  config = require('./local.js') ;
} else if (node_env === 'production') {
  config = require('./prod.js') ;
} else {
    console.error(`No config set for env: ${node_env}`) ;
  // process.exit(1);
}

// Make config immutable
Object.freeze(config);
module.exports = config ;