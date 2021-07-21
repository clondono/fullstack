import _ from 'lodash';
import Minimist from 'minimist';
import BaseConfig from './base';
const Argv = Minimist(process.argv.slice(2));

const _local_config = {
  ENV  : 'local',
  PORT : Argv.port || 9085,

  DEFAULT_LOG_LEVEL : Argv.DEFAULT_LOG_LEVEL || 1,
  CLIENT_HOST       : 'localhost:3000',
  CALLBACK_URL      : Argv.callback_url || '',
  // Postgres params
  POSTGRES          : {
    USER     : 'postgres',
    HOST     : 'localhost', // need to add
    DATABASE : 'main_db',
    PORT     : 5432,
    PASSWORD : '' || Argv.pg_password,
  },
};

export default _.merge({}, BaseConfig, _local_config);
