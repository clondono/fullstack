import Minimist from 'minimist';
import local_config from './local';
import prod_config from './prod';
import staging_config from './staging';

const Argv = Minimist(process.argv.slice(2));
const node_env = process.env.NODE_ENV || '';

let config: { [key: string]: any } = {};
if (Argv.use_local) {
  config = local_config;
} else if (Argv.use_staging) {
  config = staging_config;
} else if (Argv.use_prod) {
  config = prod_config;
} else {
  console.error('Please use --use_local / --use_staging / --use_prod');
  process.exit(1);
}
Object.freeze(config);
export default config;

//Affixes a suffix to all queues so that none of them chain to a production version that could cause problems when testing locally.
// if (Argv.post_affix) {
//   const QUEUES = _.reduce(
//     Object.keys(config.QUEUES),
//     (acc: {[key:string]: any}, queue_name: any) => {
//       acc[queue_name] = config.QUEUES?[queue_name] + "_" + Argv.post_affix.toString();
//       return acc;
//     },
//     {}
//   );
// }

// Make config immutable
Object.freeze(config);
module.exports = config;
