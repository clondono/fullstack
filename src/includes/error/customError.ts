class CustomError extends Error {
  name: string;
  error_string: string;
  error_code: string;
  code: number;

  constructor({
    message,
    code,
    error_code,
  }: {
    message: string;
    code: number;
    error_code?: string;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.error_string = message;
    this.code = code;
    this.error_code = error_code || 'ERROR';
  }
}

export default CustomError;
