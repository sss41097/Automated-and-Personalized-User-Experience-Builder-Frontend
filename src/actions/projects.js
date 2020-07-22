import axios from "axios";
import { GET_PROJECTS, DELETE_PROJECT, PROJECT_ERROR } from "./type";

export const getAllProjects = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        getAllProjects{
        projects
       }
     }

        `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.data.getAllProjects.projects,
    });
    return { data: res.data.data.getAllProjects.projects };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const createProject = (name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
        mutation {
            createProject(name:"${name}") {
             projects
            }
          }
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_PROJECTS,
      payload: res.data.data.createProject.projects,
    });
    return { data: res.data.data.createProject.projects };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
        mutation {
            deleteProject(projectId:"${projectId}") {
             projects
            }
          }
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: DELETE_PROJECT,
      payload: res.data.data.deleteProject.projects,
    });
    return { data: res.data.data.deleteProject.projects };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const unloadProjects = () => async (dispatch) => {
  dispatch({
    type: PROJECT_ERROR,
  });
};
