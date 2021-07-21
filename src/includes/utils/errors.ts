import { Error as HitsquadError } from 'hitsquad-utils';
const NoRetryError = HitsquadError.NoRetryError;

class NoRequeueError extends NoRetryError {
  constructor(message: string) {
    super(message);
    this.name = 'NoRequeueError';
  }
}
export { NoRetryError, NoRequeueError };
