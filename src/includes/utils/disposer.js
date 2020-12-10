//@flow
"use strict";

const Bluebird = require("bluebird");
// $FlowFixMe
const { unlinkAsync, statAsync, rmdirAsync } = Bluebird.promisifyAll(
  require("fs")
);
const no_op  = () => {}

/**
 * Wrapper of Bluebird.disposer().
 *
 * The first parameter is the disposer function. All other arguments except the last one can be either function or variable.
 * The last argument will be the resource_handler that will be applied to all other parameter's return value.
 *
 * @param  {...any} args
 */
async function usingResource(disposer_function: any, ...args: any[]) {
  let resource_handler = args.pop();

  if (typeof resource_handler !== "function") {
    resource_handler = no_op;
  }

  const resource_list = args.map((arg) => {
    let promise;
    // Convert each argument to a Bluebird Promise
    if (typeof arg === "function") {
      promise = Bluebird.resolve(arg());
    } else {
      promise = Bluebird.resolve(arg);
    }
    return promise.disposer(disposer_function);
  });

  //$FlowFixMe
  return Bluebird.using(...resource_list, resource_handler);
}

async function usingFile(...args: any[]): any {
  return usingResource((file_path) => {
    return unlinkAsync(file_path).catch(no_op);
  }, ...args);
}

async function usingDirectory(...args: any[]): any {
  return usingResource((directory_path) => {
    return rmdirAsync(directory_path, { recursive: true }).catch(no_op);
  }, ...args);
}

module.exports = {
  usingFile,
  usingDirectory,
};
