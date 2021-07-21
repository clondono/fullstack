import { ALERT_CONSTANTS } from "../constants";

export function alert(state = {}, action: any) {
  switch (action.type) {
    case ALERT_CONSTANTS.SUCCESS:
      return {
        type: "success",
        message: action.message,
      };
    case ALERT_CONSTANTS.INFO:
      return {
        type: "info",
        message: action.message,
      };
    case ALERT_CONSTANTS.WARNING:
      return {
        type: "warning",
        message: action.message,
      };
    case ALERT_CONSTANTS.ERROR:
      return {
        type: "error",
        message: action.message,
      };
    case ALERT_CONSTANTS.CLEAR:
      return {};
    default:
      return state;
  }
}
