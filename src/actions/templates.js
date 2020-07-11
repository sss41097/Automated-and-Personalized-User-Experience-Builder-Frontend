import axios from "axios";
import { setAlert } from "./alert";
import { useAlert } from "react-alert";
import removeQuotes from "./removeQuotes";
import { GET_PROJECTS, DELETE_PROJECT, GET_GROUPS } from "./type";

export const saveTemplate = (templateInput) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  var structuredData = [];

  Object.keys(templateInput.data).forEach(function (key, index) {
    if (key !== "undefined") {
      structuredData = [
        ...structuredData,
        {
          id: key,
          type: templateInput.data[key].type,
          css: templateInput.data[key].css,
          value: templateInput.data[key].value,
          childs: templateInput.data[key].childs,
          src: templateInput.data[key].src,
          images: templateInput.data[key].images,
          displays: templateInput.data[key].displays,
          classes: templateInput.data[key].classes,
          childComponent: templateInput.data[key].childComponent,
          parentComponentId: templateInput.data[key].parentComponentId,
        },
      ];
    }
  });

  for (var i = 0; i < structuredData.length; i++) {
    structuredData[i] = removeQuotes(structuredData[i]);
    console.log(i + " : " + structuredData[i]);
  }

  console.log("Structured data before sending : ", structuredData);

  try {
    let requestBody = JSON.stringify({
      query: `
        mutation {
          saveTemplate(templateInput: {templateId: "${templateInput.templateId}",data: [${structuredData}], idList: "${templateInput.idList}", count: "${templateInput.count}",DOMString: "${templateInput.DOMString}", toolTip:"${templateInput.toolTip}", overLay:"${templateInput.overLay}"}) {
              data
              count
              idList
              overLay
              toolTip
          }
        }

        `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    console.log("Save Template : ", res.data.data.saveTemplate.data);
    return { data: res.data.data.saveTemplate };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const getTemplate = (templateId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
        query {
          getTemplate(templateId: "${templateId}") {
              data
              count
              idList
              toolTip
              overLay
          }
        }

        `,
    });
    console.log(requestBody);

    const res = await axios.post("/graphql", requestBody, config);
    console.log("get Template : ", res.data.data.getTemplate);

    return { data: res.data.data.getTemplate };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const createTemplateInGroup = (
  groupId,
  projectId,
  templateName,
  groupName
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      mutation {
        createTemplateInGroup(groupId:"${groupId}", projectId:"${projectId}", templateName:"${templateName}", groupName:"${groupName}") {
         groups
         template
        }
      }
      
      
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_GROUPS,
      payload: res.data.data.createTemplateInGroup.groups,
    });
    return { data: res.data.data.createTemplateInGroup };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const deleteTemplateInGroup = (templateId, groupId, projectId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
        mutation {
            deleteTemplateInGroup(templateId:"${templateId}", groupId:"${groupId}", projectId:"${projectId}") {
             groups
            }
          }
  
          `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_GROUPS,
      payload: res.data.data.deleteTemplateInGroup.groups,
    });
    return { data: res.data.data.deleteTemplateInGroup.groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const changeTemplateOrder = (
  groups,
  groupId,
  projectId,
  droppedIndex,
  draggedIndex
) => async (dispatch) => {
  for (var i = 0; i < groups.length; i++) {
    if (groups[i]._id.toString() === groupId.toString()) {
      var temp = groups[i].templateList[droppedIndex];
      groups[i].templateList[droppedIndex] =
        groups[i].templateList[draggedIndex];
      groups[i].templateList[draggedIndex] = temp;
      break;
    }
  }

  dispatch({
    type: GET_GROUPS,
    payload: groups,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
          mutation {
              changeTemplateOrder(groupId:"${groupId}", projectId:"${projectId}", droppedIndex:${droppedIndex}, draggedIndex:${draggedIndex}) {
               groups
              }
            }
    
            `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    return { data: groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};

export const passTemplateInGroup = (
  templateId,
  inGroupId,
  passToGroupId,
  projectId
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
          mutation {
              passTemplateInGroup(templateId:"${templateId}", inGroupId:"${inGroupId}", passToGroupId:"${passToGroupId}", projectId:"${projectId}") {
               groups
              }
            }
    
            `,
    });

    const res = await axios.post("/graphql", requestBody, config);
    dispatch({
      type: GET_GROUPS,
      payload: res.data.data.passTemplateInGroup.groups,
    });
    return { data: res.data.data.passTemplateInGroup.groups };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};
