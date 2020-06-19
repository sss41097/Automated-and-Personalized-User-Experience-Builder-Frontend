import axios from "axios";
import { setAlert } from "./alert";
import { useAlert } from "react-alert";

import { GET_COMPONENT, SAVE_COMPONENT } from "./type";

export const testComponent = (componentInput) => async (dispatch) => {
  console.log(componentInput);

  var sendData = [];

  Object.keys(componentInput.data).forEach((key) => {
    sendData = [
      {
        id: parseInt(key),
        type: componentInput.data[key].type.toString(),
      },
    ];
  });
  console.log(sendData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  sendData = JSON.stringify(sendData);

  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        testComponent(componentInput: {componentId: "${componentInput.componentId}",data:${sendData},idList: "${componentInput.idList}", count: "${componentInput.count}"}) {
            data
            projectId
            componentId
            count
            idList
        }
      }
      
      `,
    });
    //  console.log(requestBody);

    const res = await axios.post("/graphql", requestBody, config);
    console.log(res);

    return res;
  } catch (err) {
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const getComponent = (componentId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
        query {
          getComponent(componentId: "${componentId}") {
              data
              projectId
              componentId
              count
              idList
          }
        }
        
        `,
    });
    //  console.log(requestBody);

    const res = await axios.post("/graphql", requestBody, config);
    //console.log(res.data.data.saveComponent);

    return res.data.data.getComponent;
  } catch (err) {
    return { error: err.response.data.errors };
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};

export const saveComponent = (componentInput) => async (dispatch) => {
  console.log(componentInput);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios.defaults.headers.common["data"] = componentInput.data;
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        saveComponent(componentInput: {componentId: "${componentInput.componentId}",data:"{}",idList: "${componentInput.idList}", count: "${componentInput.count}"}) {
            data
            projectId
            componentId
            count
            idList
        }
      }
      
      `,
    });
    //  console.log(requestBody);

    const res = await axios.post("/graphql", requestBody, config);
    console.log(res.data.data.saveComponent);

    return res;
  } catch (err) {
    console.log(err.response);
    const check = err.response.data.errors;
    if (check) {
      check.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }
  }
};
