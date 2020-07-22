import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import projects from "./projects";
import groups from "./groups.js";

export default combineReducers({
  auth,
  profile,
  projects,
  groups,
});
