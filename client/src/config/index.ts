import local_config from './local';
import { default as base_config, default as prod_config } from './prod';
import { default as staging_config } from './staging';
const node_env = process.env.NODE_ENV;
const is_staging = process.env.REACT_APP_IS_STAGING;
let config = base_config;
if (is_staging) {
  config = staging_config;
} else if (['development', 'test'].includes(node_env)) {
  config = local_config;
} else if (node_env === 'production') {
  config = prod_config;
} else {
  console.error(`No config set for env: ${node_env}`);
  process.exit(1);
}
Object.freeze(config);
export default config;
