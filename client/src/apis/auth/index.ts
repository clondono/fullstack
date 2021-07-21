import { login } from "./login";
import { fetchProfile } from "./fetchProfile";
import { logout } from "./logout";
import { signup } from "./signup";
import { invite } from "./invite";
import { requestPasswordReset } from "./requestPasswordReset";
import { passwordReset } from "./passwordReset";

export const authApis = {
  fetchProfile,
  login,
  logout,
  invite,
  signup,
  requestPasswordReset,
  passwordReset,
};
