import axios from "axios";
import { setAlert } from "./alert";
import { useAlert } from "react-alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./type";
import setAuthtoken from "././../utils/setAuthToken";

// first project creation(onboardingStep 3)
export const createFirstProject = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        createFirstProject(email:"${email}") {
        token
        userId
        email
        isEmailVerified
        isFirstProjectCreated
        }
      }
      
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);

    dispatch(setAlert("First Project Created", "success"));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.createFirstProject,
    });
  } catch (err) {
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

//send reset password email
export const resetPasswordEmail = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        resetPasswordEmail {
          email
        }
      }
      
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);

    dispatch(setAlert("Reset password email send", "success"));
  } catch (err) {
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

//send verify email
export const sendVerifyEmail = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        sendVerifyEmail(email:"${email}") {
        token
        userId
        email
        isEmailVerified
        isFirstProjectCreated
        }
      }
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);

    dispatch(setAlert("Email verification send", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err, "danger"));
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthtoken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        loadUser(email:"ThisIsNotUsed") {
          token
          userId
          email
          isEmailVerified
          isFirstProjectCreated
        }
      }
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);

    console.log(res.data.data.loadUser);
    dispatch({
      type: USER_LOADED,
      payload: res.data.data.loadUser,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//login user social
export const socialLogin = (email, firstname, lastname) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(email);
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        loginUserSocial(socialLoginInput: {email: "${email}", firstName: "${firstname}", lastName: "${lastname}"}) {
          token
          userId
          email
          isEmailVerified
          isFirstProjectCreated
        }
      }
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.loginUserSocial,
    });

    dispatch(setAlert("Social Login successful", "success"));
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data.errors);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//register user
export const register = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch(setAlert("Registration successful", "success"));
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}) {
          token
          userId
          email
          isEmailVerified
          isFirstProjectCreated
        }
      }
      `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    console.log(res);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.createUser,
    });

    dispatch(loadUser());

    dispatch(setAlert("Registration successful", "success"));
    return { msg: "Registration successful" };
  } catch (err) {
    console.log(err.response.data.errors);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
    return { errors: check };
  }
};

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            token
            userId
            email
            isEmailVerified
            isFirstProjectCreated
          }
        }
      `,
    });
    const res = await axios.post("/graphql", requestBody, config);
    console.log("Login data");
    console.log(res.data.data.login);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.login,
    });

    dispatch(loadUser());

    dispatch(setAlert("Login successful", "success"));
    return { msg: "Login Successful" };
  } catch (err) {
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
    return { errors: check };
  }
};

//logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
