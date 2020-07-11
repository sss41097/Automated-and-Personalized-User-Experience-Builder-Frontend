import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import projects from "./projects";
import groups from "./groups.js";

export default combineReducers({
  alert,
  auth,
  profile,
  projects,
  groups,
});
