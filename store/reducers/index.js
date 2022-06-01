import { combineReducers } from "redux";
import user from "./user";
import historyNotif from "./historyNotif";

export default combineReducers({
  user,
  historyNotif,
});
