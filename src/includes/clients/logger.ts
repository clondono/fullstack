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

  async _log(level: LogLevel, message: string, args: { [x: string]: string } = {}) {
    const label = LogLevel[level];
    if (_should_log(level, this.level)) {
      const log_string = _format_log(label, message, args);
      const buf = Buffer.from(log_string);

      if (!Argv.use_prod || Argv.debug) {
        if (level < LogLevel.ERROR) {
          console.log(_format_staging_log(label, message, args));
        } else {
          console.error(_format_staging_log(label, message, args));
        }
      }
      if (Argv.use_prod) {
        await new Promise((resolve, reject) =>
          udp_client.send(buf, 0, buf.length, Config.LOGSTASH_PORT, Config.LOGSTASH_HOST, resolve)
        );
      }
    }
  }

  debug(message: string, ...args: any[]) {
    this._log(LogLevel.DEBUG, message, ...args);
  }

  log(message: string, ...args: any[]) {
    this._log(LogLevel.LOG, message, ...args);
  }

  info(message: string, ...args: any[]) {
    this._log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this._log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]) {
    this._log(LogLevel.ERROR, message, ...args);
  }

  fatal(message: string, ...args: any[]) {
    this._log(LogLevel.FATAL, message, ...args);
  }
}

function _format_staging_log(level: string, message: string, args: { [x: string]: string }) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = level.toUpperCase();
  return `[${level_string} ${iso_string}] ${
    _.isPlainObject(message) ? JSON.stringify(message) : message
  } \n ${!_.isEmpty(args) ? JSON.stringify(args) : ''}`;
}

function _format_log(log_level_label: string, message: string, args: { [x: string]: string }) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = log_level_label;

  const log_content = {
    level: level_string,
    timestamp: iso_string,
    message: message,
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
