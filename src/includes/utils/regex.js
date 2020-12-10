//@flow
"use strict";

const FILE_EXT_REGEX: RegExp = /(?:\.([^.]+))?$/;

const S3_URL_REGEX: RegExp = /^s3:\/\/(?<bucket>[\w\.-]+)\/(?<key>.*)$/;

const COMMON_CRAWL_MEDIA_REGEX: string = "(http|https)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|](.jpg|.jpeg|.png|.gif|.bmp|.webp|.mp4)";

const COMMON_CRAWL_VIDEO_REGEX: RegExp = /(http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]\.mp4/;

const LUCENE_RANGE: RegExp = /(?<left> *[\[\{] *)(?<min>[+-]?\d*(\.\d+)?(E[-+]\d+)?)( *TO *)(?<max>[+-]?\d*(\.\d+)?(E[-+]\d+)?)(?<right> *[\]\}] *)/i;

const AXIOS_HTTP_ERROR_CODE: RegExp = /Request failed with status code (?<code>[\d]{3})/;

const HTML_FILE: RegExp = /<html/i;

module.exports = {
  FILE_EXT_REGEX,
  S3_URL_REGEX,
  COMMON_CRAWL_MEDIA_REGEX,
  COMMON_CRAWL_VIDEO_REGEX,
  LUCENE_RANGE,
  AXIOS_HTTP_ERROR_CODE,
  HTML_FILE,
}