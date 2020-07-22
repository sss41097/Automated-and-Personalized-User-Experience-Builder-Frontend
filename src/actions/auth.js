import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UNLOAD_GROUP,
  PROJECT_ERROR,
} from "./type";
import setAuthtoken from "././../utils/setAuthToken";

// first project creation(onboardingStep 3)
export const createFirstProject = (email, projectName) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        createFirstProject(email:"${email}", name:"${projectName}") {
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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.createFirstProject,
    });
    return { data: res.data.data.createFirstProject };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
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
  } catch (err) {}
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

    console.log(
      "Send verify email return data: ",
      res.data.data.sendVerifyEmail
    );

    return { data: res.data.data.sendVerifyEmail };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.loginUserSocial,
    });

    dispatch(loadUser());

    console.log("social login return data : ", res.data.data.loginUserSocial);

    return { data: res.data.data.loginUserSocial };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

//register user
export const register = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
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

    console.log("REGISTER step 1 return data : ", res.data.data.createUser);

    return { data: res.data.data.createUser };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data.login,
    });

    dispatch(loadUser());

    console.log("Login return data : ", res.data.data.login);

    return { data: res.data.data.login };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

//logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: PROJECT_ERROR,
  });
  dispatch({ type: LOGOUT });
  dispatch({
    type: UNLOAD_GROUP,
  });
};
