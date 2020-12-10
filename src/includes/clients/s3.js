//@flow
"use strict";

import type { UploadType } from "../../common/types";

const { v4: uuidv4 } = require("uuid-base62");
const Bluebird = require("bluebird");
const _ = require("lodash");
const { parse, stringify } = require("csv");
const { join, dirname, basename } = require("path");
const stream = require("stream");
const AWS = require("aws-sdk");
const https = require("https");
const agent = new https.Agent({
  maxSockets: 64,
});
const Config = require("../../config/index.js");
const { hash_file, hash_text } = require("../utils/hash_utils");

// $FlowFixMe
const { createReadStream, createWriteStream, writeFileAsync, readFileAsync, mkdirAsync, statAsync, mkdirSync,  statSync, } = Bluebird.promisifyAll(require("fs"));
// $FlowFixMe
const { performance } = require("perf_hooks");

AWS.config.httpOptions.timeout = 0;
AWS.config.update({
  httpOptions: {
    agent: agent,
  },
});

const { S3_URL_REGEX } = require("../utils/regex.js");
const MAX_PUT_SIZE = 5 * 10 ** 9; // 5 gigabytes

class S3 {
  hosts: Map<string, any>;
  client_bucket_mapping: { [string]: any };
  default_bucket: string;

  constructor() {
    this.client_bucket_mapping = {};
    this.hosts = new Map();
    this.default_bucket = Config.S3.DEFAULT_BUCKET;
    Object.entries(Config.S3.CLIENTS).forEach(([host_key, value]) => {
      const client_obj = new AWS.S3(value);
      const host = { client: client_obj, ...value };
      //$FlowFixMe
      _.map(value.BUCKETS_FOR_MATCHING, (bucket) => {
        //WARNING: potentially dangerous b/c buckets are not necessarily unique to clients
        this.client_bucket_mapping[bucket] = host;
      });

      this.hosts.set(host_key, host);
    });
  }

  format({
    bucket = this.default_bucket,
    file_path,
  }: {
    bucket?: string,
    file_path: string,
  }): string {
    if (S3_URL_REGEX.test(file_path)) {
      return file_path;
    }

    return `s3://${bucket}/${file_path}`;
  }

  get_host({ bucket, client }: { bucket?: string, client?: string }) {
    if (client && this.hosts.has(client)) {
      return this.hosts.get(client);
    }
    if (bucket && this.client_bucket_mapping[bucket]) {
      return this.client_bucket_mapping[bucket];
    }
    return this.hosts.get(Config.S3.DEFAULT_CLIENT);
  }

  get_client({ bucket, client }: { bucket?: string, client?: string }) {
    return this.get_host({ bucket, client })?.client;
  }

  get_download_directory({
    bucket,
    client,
  }: {
    bucket?: string,
    client?: string,
  }) {
    return this.get_host({ bucket, client })?.DOWNLOAD_DIRECTORY;
  }



  async _file_exist({
    bucket = this.default_bucket,
    key,
    client,
  }: {
    key: string,
    bucket?: string,
    client?: string,
  }): Promise<any | false> {
    const s3_attribute = { Key: key, Bucket: bucket };

    try {
      const result = await this.get_client({ bucket, client })
        ?.headObject(s3_attribute)
        .promise();

      return result || false;
    } catch (err) {
      return false;
    }
  }

  async _upload_hash_file({
    file_path,
    file_type,
    bucket = this.default_bucket,
    client,
    timeout,
   }: {
    file_path: string,
    file_type: UploadType,
    bucket?: string,
    client?: string,
    timeout?: number,
    }): Promise<string> {
    const start_timer = performance.now();
    let hash;
    const hash_timer = performance.now();
    try {
      hash = await hash_file({file_path});
    } catch (err) {
      throw err;
    }
    const end_hash_timer = performance.now();
    const hash_time = end_hash_timer - hash_timer;

    const key = `${file_type}/${hash}`;
    const exists_timer = performance.now();
    const file_exist = await this._file_exist({ key, bucket, client });
    const end_exists_timer = performance.now();
    const exists_time = end_exists_timer - exists_timer;

    if (file_exist === null) {
      const file_stream = createReadStream(file_path);
      const file_attribute = {
        Key: key,
        Bucket: bucket,
        Body: file_stream,
      };
      const req = this.get_client({ bucket, client })?.putObject(
        file_attribute
      );
      if (timeout) {
        //$FlowFixMe
        setTimeout(req.abort.bind(req), timeout);
      }
      //$FlowFixMe
      await req.promise();
    }
    const s3_url: string = this.format({ bucket, file_path: key });
    const end_timer = performance.now();
    console.log("S3 upload timing:", {
      process_time: (end_timer - start_timer) | 0,
      exists_time,
      hash_time,
      upload_time: (end_timer - end_exists_timer) | 0,
      url: s3_url,
    });
    return s3_url;
  }

  async upload_image({
    file_path,
    bucket,
    client,
  }: {
    file_path: string,
    bucket?: string,
    client?: string,
  }): Promise<string> {
    return this._upload_hash_file({
      bucket,
      client,
      file_path,
      file_type: "image",
    });
  }

  async upload_any({
    file_path,
    bucket,
    client,
    file_type = "misc",
    timeout,
  }: {
    file_path: string,
    file_type: UploadType,
    bucket?: string,
    client?: string,
    timeout?: number,
  }): Promise<string> {
    return await this._upload_hash_file({
      bucket,
      client,
      file_path,
      file_type,
      timeout,
    });
  }

  /**
   * Upload a text to ceph s3. If the hash of the s3 already exists,
   * don't reupload. Returns s3 URL of the file with the text
   * @param  text the text to be stored in a file
   * @param  type the type of text (eg: HSL, TEXT etc). Mainly used to divide s3
   *              folders
   * @return the s3 URL in promise
   */
  async upload_text({
    text,
    bucket = this.default_bucket,
    client,
    file_type,
  }: {
    bucket?: string,
    client?: string,
    text: string,
    file_type: UploadType,
  }): Promise<string> {
    const hash = hash_text({text});
    const key = `${file_type}/${hash}`;
    const file_exist = await this._file_exist({ key, bucket, client });

    if (file_exist === null || file_exist === false) {
      try {
        const file_attribute = {
          Key: key,
          Bucket: bucket,
          Body: text,
        };
        await this.get_client({ bucket, client })
          ?.putObject(file_attribute)
          .promise();
      } catch (err) {
        throw err;
      }
    }

    return this.format({ bucket, file_path: key });
  }
  /**
   * Gets a signed url that allows access to a video from hive.
   *
   * @param {string} s3_url
   */
  async get_signed_url({
    client,
    bucket: bucket,
    key: key,
  }: {
    key: string,
    bucket?: string,
    client?: string,
  }) {
    const file_exist = await this._file_exist({ key, bucket, client });
    if (!file_exist)
      throw new Error("File to get signed url for doesn't exist.");

    const params = {
      Bucket: bucket,
      Key: key,
      Expires: Config.S3.DEFAULT_TIMEOUT,
    };

    return this.get_client({ bucket, client })?.getSignedUrlPromise(
      "getObject",
      params
    );
  }
}

// $FlowFixMe
module.exports = new S3();
