import Bluebird from 'bluebird';
import PgPromise, { IDatabase } from 'pg-promise';
import Config from '../../config';
import { SqlQueryParams } from '../../ts/interfaces/pg';
import Logger from './logger';

type ExtendedProtocol = IDatabase<any>;

const Pgp = PgPromise({ promiseLib: Bluebird });
const logger = new Logger();
class Postgres {
  pg: ExtendedProtocol;
  constructor() {
    this.pg = Pgp({
      user: Config.POSTGRES.USER,
      host: Config.POSTGRES.HOST,
      database: Config.POSTGRES.DATABASE,
      password: Config.POSTGRES.PASSWORD,
      port: Config.POSTGRES.PORT,
    });
  }

  getConnection = () => {
    let connection: any;

    return Bluebird.resolve(this.pg.connect())
      .then((conn) => {
        connection = conn;
        return conn;
      })
      .catch((e) => {
        logger.log(e);
        throw new Error(' Database Error');
      })
      .disposer(() => {
        if (connection) {
          connection.done();
        }
      });
  };

  multipleQuery = async (queries: SqlQueryParams[]) => {
    return this.pg.tx(async (t) => {
      try {
        const transformed_queries: any = await Bluebird.mapSeries(queries, async ({ query, bindings }) => {
          return t.any(query, bindings);
        });
        return transformed_queries.pop();
      } catch (e) {
        logger.error('rolling back transaction');
        queries.map(({ query, bindings }) => this.printQuery({ query, bindings, is_error: true }));
        await t.none('ROLLBACK;');
        throw e;
      }
    });
  };

  query = async (queries: SqlQueryParams | SqlQueryParams[]) => {
    return Array.isArray(queries) ? this.multipleQuery(queries) : this.multipleQuery([queries]);
  };

  printQuery = async (_queries: SqlQueryParams | SqlQueryParams[]) => {
    const queries: SqlQueryParams[] = Array.isArray(_queries) ? _queries : [_queries];
    for (let query of queries) {
      logger.log(Pgp.as.format(query.query, query.bindings));
    }
  };
}

export default new Postgres();
