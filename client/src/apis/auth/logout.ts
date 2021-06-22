import { executeRequest } from '../../utils';
function logout() {
  return executeRequest.DELETE({
    url: 'auth/logout',
  });
}
export { logout };
