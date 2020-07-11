import axios from "axios";

export const getAllComponentTemplates = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    let requestBody = JSON.stringify({
      query: `
      query {
        getAllComponentTemplates{
         componentTemplates
       }
     }

        `,
    });
    console.log(requestBody);

    const res = await axios.post("/graphql", requestBody, config);
    console.log(
      "get all component Template : ",
      res.data.data.getAllComponentTemplates
    );

    return { data: res.data.data.getAllComponentTemplates };
  } catch (err) {
    console.log(err.response);
    return { error: err.response.data.errors[0].message };
  }
};
