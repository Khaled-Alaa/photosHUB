import { SAVE_LOGGED_USER } from "./appTypes";

export const saveLoggedUser = (user) => {
  debugger;
  return {
    type: SAVE_LOGGED_USER,
    payload: user,
  };
};
