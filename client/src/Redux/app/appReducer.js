import { SAVE_LOGGED_USER } from "./appTypes";

const initialState = {
  user: {},
};

const appReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
