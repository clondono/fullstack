import { executeRequest } from '../../utils';

function signup(signup_params: {
  email: string;
  token: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}) {
  const body = signup_params;
  return executeRequest.POST({
    url: 'auth/signup',
    body,
  });
}

export { signup };
