import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  GET_ERRORS,
  CLEAR_PROFILE,
  DEL_PROFILE
} from "../TypeConstants";
import axios from "axios";
import clearErrors from "./clearErrors";
import { logoutUser } from "./register";
export const getUserProfile = () => dispatch => {
  dispatch({ type: SET_PROFILE_LOADING });
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_PROFILE, payload: {} }));
};
export const createUserProfile = (data, history) => dispatch => {
  clearErrors();
  axios
    .post("/api/profile", data)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const clearUserProfile = (data, history) => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
};
export const deleteUserProfile = () => dispatch => {
  axios
    .delete("/api/profile")
    .then(res => {
      logoutUser()(dispatch);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
