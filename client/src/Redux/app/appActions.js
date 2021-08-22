import { SAVE_LOGGED_USER, UPDATE_LOGGED_USER_DATA } from "./appTypes";

export const saveLoggedUser = (user) => {
  return {
    type: SAVE_LOGGED_USER,
    payload: user,
  };
};

export const updateLoggedUserData = (updatedUser) => {
  return {
    type: UPDATE_LOGGED_USER_DATA,
    payload: updatedUser,
  };
};
