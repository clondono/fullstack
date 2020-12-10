//@flow

const _                = require('lodash');
const Bluebird                = require('bluebird');
const UuidBase62       = require('uuid-base62');
// $FlowFixMe
const FsP = Bluebird.promisifyAll(require("fs"));
const Path  = require("path");

const Config              = require('../../config/index');
const PgQuery             = require('../clients/pg');
const CustomError         = require('../error/customError');
const ErrorOptions        = require('../error/errorOptions');
const ModerationImagesGet = require('../../includes/moderationImages/get.js')
const Disposer            = require("../utils/disposer");

const MODERATION_IMAGE_TABLE = Config.POSTGRES.TABLES.MODERATION.MODERATION_IMAGES;

const createModerationImage = async({s3_key, metadata}: {s3_key: string, metadata?: any}): any => {
    
  const binding_variables = [];
  const columns = [];
  const bindings = {};

  columns.push('s3_key');
  binding_variables.push('$/s3_key/');
  bindings.s3_key = s3_key;

  if(metadata) {
    columns.push('metadata');
    binding_variables.push('$/metadata/');
    bindings.metadata = metadata;
  }

  columns.push('image_id');
  binding_variables.push('$/image_id/');
  const image_id =  UuidBase62.v4();
  bindings.image_id = image_id;
  
  columns.push('created_at'); 
  columns.push('updated_at'); 
  const query: string = `insert into ${MODERATION_IMAGE_TABLE}(${columns.join(', ')}) VALUES(${binding_variables.join(', ')}, EXTRACT( EPOCH FROM NOW()), EXTRACT( EPOCH FROM NOW()) ) `;
  await PgQuery.query({query, bindings});

  return ModerationImagesGet.getByImageId({image_id});
}

const downloadAndCreate = async({image, metadata}: {image: any, metadata?: any}): any =>{
  const file_name = UuidBase62.v4();
  const s3_key = `moderationImages/${file_name}`
  const download_filename = Path.join(__dirname,file_name );

// $FlowFixMe
  const outStream = await FsP.createWriteStream(download_filename);
  outStream.write(image);
  outStream.close();
  // const s3_url = await Disposer.usingFile(download_filename, async(file_path)=> {
  //   return S3.upload_image({
  //     file_path,
  //     client: 'HONEYPOT'
  //   });
  // })
  // return createModerationImage({s3_key: s3_url, metadata})
}
module.exports = {
  createModerationImage,
  downloadAndCreate
}