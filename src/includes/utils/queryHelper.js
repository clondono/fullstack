/* @flow */

import type { SqlQueryParams } from "../../common/types.js";

const Bluebird = require("bluebird");
const Pgp = require("pg-promise")({ promiseLib: Bluebird });

const printQuery = async (
  _queries: SqlQueryParams | SqlQueryParams[]
)  => {
  const queries: SqlQueryParams[] = Array.isArray(_queries)
    ? _queries
    : [_queries];
  for (let query of queries) {
    console.log(Pgp.as.format(query.query, query.bindings));
  }
};



module.exports = {
  printQuery
}