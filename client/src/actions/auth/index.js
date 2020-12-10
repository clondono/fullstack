import { login } from './login.js'
import { fetchProfile } from './fetchProfile.js'
import { logout } from './logout.js'

export const authActions = {
  fetchProfile,
  login,
  logout
}