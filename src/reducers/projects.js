import { GET_PROJECTS, PROJECT_ERROR, DELETE_PROJECT } from "../actions/type";

const initState = {
  projects: [],
  loading: true,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
    case DELETE_PROJECT:
      return {
        projects: payload,
        loading: false,
      };

    case PROJECT_ERROR:
      return {
        projects: [],
        loading: true,
      };

    default:
      return state;
  }
}
