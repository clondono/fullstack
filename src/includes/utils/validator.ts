import _ from 'lodash';
import { Option } from '../../ts/interfaces/common';
import CustomError from '../error/customError';
import ErrorOptions from '../error/errorOptions';

type ValidateParamsObj = {
  type: string;
  required?: boolean;
  value: any;
  white_list?: { id: any; display_name: string }[];
  black_list?: any[];
  //TODO: allow custom validation functions and error codes to be passed in.
};

const validateParams = function ({
  suppress_error = false,
  params,
}: {
  suppress_error?: boolean;
  params: { [x: string]: ValidateParamsObj };
}) {
  _.map(Object.keys(params), (param_name: string) => {
    const { required = true, value, type, white_list } = params[param_name];
    if (exists({ value, required, param_name, suppress_error })) {
      typeCheckers[type]({ value, param_name, type, suppress_error });
      whiteListChecker({ value, param_name, white_list, suppress_error });
    }
  });
};

const exists = ({
  value,
  param_name,
  required = false,
  suppress_error = false,
}: {
  value: any;
  param_name: string;
  required?: boolean;
  suppress_error?: boolean;
}): boolean => {
  const exists = value !== null && value !== undefined;
  if (exists) return true;
  if (!exists && required) {
    throw new CustomError(ErrorOptions.generator.paramRequired({ param_name }));
  }
  return false;
};

const whiteListChecker = ({
  value,
  param_name,
  white_list = [],
  suppress_error = false,
}: {
  value: any;
  param_name: string;
  white_list?: any[];
  suppress_error?: boolean;
}): boolean => {
  if (_.isEmpty(white_list)) {
    return true;
  }
  const values = _.map(white_list, (item: Option) => item.id);
  const display_names = _.map(white_list, (item: Option) => item.display_name);
  if (!values.includes(value)) {
    throw new CustomError(ErrorOptions.generator.unallowedValue({ param_name, white_list: display_names }));
  }
  return false;
};

const validateEmail = (email: string): boolean => {
  const re: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const typeCheckers: any = {};

typeCheckers.string = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: string;
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (typeof value === 'string') return true;
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: type }));
  }
  return false;
};

typeCheckers.date_string = ({
  value,
  param_name,
  suppress_error = false,
}: {
  value: string;
  param_name: string;
  suppress_error?: boolean;
}): boolean => {
  let isType: boolean = false;
  if (typeof value === 'string' && value.match(/^[\d]{4}-[\d]{2}-[\d]{2}$/)) {
    return true;
  }
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.badlyFormattedDateString({ param_name }));
  }
  return false;
};

typeCheckers.email = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: string;
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (typeof value !== 'string') {
    if (!suppress_error) {
      throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: 'string' }));
    }
    return false;
  }
  if (!validateEmail(value)) {
    if (!suppress_error) {
      throw new CustomError(ErrorOptions.generator.badlyFormattedEmail({ param_name, expected_type: type }));
    }
    return false;
  }
  return true;
};

typeCheckers.boolean = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: boolean;
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (typeof value === 'boolean') return true;
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: type }));
  }
  return false;
};

typeCheckers.array = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: any[];
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (Array.isArray(value)) return true;
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: type }));
  }
  return false;
};

typeCheckers.number = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: number;
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (typeof value === 'number' && !isNaN(value)) return true;
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: type }));
  }
  return false;
};

typeCheckers.any = (value: any): boolean => {
  return true;
};

typeCheckers.date = ({
  value,
  param_name,
  type,
  suppress_error = false,
}: {
  value: Date;
  param_name: string;
  type: string;
  suppress_error?: boolean;
}): boolean => {
  if (value instanceof Date) return true;
  if (!suppress_error) {
    throw new CustomError(ErrorOptions.generator.wrongType({ param_name, expected_type: type }));
  }
  return false;
};

export default {
  validateParams,
  exists,
  whiteListChecker,
  validateEmail,
};
