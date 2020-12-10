//@flow

const _      = require('lodash');
const Axios = require('axios');
const qs = require('qs');


const Config = require('../../config/index');
const PgQuery = require('../clients/pg');
const Pg = require('../clients/pg');
const Time = require('../utils/time');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const MS_AUTH_TABLE = Config.POSTGRES.TABLES.MODERATION.MS_AUTH;

const getAuthToken = async(): any => {
  const {token, expires_at} = await getAuthTokenDetails();
  
  if (!token) {
    return refreshAuthToken();
  }
  const expiration_date: Date = new Date(expires_at);
  const now = new Date();
  
  if(expiration_date < now) {
    return refreshAuthToken();
  }
  return token;
}

const refreshAuthToken = async(): any => {
  const now = new Date().getTime();

  //TODO hit auth site to get token
  const { data } = await Axios.request({
    url: Config.MODERATION_SERVICE_AUTH_URL,
    method: "POST",
    data: qs.stringify({
      'grant_type':'client_credentials'
    }),
    headers: {
      'Authorization': `Basic ${Config.MODERATION_SERVICE_AUTH_TOKEN}`,   
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
  .catch(e => {
    console.log(e);
    throw e;
  }); 
  const {access_token: token, expires_in } =data

  const expires_at = now + expires_in * Time.MINUTE;
  const query: string = `DELETE FROM ${MS_AUTH_TABLE}; INSERT INTO ${MS_AUTH_TABLE}(token, updated_at, expires_at) VALUES($/token/,$/updated_at/, $/expires_at/)`;
  await PgQuery.query({query, bindings: {token, expires_at, updated_at: now}});
  return token;
}


const getAuthTokenDetails = async(): any => {
  const query: string = `SELECT * from ${MS_AUTH_TABLE} `;
  const rows = await Pg.query({query, bindings: {}});

  if (_.isEmpty(rows)) {
    return {};
  }
  return rows[0];
}

  module.exports = {
    getAuthToken,
    refreshAuthToken,
    getAuthTokenDetails
  }