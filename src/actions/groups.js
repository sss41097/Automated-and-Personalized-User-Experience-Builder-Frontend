import axios from "axios";
import { GET_GROUPS, DELETE_GROUP, UNLOAD_GROUP } from "./type";

export const getAllGroups = (projectId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        getAllGroups(projectId:"${projectId}"){
        groups
       }
     }
        `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_GROUPS,
      payload: res.data.data.getAllGroups.groups,
    });
    return { data: res.data.data.getAllGroups.groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const createGroup = (projectId, name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        createGroup(projectId:"${projectId}", name:"${name}") {
         groups
        }
      }
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_GROUPS,
      payload: res.data.data.createGroup.groups,
    });
    return { data: res.data.data.createGroup.groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const deleteGroup = (groupId, projectId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        deleteGroup(groupId:"${groupId}", projectId:"${projectId}"){
        groups
       }
     }
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: DELETE_GROUP,
      payload: res.data.data.deleteGroup.groups,
    });
    return { data: res.data.data.deleteGroup.groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const unloadGroups = () => async (dispatch) => {
  dispatch({
    type: UNLOAD_GROUP,
  });
};
