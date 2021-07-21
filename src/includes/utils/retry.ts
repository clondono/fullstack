// @flow
'use strict';

import Logger from '../clients/logger';
import { NoRequeueError, NoRetryError } from './errors';

const logger = new Logger();

const _delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

async function retry(
  callee: (params: any) => unknown,
  back_off: (params: any) => number,
  attempts: number,
  error_msgs: string | null,
  ...args: any[]
): Promise<any> {
  if (!back_off) {
    back_off = (i) => 10 ** (3 - i);
  }
  if (attempts <= 0) {
    throw new Error(
      `${callee.name} Run out of attempts.\nErrors:${
        error_msgs || 'no errors found'
      }`,
    );
  }
  try {
    // @ts-ignore
    return await callee(...args);
  } catch (err: any) {
    if (err && err?.message) {
      error_msgs = `${error_msgs || ''}\n${err?.message}`;
    }
    if (err instanceof NoRequeueError) {
      const new_err = new NoRequeueError(`No requeue error:\n${error_msgs}`);
      new_err.stack = err.stack;
      throw new_err;
    } else if (err instanceof NoRetryError) {
      const new_err = new NoRetryError(`No retry error:\n${error_msgs}`);
      new_err.stack = err.stack;
      throw new_err;
    }
    logger.error(
      `[RETRY] ${callee.name}: ${err?.message}.\n${
        err?.stack
      }\n Remaining attempts: ${attempts - 1} \n backing off for ${back_off(
        attempts,
      )}`,
    );
    await _delay(back_off(attempts));
    return await retry(callee, back_off, attempts - 1, error_msgs, ...args);
  }
}

export { retry };
