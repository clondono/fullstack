import Bluebird from 'bluebird';
import Fs from 'fs';
const { unlinkAsync, rmdirAsync }: any = Bluebird.promisifyAll(Fs);

// eslint-disable-next-line
const no_op = () => {};

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

  if (typeof resource_handler !== 'function') {
    resource_handler = no_op;
  }

  const resource_list = args.map((arg) => {
    let promise;
    // Convert each argument to a Bluebird Promise
    if (typeof arg === 'function') {
      promise = Bluebird.resolve(arg());
    } else {
      promise = Bluebird.resolve(arg);
    }
    return promise.disposer(disposer_function);
  });
  // @ts-ignore: NO IDEA BLUEBIRD MESS
  return Bluebird.using(...resource_list, resource_handler);
}

async function usingFile(...args: any[]): Promise<unknown> {
  return usingResource((file_path: string) => {
    return unlinkAsync(file_path).catch(no_op);
  }, ...args);
}

async function usingDirectory(...args: any[]): Promise<unknown> {
  return usingResource((directory_path: string) => {
    return rmdirAsync(directory_path, { recursive: true }).catch(no_op);
  }, ...args);
}

export { usingFile, usingDirectory };
