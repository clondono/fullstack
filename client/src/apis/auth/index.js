import { login } from './login'
import { fetchProfile } from './fetchProfile'
import { logout } from './logout'

export const authApis = {
  fetchProfile,
  login,
  logout
}