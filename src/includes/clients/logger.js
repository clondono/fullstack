//@flow
"use strict";

const Promise = require("bluebird");
const dgram = require("dgram");
const argv = require("minimist")(process.argv.slice(2));

const { LOG_LEVEL, LOGSTASH_PORT, LOGSTASH_HOST } = require("../../config");


const LOG_LEVEL_ENUM = {
  ALL: 1,
  DEBUG: 2,
  LOG: 3,
  INFO: 4,
  WARN: 5,
  ERROR: 6,
  FATAL: 7,
};

class Logger {
  level: number;

  constructor(level?: number = LOG_LEVEL) {
    this.level = level;
  }

  async _log(tag: string, message: string, args?: { [string]: string } = {}) {
    const level = LOG_LEVEL_ENUM[tag];
    if (_should_log(level, this.level)) {
      const log_string = _format_log(tag, message, args);
      const buf = Buffer.from(log_string);

      if (!argv.use_prod || argv.debug) {
        if (level < LOG_LEVEL_ENUM.ERROR) {
          console.log(_format_staging_log(tag, message, args));
        } else {
          console.error(_format_staging_log(tag, message, args));
        }
      }
      if (argv.use_prod) {
          // external logger
      }
    }
  }

  debug(...args: any[]) {
    this._log("DEBUG", ...args);
  }

  log(...args: any[]) {
    this._log("LOG", ...args);
  }

  info(...args: any[]) {
    this._log("INFO", ...args);
  }

  warn(...args: any[]) {
    this._log("WARN", ...args);
  }

  error(...args: any[]) {
    this._log("ERROR", ...args);
  }

  fatal(...args: any[]) {
    this._log("FATAL", ...args);
  }
}

function _format_staging_log(
  level: string,
  message: string,
  args: { [string]: string }
) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = level.toUpperCase();

  return `[${level_string} ${iso_string}] ${message} \n ${JSON.stringify(
    args
  )}`;
}

function _format_log(
  level: string,
  message: string,
  args: { [string]: string }
) {
  const _date = new Date();
  const iso_string = _date.toISOString();
  const level_string = level.toUpperCase();

  // $FlowFixMe
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
    limit === LOG_LEVEL_ENUM.ALL ||
    (Object.values(LOG_LEVEL_ENUM).includes(level) &&
      Object.values(LOG_LEVEL_ENUM).includes(limit) &&
      level > limit)
  );
}

module.exports = Logger;
