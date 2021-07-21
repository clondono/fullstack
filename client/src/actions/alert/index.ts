import { ALERT_CONSTANTS } from "../../constants";

export const alertActions = {
  success,
  error,
  clear,
  info,
  warning,
};

function success(message: string) {
  return { type: ALERT_CONSTANTS.SUCCESS, message };
}

function info(message: string) {
  return { type: ALERT_CONSTANTS.INFO, message };
}
function warning(message: string) {
  return { type: ALERT_CONSTANTS.WARNING, message };
}

function error(message: string) {
  return { type: ALERT_CONSTANTS.ERROR, message };
}

function clear() {
  return { type: ALERT_CONSTANTS.CLEAR };
}
