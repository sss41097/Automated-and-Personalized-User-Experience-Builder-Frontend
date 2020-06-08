import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from "./type";

export const getProfile = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let requestBody = JSON.stringify({
      query: `
            query {
                getProfile {
                firstName
                lastName
                userId
                mobileNumber
                dob
                maritialStatus
                profilePicUrl
                }
            }      
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data.getProfile,
    });
  } catch (err) {
    console.log(err.response.data.errors);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //console.log(formData);

  try {
    let requestBody = JSON.stringify({
      query: `
        mutation {
            updateProfile(profileInput:{firstName: "${formData.firstName}",lastName: "${formData.lastName}",mobileNumber: ${formData.mobileNumber},maritialStatus: ${formData.maritialStatus},dob: "${formData.dob}"}) {
              firstName
              lastName
              userId
              mobileNumber
              dob
              maritialStatus
            }
          }
          
            `,
    });
    console.log(`
    mutation {
        updateProfile(profileInput:{firstName: "${formData.firstName}",lastName: "${formData.lastName}",mobileNumber: ${formData.mobileNumber},maritialStatus: ${formData.maritialStatus},dob: "${formData.dob}"}) {
          firstName
          lastName
          userId
          mobileNumber
          dob
          maritialStatus
        }
      }
      
        `);

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data.updateProfile,
    });
  } catch (err) {
    console.log(err.response.data.errors);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
