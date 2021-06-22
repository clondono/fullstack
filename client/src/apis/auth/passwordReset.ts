import { executeRequest } from '../../utils';

function passwordReset({
  email,
  token,
  user_id,
  new_password,
  new_password_confirm,
}: {
  email: string;
  token: string;
  user_id: string;
  new_password: string;
  new_password_confirm: string;
}) {
  const body = { email, token, user_id, new_password, new_password_confirm };
  return executeRequest.POST({
    url: 'auth/passwordReset',
    body,
  });
}

export { passwordReset };
