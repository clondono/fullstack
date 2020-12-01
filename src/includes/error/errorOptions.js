/* @flow */
'use strict';

const ErrorOptions: {[string]: {message: string, error_code?: string, code: number }} = { } ;


ErrorOptions.UNKNOWN = { error_code: 'UNKNOWN', message: 'Request Failed', code: 500 };

module.exports = ErrorOptions;
