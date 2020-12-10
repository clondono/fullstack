//@flow

const _      = require('lodash');

const Config = require('../../config/index');
const PgQuery = require('../clients/pg');
const CustomError = require('../error/customError');
const ErrorOptions = require('../error/errorOptions');

const MODERATION_IMAGE_TABLE = Config.POSTGRES.TABLES.MODERATION.MODERATION_IMAGES;

const getByImageId = async({image_id}: {image_id: string}): any => {
  const query: string = `SELECT * from ${MODERATION_IMAGE_TABLE} WHERE image_id = $/image_id/`;
  const rows = await PgQuery.query({query, bindings: {image_id}});
  if (_.isEmpty(rows)) {
    throw new CustomError(ErrorOptions.INVALID_IMAGE);
  }
  return rows[0];
}

const getAll = async(): any => {
  const query: string = `SELECT * from ${MODERATION_IMAGE_TABLE}`;
  const rows = await PgQuery.query({query, bindings: {}});
  return rows;
}

const getAllUnlabeled = async(): any => {
  const query: string = `SELECT * from ${MODERATION_IMAGE_TABLE} WHERE label_result IS NULL`;
  const rows = await PgQuery.query({query, bindings: {}});
  return rows;
}

module.exports = {
  getByImageId,
  getAll,
  getAllUnlabeled
}