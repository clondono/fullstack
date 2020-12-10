/* @flow */
'use strict';

const ErrorOptions: {[string]: {message: string, error_code?: string, code: number }} = { } ;

ErrorOptions.UNKNOWN = { error_code: 'UNKNOWN', message: 'Request Failed', code: 500 };
ErrorOptions.INVALID_USER = { error_code: 'INVALID_USER', message: 'This user does not exist', code: 400 };
ErrorOptions.EXISTING_EMAIL = { error_code: 'EXISTING_EMAIL', message: 'A user already exists with this email', code: 400 };
ErrorOptions.WRONG_PASSWORD = { error_code: 'WRONG_PASSWORD', message: 'Password does not match', code: 403 };
ErrorOptions.MISSING_PASSWORD = { error_code: 'MISSING_PASSWORD', message: 'Missing password', code: 500 };
ErrorOptions.MISSING_EMAIL = { error_code: 'MISSING_EMAIL', message: 'MIssing email', code: 500 };

ErrorOptions.INVALID_IMAGE = { error_code: 'INVALID_IMAGE', message: 'This Image does not exist', code: 400 };


module.exports = ErrorOptions;
