const Promise  = require('bluebird');
const Crypto   = require('crypto');
const Counter  = require('passthrough-counter');
const Humanize = require('humanize-number');
const Bytes    = require('bytes');
const _        = require('lodash');
const Logstash = require('../../includes/clients/logstash');
/**
 * Expose logger.
 */

module.exports = dev;

/**
 * Development logger.
 */

function dev(opts) {
  return async function logger(ctx, next) {
    // request
    const start = new Date();

    // Generate UID
    const unique_log_id = Crypto.randomBytes(8).toString('hex');

    // If a unique ID is passed in the header, use that. Otherwise, use generated ID
    // It looks like this ID is generated on a per-session basis
    const log_id = _.get(ctx, 'request.header.x-unique-id', unique_log_id);

    ctx.log_id = log_id;

    ctx.log = function (...args) {
      const args_copy = _.clone(args);
      const the_time  = new Date();

      args_copy.unshift((Number(the_time) - Number(start)) + 'ms');
      args_copy.unshift(the_time);
      args_copy.unshift(unique_log_id);
      args_copy.unshift(log_id);

      console.log(...args_copy);
    };
    ctx.error = function (...args) {
      const args_copy = _.clone(args);
      const the_time  = new Date();

      args_copy.unshift(Number(the_time) - Number(start) + 'ms');
      args_copy.unshift(the_time);
      args_copy.unshift(unique_log_id);
      args_copy.unshift(log_id);

      console.error(...args_copy);
    };

    const user_obj  = _.get(ctx, 'session.user', {});
    const user_info = !_.isEmpty(user_obj) ?
      `${user_obj.email} ${user_obj.type} GROUP: ${user_obj.group.group_id}` :
      '';
    // let user_info = '';
    // if (!_.isEmpty(ctx.session)) {
    //   const user_obj = ctx.session.user;
    //   if (!_.isEmpty(user_obj)) {
    //     user_info = ctx.session.user.email + ' ' + ctx.session.user.type + ' GROUP: ' + ctx.session.user.group.group_id;
    //   }
    // }

    const src_ip     = _.get(ctx, 'request.ip', '127.0.0.1');
    const user_agent = _.get(ctx, 'request.header.user-agent', '-');

    const logstring = `BEG  \
      ${user_info} \
      ${src_ip} \
      "${user_agent}" \
      "${ctx.method} \
      ${ctx.originalUrl} \
      HTTP/${ctx.req.httpVersionMajor}\
      .${ctx.req.httpVersionMinor}"`;

    ctx.log(logstring);

    try {
      await next();
    } catch (err) {
      // log uncaught downstream errors
      log({
        ctx,
        start,
        err,
        unique_log_id,
        user_obj,
      });
      throw err;
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    const length = ctx.response.length;
    const body   = ctx.body;
    let counter;

    if (null == length && body && body.readable) {
      ctx.body = body
        .pipe(counter = Counter())
        .on('error', ctx.onerror);
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const res      = ctx.res;
    const onfinish = _.bind(done, null, 'finish');
    const onclose  = _.bind(done, null, 'close');

    res.once('finish', onfinish);
    res.once('close', onclose);

    function done(event) {
      res.removeListener('finish', onfinish);
      res.removeListener('close', onclose);
      log({
        ctx       : ctx,
        start     : start,
        len       : counter ? counter.length : length,
        err       : null,
        event     : event,
        user_info : user_info,
        unique_log_id,
        user_obj,
      });
    }
  };
}

/**
 * Log helper.
 */

function log({ ctx, start, len, err, event, user_info, unique_log_id, user_obj }) {
  // get the status code of the response
  const status = err
    ? (err.status || 500)
    : (ctx.status || 404);
  // set the color of the status code;
  const s      = status / 100 | 0;

  // get the human readable response length
  let length;
  if (~[204, 205, 304].indexOf(status)) {
    length = '';
  } else if (null == len) {
    length = '-';
  } else {
    length = len; // bytes(len);
  }

  const src_ip     = _.get(ctx, 'request.ip', '127.0.0.1');
  const user_agent = _.get(ctx, 'request.header.user-agent', '-');

  const logstring = `FIN  \
${user_info} \
${src_ip} \
"${user_agent}" \
"${ctx.method} ${ctx.originalUrl} \
HTTP/${ctx.req.httpVersionMajor}\
.${ctx.req.httpVersionMinor}" \
${status} ${length}`;

  const orig_error = ctx.original_error;
  Logstash({
    duration_ms : Date.now() - start.getTime(),
    err         : ctx.original_error ? {
      message: ctx.original_error.message,
      // stack   : ctx.original_error.stack,
    } : null,
    cache_key    : ctx.cache_key || null,
    group_id     : _.get(user_obj, 'group.group_id', null),
    http_version : `HTTP/${ctx.req.httpVersionMajor}.${ctx.req.httpVersionMinor}`,
    method       : ctx.method,
    original_url : ctx.originalUrl,
    request_id   : unique_log_id,
    source_ip    : src_ip,
    user_agent,
    user_id      : user_obj.email || null,
    user_type    : user_obj.type || null,
  });
  ctx.log(logstring);
}
