import Minimist from 'minimist';
import Path from 'path';
const Argv = Minimist(process.argv.slice(2));

const DOWNLOAD_DIRECTORY = Argv.download_dir || Path.join(__dirname, './tmp');

const config = {
  PORT: Argv.port || 8080,
  SESSION_COOKIE: 'kebler',
  MANDRILL_API_KEY: '',
  LOGSTASH_PORT: Argv.logstash_port || 5014,
  LOGSTASH_HOST: Argv.logstash_host || '',
  QUEUES: {},

  DOWNLOAD_DIRECTORY,

  LOGIN_ALGORITHM: 'aes128',
  LOGIN_HMAC_ALGORITHM: 'sha256',
  LOGIN_HMAC_KEY: Buffer.from('MnY3anJxejV1dW82MWRyNnFtYWk1ajlhYXFqYnY4Njk: ', 'base64'),
  LOGIN_AES_KEY: Buffer.from('NTl3OHViamxxcG41bGRleA==', 'base64'),
  LOGIN_HMAC_LENGTH: 32,
  LOGIN_IV_LENGTH: 16,
  LOGIN_IV_SALT: Buffer.from('+diJP/lhUh+kjtv6S1+8yrhaP+68WNOsiV2hIH+bJ8c: ', 'base64'),
  LOGIN_IV_ITERATIONS: 8 * 1024,
  POSTGRES: {
    TABLES: {
      USERS: {
        BASE: 'users',
        INVITES: 'user_invites',
        PW_RESETS: 'user_pw_resets',
      },
    },
  },
  PASSWORD_SALT_ROUNDS: 10,
  DEFAULT_PASSWORD: 'Pass1Word!',
  S3: {
    DEFAULT_CLIENT: '',
    DEFAULT_BUCKET: '',
    DEFAULT_TIMEOUT: 60 * 60 * 24 * 365 * 10,
    DEFAULT_DL_DIRECTORY: DOWNLOAD_DIRECTORY,
    CLIENTS: {
      client_name: {
        accessKeyId: Argv.s3_client_name_access_key || 'AKIAX5AGQFDTQ7M2QV56',
        BUCKETS_FOR_MATCHING: ['bucket'],
        DOWNLOAD_DIRECTORY: Argv.s3_client_name_download_directory || __dirname + '/tmp',
        httpOptions: {
          timeout: 0,
        },
        params: {
          Bucket: '',
        },
        region: Argv.s3_client_name_region || 'us-east-1',
        s3ForcePathStyle: true,
        secretAccessKey: Argv.s3_client_name_secret_key || '',
      },
    },
  },
};

export default config;
