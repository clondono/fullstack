/* @flow */

const _            = require('lodash');
const Path  = require("path");

const AuthLogin = require('../../includes/auth/login.js');
const ModerationImagesCreate = require('../../includes/moderationImages/create.js');

module.exports = async function (ctx: any, next: any): any {
  const {
        results
  }:{
    results: string,
  } = ctx._request.variables;
  const image = ctx. _request.files['image'];

  //TODO: check threshold
  const  passed_threshold = true;
  
  let moderation_image;
  if(passed_threshold) {
    //TODO: sendupload to our s3
  //  const moderation_image = await ModerationImagesCreate.downloadAndCreate({image, metadata});
  } 
  ctx.status = 200;
  ctx.body = {
    moderation_image
  };

  return next();
};
