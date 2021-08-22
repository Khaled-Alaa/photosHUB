import { SAVE_LOGGED_USER ,UPDATE_LOGGED_USER_DATA} from "./appTypes";

const initialState = {
  user: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        ...state,
        user: action.payload,
      };

    case UPDATE_LOGGED_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
