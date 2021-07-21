import Minimist from 'minimist';
import local_config from './local';
import prod_config from './prod';
import staging_config from './staging';

const Argv = Minimist(process.argv.slice(2));
let config: { [key: string]: any } = {};
if (Argv.use_local) {
  config = local_config;
} else if (Argv.use_staging) {
  config = staging_config;
} else if (Argv.use_prod) {
  config = prod_config;
} else {
  // eslint-disable-next-line
  console.log("Falling back on staging");
  config = staging_config;
}
Object.freeze(config);
export default config;

// Affixes a suffix to all queues so that none of them chain to a production version that could cause problems when testing locally.
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
