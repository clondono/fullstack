import { executeRequest } from '../../utils';
function fetchProfile() {
  return executeRequest.GET({
    url: 'auth/fetchProfile',
  });
}
export { fetchProfile };
