import { capitalize } from './strings';

const getUserDisplayName = (user: { first_name?: string; last_name?: string; email: string }) => {
  const { first_name, last_name, email } = user;
  let display_name = first_name ? `${capitalize(first_name)} ${capitalize(last_name)}` : email;
  return display_name;
};

export { getUserDisplayName };
