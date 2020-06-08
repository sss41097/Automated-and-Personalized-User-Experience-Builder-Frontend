import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  userId: null,
  email: null,
  isEmailVerified: false,
  isFirstProjectCreated: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        userId: null,
        email: null,
        isEmailVerified: null,
        isFirstProjectCreated: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
