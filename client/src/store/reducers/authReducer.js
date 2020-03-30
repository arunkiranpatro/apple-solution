import { SET_USER } from "../TypeConstants";
import isEmpty from "../../utilities/is-empty";
const initialState = {
  user: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
