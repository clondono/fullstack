/* @flow */

const _            = require('lodash');

const ModerationImagesUpdate = require('../../includes/moderationImages/update.js')
const HoneyPotMOderationSend = require('../../includes/honeyPotModeration/sendData.js')

module.exports = async function (ctx: any, next: any): any {
  
  ctx.status = 200;
  ctx.body = {
    label_options: [
      {
        id:'nsfw',
        diplay_name: 'NSFW',
      },
      {
        id:'violence',
        diplay_name: 'Violence',
      },
      {
        id:'clean',
        diplay_name: 'Clean',
      },
    ]
  };

  return next();
};
