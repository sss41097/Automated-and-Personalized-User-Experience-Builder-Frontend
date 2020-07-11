const removeQuotes = (structuredData) => {
  structuredData = JSON.stringify(structuredData);
  console.log("initial stringified data : ", structuredData);

  structuredData = structuredData.split("Selected-Effect").join("");

  if (structuredData.includes('"id"')) {
    structuredData = structuredData.split('"id"');
    structuredData = structuredData[0] + "id" + structuredData[1];
  }
  if (structuredData.includes('"type"')) {
    structuredData = structuredData.split('"type"');
    structuredData = structuredData[0] + "type" + structuredData[1];
  }
  if (structuredData.includes('"childs"')) {
    structuredData = structuredData.split('"childs"');
    structuredData = structuredData[0] + "childs" + structuredData[1];
  }
  if (structuredData.includes('"parentComponentId"')) {
    structuredData = structuredData.split('"parentComponentId"');
    structuredData =
      structuredData[0] + "parentComponentId" + structuredData[1];
  }
  if (structuredData.includes('"childComponent"')) {
    structuredData = structuredData.split('"childComponent"');
    structuredData = structuredData[0] + "childComponent" + structuredData[1];
  }
  if (structuredData.includes('"css"')) {
    structuredData = structuredData.split('"css"');
    structuredData = structuredData[0] + "css" + structuredData[1];
  }

  if (structuredData.includes('"classes"')) {
    structuredData = structuredData.split('"classes"');
    structuredData = structuredData[0] + "classes" + structuredData[1];
  }

  if (structuredData.includes('"src"')) {
    structuredData = structuredData.split('"src"');
    structuredData = structuredData[0] + "src" + structuredData[1];
  }
  if (structuredData.includes('"value"')) {
    structuredData = structuredData.split('"value"');
    structuredData = structuredData[0] + "value" + structuredData[1];
  }
  if (structuredData.includes('"backgroundcolor"')) {
    structuredData = structuredData.split('"backgroundcolor"');
    structuredData = structuredData[0] + "backgroundcolor" + structuredData[1];
  }
  if (structuredData.includes('"default"')) {
    structuredData = structuredData.split('"default"');
    structuredData = structuredData[0] + "default" + structuredData[1];
  }

  if (structuredData.includes('"selectedeffect"')) {
    structuredData = structuredData.split('"selectedeffect"');
    structuredData = structuredData[0] + "selectedeffect" + structuredData[1];
  }

  if (structuredData.includes('"functionality"')) {
    structuredData = structuredData.split('"functionality"');
    structuredData = structuredData[0] + "functionality" + structuredData[1];
  }

  if (structuredData.includes('"direction"')) {
    structuredData = structuredData.split('"direction"');
    structuredData = structuredData[0] + "direction" + structuredData[1];
  }
  if (structuredData.includes('"justifycontent"')) {
    structuredData = structuredData.split('"justifycontent"');
    structuredData = structuredData[0] + "justifycontent" + structuredData[1];
  }
  if (structuredData.includes('"alignitems"')) {
    structuredData = structuredData.split('"alignitems"');
    structuredData = structuredData[0] + "alignitems" + structuredData[1];
  }
  if (structuredData.includes('"objectfit"')) {
    structuredData = structuredData.split('"objectfit"');
    structuredData = structuredData[0] + "objectfit" + structuredData[1];
  }
  if (structuredData.includes('"textcolor"')) {
    structuredData = structuredData.split('"textcolor"');
    structuredData = structuredData[0] + "textcolor" + structuredData[1];
  }
  if (structuredData.includes('"align"')) {
    structuredData = structuredData.split('"align"');
    structuredData = structuredData[0] + "align" + structuredData[1];
  }
  if (structuredData.includes('"size"')) {
    structuredData = structuredData.split('"size"');
    structuredData = structuredData[0] + "size" + structuredData[1];
  }
  if (structuredData.includes('"alignitems"')) {
    structuredData = structuredData.split('"alignitems"');
    structuredData = structuredData[0] + "alignitems" + structuredData[1];
  }
  if (structuredData.includes('"images"')) {
    structuredData = structuredData.split('"images"');
    structuredData = structuredData[0] + "images" + structuredData[1];
  }
  if (structuredData.includes('"image"')) {
    structuredData = structuredData.split('"image"');
    structuredData = structuredData[0] + "image" + structuredData[1];
  }
  if (structuredData.includes('"fade"')) {
    structuredData = structuredData.split('"fade"');
    structuredData = structuredData[0] + "fade" + structuredData[1];
  }
  if (structuredData.includes('"displays"')) {
    structuredData = structuredData.split('"displays"');
    structuredData = structuredData[0] + "displays" + structuredData[1];
  }

  if (structuredData.includes('"color"')) {
    structuredData = structuredData.split('"color"');
    structuredData = structuredData[0] + "color" + structuredData[1];
  }
  if (structuredData.includes('"backgroundColor"')) {
    structuredData = structuredData.split('"backgroundColor"');
    structuredData = structuredData[0] + "backgroundColor" + structuredData[1];
  }
  if (structuredData.includes('"borderRadius"')) {
    structuredData = structuredData.split('"borderRadius"');
    structuredData = structuredData[0] + "borderRadius" + structuredData[1];
  }
  return structuredData;
};

export default removeQuotes;
