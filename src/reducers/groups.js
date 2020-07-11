import {
  GET_GROUPS,
  GROUP_ERROR,
  DELETE_GROUP,
  UNLOAD_GROUP,
} from "../actions/type";

const initState = {
  groups: [],
  loading: true,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUPS:
    case DELETE_GROUP:
      return {
        groups: payload,
        loading: false,
      };

    case GROUP_ERROR:
      return {
        groups: [],
        loading: false,
      };
    case UNLOAD_GROUP:
      return {
        groups: [],
        loading: true,
      };

    default:
      return state;
  }
}
