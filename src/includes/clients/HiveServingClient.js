//@flow
"use strict";

const HiveServingRequest = require("hive-serving-request");
const {
  AMQP_SERVER_HIVE_SERVING,
  CONSUL_HIVE_SERVING_HOST,
  CONSUL_HIVE_SERVING_PORT,
  HIVE_SERVING_TYPE,
  HIVE_SERVING_SERVICE_NAME,
} = require("../../config/index.js");

const DEFAULT_CLASSIFY_OPT = {
  retry: {
    attempts: 5,
    backoff: (i) => 5000 + 3000 * i,
  },
};

class hsl {
  client: any;

  constructor(opts: Object) {
    this.client = HiveServingRequest.getClient(opts);
  }

  evaluate_hsl(
    queue: string,
    hsl_code: string,
    file: string | Buffer | ReadableStream,
    opts?: Object = DEFAULT_CLASSIFY_OPT
  ) {
    return this.client.request({
      service_name: queue,
      hsl_code: hsl_code,
      hsl_args: [
        {
          file: file,
        },
      ],
      options: opts,
    });
  }

  request(...args: any[]) {
    return this.client.request(...args);
  }
}

switch (HIVE_SERVING_TYPE) {
  default:
  case "rmq":
    // $FlowFixMe
    module.exports = new hsl({
      rabbitmq_config: {
        amqp_string: AMQP_SERVER_HIVE_SERVING,
      },
      logging_config: {
        service: HIVE_SERVING_SERVICE_NAME,
      },
    });
    break;
  case "consul":
    // $FlowFixMe
    module.exports = new hsl({
      consul_config: {
        consul_host: CONSUL_HIVE_SERVING_HOST,
        consul_port: CONSUL_HIVE_SERVING_PORT,
      },
      logging_config: {
        service: HIVE_SERVING_SERVICE_NAME,
      },
    });
    break;
}
