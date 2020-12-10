/* @flow */

const _        = require('lodash');
const Bluebird = require('bluebird');
const ModerationImagesGet = require('../../includes/moderationImages/get.js') ;
const S3                  = require('../../includes/clients/s3')

module.exports = async function (ctx: any, next: any): any {
  
  const _moderation_images: any = await ModerationImagesGet.getAllUnlabeled();
  const moderation_images = await Bluebird.map(_moderation_images, (moderation_image) => {
    return S3.get_signed_url({
      bucket: 'dataset_manage',
      key: moderation_image.s3_key
      }).then(image_url => {
        return {
          ...moderation_image,
          image_url
        }
      })
  }, {concurrency: 10})
  ctx.status = 200;
  ctx.body = {
    moderation_images  
  };

  return next();
};
