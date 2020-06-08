import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  LOGOUT,
} from "../actions/type";

const initState = {
  profile: {},
  loading: true,
};

export default function (state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
    case LOGOUT:
      return {
        profile: {},
        loading: false,
      };

    default:
      return state;
  }
}
