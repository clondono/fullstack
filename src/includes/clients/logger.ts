import dgram from 'dgram';
import _ from 'lodash';
import Minimist from 'minimist';
import Config from '../../config';
import { LogLevel } from '../../ts/enums/logger';
const udp_client = dgram.createSocket('udp4');
const Argv = Minimist(process.argv.slice(2));

class Logger {
  level: LogLevel;

  constructor(level: number = Config.DEFAULT_LOG_LEVEL) {
    this.level = level;
  }

  async _log(
    level: LogLevel,
    message: string | Record<string, unknown>,
    args: { [x: string]: string } = {},
  ): Promise<void> {
    const label = LogLevel[level];
    if (_should_log(level, this.level)) {
      const log_string = _format_log(label, message, args);
      const buf = Buffer.from(log_string);
      if (!Argv.use_prod || Argv.debug) {
        if (level < LogLevel.ERROR) {
          // eslint-disable-next-line
          console.log(_format_staging_log(label, message, args));
        } else {
          // eslint-disable-next-line
          console.error(_format_staging_log(label, message, args));
        }
      }
      if (Argv.use_prod) {
        await new Promise((resolve, reject) =>
          udp_client.send(
            buf,
            0,
            buf.length,
            Config.LOGSTASH_PORT,
            Config.LOGSTASH_HOST,
            (err, bytes) => {
              if (err) {
                reject(err);
              } else {
                resolve(bytes);
              }
              // udp_client.close();
            },
          ),
        );
      }
    }
  }

  debug(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.DEBUG, message, ...args).catch((e) => e);
  }

  log(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.LOG, message, ...args).catch((e) => e);
  }

  info(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.INFO, message, ...args).catch((e) => e);
  }

  warn(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.WARN, message, ...args).catch((e) => e);
  }

  error(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.ERROR, message, ...args).catch((e) => e);
  }

  fatal(message: Record<string, unknown> | string, ...args: any[]): void {
    this._log(LogLevel.FATAL, message, ...args).catch((e) => e);
  }
}

function _format_staging_log(
  level: string,
  message: string | Record<string, unknown>,
  args: { [x: string]: string },
) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = level.toUpperCase();
  return `[${level_string} ${iso_string}] ${
    _.isPlainObject(message) ? JSON.stringify(message, null, 2) : message
  } \n ${!_.isEmpty(args) ? JSON.stringify(args) : ''}`;
}

function _format_log(
  log_level_label: string,
  message: string | Record<string, unknown>,
  args: { [x: string]: string },
) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = log_level_label;

  const log_content = {
    level     : level_string,
    timestamp : iso_string,
    message   : message,
    ...args,
  };
  return JSON.stringify(log_content);
}

function _should_log(level: number, limit: number) {
  return (
    limit === LogLevel.ALL ||
    (Object.values(LogLevel).includes(level) &&
      Object.values(LogLevel).includes(limit) &&
      level >= limit)
  );
}

export default Logger;
