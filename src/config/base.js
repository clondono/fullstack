
const Argv = require('minimist')(process.argv.slice(2));
const Path  = require("path");

const config = {};

/* General HTTP */
config.PORT = Argv.port || 8080;

config.SESSION_COOKIE='winnie';

config.QUEUES = {};
config.QUEUES.HIVE_SERVING_QUEUE = Argv.hive_serving_queue || 'hive-serving-queue';

config.DOWNLOAD_DIRECTORY = Argv.download_dir || Path.join(__dirname, "./tmp");

config.LOGIN_ALGORITHM = 'aes128';
config.LOGIN_HMAC_ALGORITHM = 'sha256';
config.LOGIN_HMAC_KEY = Buffer.from('MnY3anJxejV1dW82MWRyNnFtYWk1ajlhYXFqYnY4Njk=', 'base64');
config.LOGIN_AES_KEY = Buffer.from('NTl3OHViamxxcG41bGRleA==', 'base64');
config.LOGIN_HMAC_LENGTH = 32;
config.LOGIN_IV_LENGTH = 16;
config.LOGIN_IV_SALT = Buffer.from('+diJP/lhUh+kjtv6S1+8yrhaP+68WNOsiV2hIH+bJ8c=', 'base64');
config.LOGIN_IV_ITERATIONS = 8 * 1024;


config.MODERATION_SERVICE_AUTH_URL = 'https://oauth.hpbp.io/oauth/v1/token'
config.MODERATION_SERVICE_AUTH_TOKEN = 'YjljNWY5MTYtMGMwMC00OWE1LWJmNzQtZTA3YjViYzU4ZTZjOkZQeUZWc2dCYndLQmhRejN4Y2hYN1JWc184Q29rNk42RXNZTWFUWXhTbnJacTV5TXNfM3FaNXc2V0ZNOUZhSXk=';
config.MODERATION_SERVICE_FETCH_S3_LINK_URL = 'test'


config.AMQP_SERVER_HIVE_SERVING =
  Argv.amqp_server_hive_serving ||
  "amqp://hive-serving:2OcIskov8@hive-dta-rmq-vip.c7365.castle.fm:5672";

config.CONSUL_HIVE_SERVING_HOST =
  Argv.consul_hive_serving_host || "consul.wv3005.castle.fm";

config.CONSUL_HIVE_SERVING_PORT = Argv.consul_hive_serving_port || 443;

config.HIVE_SERVING_TYPE = Argv.hive_serving_type || "rmq";
//TODO: see if I need to register this or something
config.HIVE_SERVING_SERVICE_NAME =  Argv.hive_serving_service_name || "honeypot";

config.POSTGRES = {};
config.POSTGRES.TABLES = {};

config.POSTGRES.TABLES.USERS = {};
config.POSTGRES.TABLES.USERS.BASE = 'users';

config.POSTGRES.TABLES.MODERATION = {};
config.POSTGRES.TABLES.MODERATION.MS_AUTH = 'ms_auth';
config.POSTGRES.TABLES.MODERATION.MODERATION_IMAGES = 'moderation_images';

config.PASSWORD_SALT_ROUNDS = 10;
config.DEFAULT_PASSWORD = 'h0neypo+';


config.S3 = {};
config.S3.DEFAULT_CLIENT = "HONEYPOT";
config.S3.DEFAULT_BUCKET = "honeypot";
config.S3.DEFAULT_TIMEOUT = 60 * 60 * 24 * 365 * 10;
config.S3.DEFAULT_DL_DIRECTORY = config.DOWNLOAD_DIRECTORY;

config.S3.CLIENTS = {
  HONEYPOT: {
    accessKeyId: Argv.s3_honeypot_access_key || "",
    BUCKETS_FOR_MATCHING: ['honeypot'],
    DOWNLOAD_DIRECTORY: Argv.s3_honeypot_download_directory || __dirname + "/tmp",
    // endpoint: Argv.s3_honeypot_endpoint || "s3.wv3005.castle.fm:7480",
    endpoint: Argv.s3_honeypot_endpoint || "s3.honeypot.castle.fm",
    httpOptions: {
      timeout: 0,
    },
    params: {
      Bucket: "",
    },
    PublicDomain: Argv.s3_honeypot_public_domain || "wave.honeypot.fm",
    region: Argv.s3_honeypot_region || "us-eest-1",
    s3ForcePathStyle: true,
    secretAccessKey:
      Argv.s3_honeypot_secret_key || "",
  },
  DATASET_MANAGEMENT: {
    accessKeyId: Argv.s3_dm_access_key || "MTLSET4Z8TX4EER890IC",
    BUCKETS_FOR_MATCHING: ["dataset_manage"],
    DOWNLOAD_DIRECTORY: Argv.s3_dm_download_directory || __dirname + "/tmp",
    endpoint: Argv.s3_dm_endpoint || "s3.castle.fm",
    httpOptions: {
      timeout: 0,
    },
    params: {
      Bucket: "dataset_manage",
    },
    region: Argv.s3_dm_region || "us-west-1",
    s3ForcePathStyle: true,
    secretAccessKey:
      Argv.s3_dm_secret_key || "eivWUUmHSST2mnCrhCrsh5IIW95dGjvVhfL97JOV",
  },
};

module.exports = config