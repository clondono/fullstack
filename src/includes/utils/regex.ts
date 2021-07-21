const FILE_EXT_REGEX = /(?:\.([^.]+))?$/;

// eslint-disable-next-line
const S3_URL_REGEX = /^s3:\/\/(?<bucket>[\w\.-]+)\/(?<key>.*)$/;

const COMMON_CRAWL_MEDIA_REGEX =
  '(http|https)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|](.jpg|.jpeg|.png|.gif|.bmp|.webp|.mp4)';

const COMMON_CRAWL_VIDEO_REGEX =
  /(http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]\.mp4/;

const LUCENE_RANGE =
  // eslint-disable-next-line
  /(?<left> *[\[\{] *)(?<min>[+-]?\d*(\.\d+)?(E[-+]\d+)?)( *TO *)(?<max>[+-]?\d*(\.\d+)?(E[-+]\d+)?)(?<right> *[\]\}] *)/i;

const AXIOS_HTTP_ERROR_CODE =
  /Request failed with status code (?<code>[\d]{3})/;

const HTML_FILE = /<html/i;

const extractInfo = function(
  regex: RegExp,
  input: string,
): { [x: string]: string } {
  return regex.exec(input)?.groups || {};
};
export default {
  FILE_EXT_REGEX,
  S3_URL_REGEX,
  COMMON_CRAWL_MEDIA_REGEX,
  COMMON_CRAWL_VIDEO_REGEX,
  LUCENE_RANGE,
  AXIOS_HTTP_ERROR_CODE,
  HTML_FILE,
  extractInfo,
};
