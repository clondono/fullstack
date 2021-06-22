let ErrorOptions: {
  generator: any;
  [x: string]: { message: string; error_code?: string; code: number } | any;
} = { generator: {} };

ErrorOptions.UNKNOWN = { error_code: 'UNKNOWN', message: 'Request Failed', code: 500 };
ErrorOptions.INVALID_USER = {
  error_code: 'INVALID_USER',
  message: 'This user does not exist',
  code: 400,
};
ErrorOptions.EXISTING_EMAIL = {
  error_code: 'EXISTING_EMAIL',
  message: 'A user already exists with this email',
  code: 400,
};
ErrorOptions.WRONG_PASSWORD = {
  error_code: 'WRONG_PASSWORD',
  message: 'Password does not match',
  code: 403,
};
ErrorOptions.MISSING_PASSWORD = {
  error_code: 'MISSING_PASSWORD',
  message: 'Missing password',
  code: 400,
};
ErrorOptions.MISSING_EMAIL = { error_code: 'MISSING_EMAIL', message: 'MIssing email', code: 400 };

ErrorOptions.INVALID_IMAGE = {
  error_code: 'INVALID_IMAGE',
  message: 'This Image does not exist',
  code: 400,
};

ErrorOptions.PASSWORDS_MISMATCH = {
  error_code: 'PASSWORDS_MISMATCH',
  message: 'Please make sure that the passwords match.',
  code: 400,
};
ErrorOptions.PASSWORD_RESET_FAIL = {
  error_code: 'PASSWORD_RESET_FAIL',
  message: 'Password reset has not been successful.',
  code: 400,
};
ErrorOptions.EMAIL_MISMATCH = {
  error_code: 'EMAIL_MISMATCH',
  message: 'Please use the invited email address to sign up.',
  code: 400,
};

ErrorOptions.BAD_REQUEST = { error_code: 'BAD_REQUEST', message: 'Bad request.', code: 400 };

ErrorOptions.generator.paramRequired = ({ param_name }: { param_name: string }) => ({
  error_code: 'PARAM_REQUIRED',
  message: `${param_name} is required.`,
  code: 400,
});

ErrorOptions.generator.wrongType = ({
  param_name,
  expected_type,
}: {
  param_name: string;
  expected_type: string;
}) => {
  return {
    error_code: 'WRONG_TYPE',
    message: `Validation failed for field: ${param_name}. Expected type: ${expected_type}`,
    code: 400,
  };
};

ErrorOptions.generator.badlyFormattedDateString = ({ param_name }: { param_name: string }) => {
  return {
    error_code: 'BADLY_FORMATTED_DATE_STRING',
    message: `Validation failed for field: ${param_name}. Expected format:  YYYY-MM-DD`,
    code: 400,
  };
};
ErrorOptions.generator.badlyFormattedEmail = ({ param_name }: { param_name: string }) => {
  return {
    error_code: 'BADLY_FORMATTED_EMAIL',
    message: `Validation failed for field: ${param_name}. Expected format:  <username>@<domain_server>.<top_level_domain>`,
    code: 400,
  };
};

ErrorOptions.generator.unallowedValue = ({
  param_name,
  white_list,
}: {
  param_name: string;
  white_list: any[];
}) => {
  return {
    error_code: 'UNALLOWED_VALUE',
    message: `Validation failed for field: ${param_name}. Value is not elligible for this field.`,
    code: 400,
  };
};
// ErrorOptions.generator.unallowedValue = ({ param_name, white_list }: {param_name: string, white_list: any[]}) =>{ return { error_code: 'UNALLOWED_VALUE', message: `Validation failed for field: ${param_name}. Valid options include: ${white_list.join(', ')}`, code: 400 };};

/* Internal Failures */
ErrorOptions.INVALID_TYPE = { error_code: 'INVALID_TYPE', message: 'Request Failed', code: 500 };
ErrorOptions.POSTGRES = {
  error_code: 'POSTGRES',
  message: 'Postgres connection failed',
  code: 500,
};
ErrorOptions.UNKNOWN = { error_code: 'UNKNOWN', message: 'Request Failed', code: 500 };
ErrorOptions.REPORT_FAILED = { error_code: 'REPORT_FAILED', message: 'Request Failed', code: 500 };
ErrorOptions.DATABASE_ERROR = {
  error_code: 'DATABASE_ERROR',
  message: 'Request Failed',
  code: 500,
};

export default ErrorOptions;
