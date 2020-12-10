//@flow

const _      = require('lodash');
const Axios = require('axios');
const qs = require('qs');


const Config = require('../../config/index');
const HsClient = require('../clients/HiveServingClient');
const Pg = require('../clients/pg');

const HSL_CODE_TABLE = Config.POSTGRES.TABLES.MODERATION.HSL_CODE;


const sendToHiveServing = async({image,}): any  => {

    const { hsl_code, thresholds} = await getHslCode();

    // const response = await HsClient.evaluate_hsl(
    //   Config.QUEUES.hive_serving_queue,
    //   hsl_code,

    //   'local_data_file_path',
    //   {
    //     proxy_timeout: 10000,
    //     retry: {
    //       attempts: 5,
    //       backoff: (i) => 5000 + 3000 * i,
    //     },
    //   }
    // );
}
const getHslCode = async(): any => {
  const query: string = `SELECT * from ${HSL_CODE_TABLE} `;
  const rows = await Pg.query({query, bindings: {}});
  if (_.isEmpty(rows)) {
    return {};
  }
  return rows[0];
}

  module.exports = {
    getHslCode
  }