import _ from 'lodash';
import ProdConfig from './prod';

const _local_config = {
  PORT: 9085,
  API_URL: `http://localhost:9085`,
};

export default _.merge({}, ProdConfig, _local_config);
