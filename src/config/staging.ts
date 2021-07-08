import _ from 'lodash';
import Minimist from 'minimist';
import BaseConfig from './base';
const Argv = Minimist(process.argv.slice(2));

const config = {
  /* General HTTP */
  ENV: 'staging',
  DEFAULT_LOG_LEVEL: Argv.DEFAULT_LOG_LEVEL || 1,
  // TODO: client host url
  CLIENT_HOST: '',
  // TODO: callback_url
  CALLBACK_URL: Argv.callback_url || '',
  // Postgres params
  POSTGRES: {
    USER: 'clondono',
    // TODO: host
    HOST: '',
    DATABASE: 'main_db',
    PORT: 6432,
    PASSWORD: '' || Argv.pg_password,
  },
};
export default _.merge({}, BaseConfig, config);
