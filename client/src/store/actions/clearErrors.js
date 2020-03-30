import { CLEAR_ERRORS } from "../TypeConstants";
import store from "../index";
export default function clearErrors() {
  store.dispatch({ type: CLEAR_ERRORS });
}
