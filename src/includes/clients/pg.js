/* @flow */

import type {
  SqlQueryParams,
} from '../../common/types';

const Bluebird = require('bluebird') ;
const Pgp     = require('pg-promise')( { promiseLib: Bluebird } ) ;

const Config  = require('../../config/index.js');
const QueryHelper = require('../utils/queryHelper');

function Postgres(): any {
  this.pg_config = {
    user     : Config.POSTGRES.USER,
    host     : Config.POSTGRES.HOST,
    database : Config.POSTGRES.DATABASE,
    password : Config.POSTGRES.PASSWORD,
    port     : Config.POSTGRES.PORT,
  } ;

  this.pg = Pgp(this.pg_config);
}

Postgres.prototype.getConnection = function () {
  let connection: any;

  return Bluebird.resolve(this.pg.connect())
    .then((conn) => {
      connection = conn;
      return conn;
    })
    .catch((e) => {
      console.log(e);
      throw new Error(" Database Error");
    })
    .disposer(() => {
      if (connection) {
        connection.done();
      }
    });
}; 

Postgres.prototype.multiQuery =  async function(queries: SqlQueryParams[]) {
  return this.pg.tx(async t => {
  try {
    const transformed_queries: any = await Bluebird.mapSeries(queries, async ({ query, bindings }) => {
      return t.any(query, bindings);
    });
    return transformed_queries.pop();
  } catch (e) {
    console.error('rolling back transaction');
    queries.map(({ query, bindings }) => QueryHelper.printQuery({ query, bindings, is_error : true }));
    await t.none('ROLLBACK;');
    throw e;
  }
});
}

Postgres.prototype.query = async function(queries: SqlQueryParams | SqlQueryParams[]): any {
  return Array.isArray(queries) ?
  this.multiQuery(queries) :
  this.multiQuery([queries]);
}
    // $FlowFixMe
module.exports = new Postgres() ;
