
const Argv = require('minimist')(process.argv.slice(2));
const Path  = require("path");

const config = {};


config.SESSION_COOKIE='nomnom';

config.QUEUES = {};

config.DOWNLOAD_DIRECTORY = Argv.download_dir || Path.join(__dirname, "./tmp");

config.LOGIN_ALGORITHM = 'aes128';
config.LOGIN_HMAC_ALGORITHM = 'sha256';
config.LOGIN_HMAC_KEY = Buffer.from('MnY3anJxejV1dW82MWRyNnFtYWk1ajlhYXFqYnY4Njk=', 'base64');
config.LOGIN_AES_KEY = Buffer.from('NTl3OHViamxxcG41bGRleA==', 'base64');
config.LOGIN_HMAC_LENGTH = 32;
config.LOGIN_IV_LENGTH = 16;
config.LOGIN_IV_SALT = Buffer.from('+diJP/lhUh+kjtv6S1+8yrhaP+68WNOsiV2hIH+bJ8c=', 'base64');
config.LOGIN_IV_ITERATIONS = 8 * 1024;

config.PASSWORD_SALT_ROUNDS = 10;
config.DEFAULT_PASSWORD = 'h0neypo+';

config.POSTGRES = {};
config.POSTGRES.TABLES = {};

config.POSTGRES.TABLES.USERS = {};
config.POSTGRES.TABLES.USERS.BASE = 'users';




config.S3 = {};
config.S3.DEFAULT_CLIENT = "";
config.S3.DEFAULT_BUCKET = "";
config.S3.DEFAULT_TIMEOUT = 60 * 60 * 24 * 365 * 10;
config.S3.DEFAULT_DL_DIRECTORY = config.DOWNLOAD_DIRECTORY;

config.S3.CLIENTS = {
  TEMP: {
    accessKeyId: Argv.s3_access_key || "",
    BUCKETS_FOR_MATCHING: ['honeypot'],
    DOWNLOAD_DIRECTORY: Argv.s3_download_directory || __dirname + "/tmp",
    // endpoint: Argv.s3_endpoint || "s3.wv3005.castle.fm:7480",
    endpoint: Argv.s3_endpoint || "s3.honeypot.castle.fm",
    httpOptions: {
      timeout: 0,
    },
    params: {
      Bucket: "",
    },
    PublicDomain: Argv.s3_public_domain || "wave.honeypot.fm",
    region: Argv.s3_region || "us-eest-1",
    s3ForcePathStyle: true,
    secretAccessKey:
      Argv.s3_secret_key || "",
  },
};

module.exports = config