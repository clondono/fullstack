/* @flow */

const _            = require('lodash');

const ModerationImagesUpdate = require('../../includes/moderationImages/update.js')
const HoneyPotMOderationSend = require('../../includes/honeyPotModeration/sendData.js')

module.exports = async function (ctx: any, next: any): any {
  const {
    image_id,
    label
  }:{
    image_id: string,
    label: string
  } = ctx._request.variables;

  const moderationImage = await ModerationImagesUpdate.updateModerationImage({image_id, label_result: label});
  //TODO: verify what the options will be
  if(['violence', 'NSFW'].includes(label)) {
    await HoneyPotMOderationSend.sendDataToMs({image_id})
  }

  ctx.status = 200;
  ctx.body = {
    moderationImage
  };

  return next();
};
