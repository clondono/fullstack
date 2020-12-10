/* @flow */
/* Will add geoip at some point */
// const geoip         = require('../includes/misc/geoip.js');

function Request({
  ip,
  variables,
  files,
  request_origin,
  user_agent,
}: {
  ip: string,
  variables: any,
  files: string[],
  request_origin: string,
  user_agent: string
}) {

  this.ip = ip ;
  this.user_agent = user_agent ;
  this.request_origin = request_origin;
  this.variables = variables;
  this.files = files ;

  /*
  const _loc            = geoip(ip);
  this.country_code     = _loc.country_code ;
  this.state_code       = _loc.state_code   ; */

}

module.exports = Request ;
