import _ from 'lodash';
import { Option } from '../../ts/interfaces/moderation';

const getOptionsDict = (options: Option[]): { [x: string]: Option } => {
  const option_dict: { [key: string]: string } = {};
  _.reduce(
    options,
    (acc, { id, display_name }) => {
      acc[id] = display_name;
      return acc;
    },
    option_dict,
  );
  return option_dict;
};

export { getOptionsDict };
