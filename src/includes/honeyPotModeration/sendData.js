//@flow

const _      = require('lodash');
const Axios = require('axios');
const Promise = require("bluebird");
// $FlowFixMe
const Fs = Promise.promisifyAll(
  require("fs")
);

const Config = require('../../config/index');
const PgQuery = require('../clients/pg');
const Pg = require('../clients/pg');
const Time = require('../utils/time');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const MsAuthToken = require('./authToken');
const ModerationImagesGet = require('../moderationImages/get.js')

const MS_AUTH_TABLE = Config.POSTGRES.TABLES.MODERATION.MS_AUTH;

const sendDataToMs = async({image_id}:{image_id: string}): any => {
  const moderation_image = await ModerationImagesGet.getByImageId({image_id});
  const s3_url = await getMsS3Url({moderation_image});
  //TODO: download: moderation image locally
  const local_file_path = '/fake_path'
  //TODO convert file_to_png
  const local_png_path = local_file_path;
  // $FlowFixMe
  var newFile = Fs.createReadStream(local_png_path);
  const form_data = new FormData();
  form_data.append("file", newFile);
  const request_config = {
    url: s3_url,
    method: "PUT",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    data: form_data
  };

  await Axios.request(request_config)
  .catch(e => {
    console.log(e);
    throw e;
  }); 
  return true;
}

const getMsS3Url = async({moderation_image}:{moderation_image: string}): any => {
  //temp until the TODOS are done
  if(true) { 
    return 'https://omnicept-storage-dev.s3.us-west-2.amazonaws.com/86ae92c0-b23c-4e72-8433-7864007b458b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS4SSFXSHNNU55FAS%2F20201204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201204T040845Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=9f55d2af392ed5bedd3faf4a7f606fd1d57c592d2c01f0bfa03acb54947947ac'
  }

  const auth_token = await MsAuthToken.getAuthToken();  
  //TODO: get correct fetch url
   //TODO: get data format
  //TODO: Double check if this is the right way to use the token
  const { data } = await Axios.request({
    url: Config.MODERATION_SERVICE_FETCH_S3_LINK_URL,
    method: "POST",
    data: {
     moderation_image
    },
    headers: {
      'Authorization': `Basic ${auth_token}`,   
    }
  })
  .catch(e => {
    console.log(e);
    throw e;
  }); 
  const {s3_url } =data
  return s3_url;
}


const getAuthTokenDetails = async(): any => {
  const query: string = `SELECT * from ${MS_AUTH_TABLE} `;
  const rows = await Pg.query({query, bindings: {}});

  if (_.isEmpty(rows)) {
    return {};
  }
  return rows[0];
}

  module.exports = {
    sendDataToMs,
  }