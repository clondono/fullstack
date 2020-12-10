/* @flow */

const _            = require('lodash');
const Path  = require("path");

const AuthLogin = require('../../includes/auth/login.js');
const ModerationImagesCreate = require('../../includes/moderationImages/create.js');
const Hsl = require('../../includes/clients/hiveServingClient');

module.exports = async function (ctx: any, next: any): any {
  const {
        metadata
  }:{
    metadata: string,
  } = ctx._request.variables;
  // const image = ctx._request.files['image'];

  console.log(ctx._request.files);
  console.log(ctx.request.body);
  //TODO: send to hive
  
  //TODO: check threshold
  const  passed_threshold = true;
  
  let moderation_image;
  if(passed_threshold) {
    //TODO: sendupload to our s3
   const moderation_image = await ModerationImagesCreate.downloadAndCreate({image: 'blah', metadata});
  } 
  ctx.status = 200;
  ctx.body = {
    moderation_image
  };

  return next();
};
