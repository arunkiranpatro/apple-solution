import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_PROFILE
} from "../TypeConstants";
import isEmpty from "../../utilities/is-empty";
const initialState = {
  isLoading: false,
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return { ...state, isLoading: true };
    case GET_PROFILE:
      return { ...state, profile: action.payload, isLoading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: {} };
    default:
      return state;
  }
};
