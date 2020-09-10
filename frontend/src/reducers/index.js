import { combineReducers } from "redux";
import auth from "./auth";
import team from "./team";
import message from "./message";

export default combineReducers({
  auth,
  team,
  message,
});
