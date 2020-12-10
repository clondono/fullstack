//@flow

const _                = require('lodash');

const Config       = require('../../config/index');
const PgQuery      = require('../clients/pg');
const CustomError    = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');
const UsersGet     = require('../users/get');
const AuthLogin    = require('../auth/login');
const ModerationImagesGet = require('../../includes/moderationImages/get.js')

const MODERATION_IMAGE_TABLE = Config.POSTGRES.TABLES.MODERATION.MODERATION_IMAGES;

const updateModerationImage = async({image_id, metadata, label_result}: {image_id: string, metadata?: any, label_result?: string}): any => {
  const update_parts = [];
  const bindings = {};  

if(metadata) {
  update_parts.push(`metadata=$/metadata/`)
  bindings.metadata = metadata;
}

if(label_result) {
  update_parts.push(`label_result=$/label_result/`)
  bindings.label_result = label_result;
}

if(!_.isEmpty(update_parts)) {
  bindings.image_id = image_id
  update_parts.push(`updated_at=EXTRACT( EPOCH FROM NOW())`)
  const query: string = `update ${MODERATION_IMAGE_TABLE} set ${update_parts.join(', ')} WHERE image_id=$/image_id/`;
  await PgQuery.query({query, bindings});
}
  return ModerationImagesGet.getByImageId({image_id});;
}

module.exports = {
  updateModerationImage
}