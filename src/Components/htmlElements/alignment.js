import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";
import ComponentButton from "./button";
import ComponentImage from "./image";
import ComponentAlignment from "./alignment";
import ComponentHeader from "./header";
import ComponentText from "./text";
import ComponentSlideshow from "./slideshow";
import ComponentVideo from "./video";

const Alignment = ({
  id,
  receivedProperties,
  setActiveId,
  data,
  parentState,
  updateParentStateWithChildDrop,
  updateIdList,
  componentDragStart,
  updateData,
  componentDragOver,
  changeSlideNumber,
  htmlTemplates,
}) => {
  const [css, setcss] = useState({
    width: "",
    height: "",
    minWidth: "",
    minHeight: "",
    position: "",
    borderRadius: "",
    fontSize: "",
    top: "",
    left: "",
    transform: "",
    borderColor: "",
    borderWidth: "",
    borderStyle: "",
    display: "",
    overflow: "",
    flexDirection: "",
    justifyContent: "",
    alignItems: "",
    padding: "",
    margin: "",
    marginLeft: "",
    marginRight: "",
    marginBottom: "",
    marginTop: "",
    padding: "",
    paddingLeft: "",
    paddingRight: "",
    paddingBottom: "",
    paddingTop: "",
  });

  const [classes, setClasses] = useState({
    default: "",
    direction: "",
    alignitems: "",
    justifycontent: "",
    selectedeffect: "",
  });

  const styles = {
    height: css.height,
    width: css.width,
    overflow: css.overflow,
    minWidth: css.minWidth + "px",
    minHeight: css.minHeight + "px",
    fontSize: css.fontSize + "px",
    borderRadius: css.borderRadius + "px",
    position: css.position,
    top: css.top + "px",
    left: css.left + "px",
    borderColor: css.borderColor,
    borderWidth: css.borderWidth + "px",
    borderStyle: css.borderStyle,
    display: css.display,
    flexDirection: css.flexDirection,
    justifyContent: css.justifyContent,
    alignItems: css.alignItems,
    margin: css.margin + "px",
    marginLeft: css.marginLeft + "px",
    marginRight: css.marginRight + "px",
    marginBottom: css.marginBottom + "px",
    marginTop: css.marginTop + "px",
    padding: css.padding + "px",
    paddingLeft: css.paddingLeft + "px",
    paddingRight: css.paddingRight + "px",
    paddingBottom: css.paddingBottom + "px",
    paddingTop: css.paddingTop + "px",
  };

  useEffect(() => {
    setcss(receivedProperties.css);
    setClasses(receivedProperties.classes);
  }, [
    receivedProperties.css,
    receivedProperties.value,
    receivedProperties.classes,
  ]);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveId(id);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e, cat) => {
    e.stopPropagation();

    console.log("dropped on alignment");

    const iconId = parentState.iconId;
    console.log("IconId : ", iconId);
    if (parentState.componentId !== "") {
      const draggedComponentId = parseInt(parentState.componentId);
      if (
        parentState["data"][draggedComponentId].childComponent === false &&
        parentState["data"][id].childComponent === false
      ) {
        var idList = parentState.idList;
        const indexOfDraggedComponentId = idList.indexOf(draggedComponentId);
        const indexofCurrentComponentId = idList.indexOf(id);
        console.log(draggedComponentId, id);
        idList[indexOfDraggedComponentId] = id;
        idList[indexofCurrentComponentId] = draggedComponentId;
        console.log(idList);
        updateIdList(idList);
      } else if (
        parentState["data"][draggedComponentId].childComponent === true &&
        parentState["data"][id].childComponent === true &&
        parentState["data"][draggedComponentId].parentComponentId ===
          parentState["data"][id].parentComponentId
      ) {
        var parentId = parentState["data"][id].parentComponentId;
        var idList = parentState["data"][parentId]["childs"];
        const indexOfDraggedComponentId = idList.indexOf(draggedComponentId);
        const indexofCurrentComponentId = idList.indexOf(id);
        console.log(draggedComponentId, id);
        idList[indexOfDraggedComponentId] = id;
        idList[indexofCurrentComponentId] = draggedComponentId;
        console.log(idList);
        var modifiedData = parentState["data"];
        modifiedData[parentId]["childs"] = idList;
        updateData(modifiedData);
      }
      return;
    }

    if (iconId === "buttonIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "button";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
      console.log(newData);
    } else if (iconId === "imageIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        src: htmlTemplates[iconId].src,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "image";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
      console.log(newData);
    } else if (iconId === "headerIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "header";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
      console.log(newData);
    } else if (iconId === "textIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "text";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
    } else if (iconId === "slideshowIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        classes: { ...htmlTemplates[iconId].classes },
        images: [...htmlTemplates[iconId].images],
        displays: [...htmlTemplates[iconId].displays],
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "slideshow";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "videoIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        src: htmlTemplates[iconId].src,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var newId = parentState.count;
      var newData = {};
      newData[newId] = template;
      newData[newId].type = "video";
      newData[newId].childComponent = true;
      newData[newId].parentComponentId = id;
      //console.log("New Data before update : ", newData);
    } else {
      return;
    }

    console.log("dropped on card: card details before: ", data[id]);
    parentState.data[id]["childs"].push(newId);
    parentState.data[newId] = newData[newId];
    console.log("dropped on card: card details after: ", parentState.data[id]);
    updateParentStateWithChildDrop(parentState.data);
  };

  return (
    <Fragment>
      <div
        draggable="true"
        onDragStart={(event) => componentDragStart(event)}
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => onDragOver(event)}
        id={id}
        className={
          classes.default +
          " " +
          classes.direction +
          " " +
          classes.alignitems +
          " " +
          classes.justifycontent +
          " " +
          classes.selectedeffect
        }
        style={styles}
        onClick={(e) => onClick(e)}
      >
        {receivedProperties["childs"].length == 0
          ? "Drop your components inside this!"
          : ""}
        {receivedProperties["childs"].map((key) => {
          if (data[key].type === "button") {
            return (
              <ComponentButton
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                htmlTemplates={htmlTemplates}
              />
            );
          } else if (data[key].type === "image") {
            return (
              <ComponentImage
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                htmlTemplates={htmlTemplates}
              />
            );
          } else if (data[key].type === "header") {
            return (
              <ComponentHeader
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                htmlTemplates={htmlTemplates}
              />
            );
          } else if (data[key].type === "text") {
            return (
              <ComponentText
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                htmlTemplates={htmlTemplates}
              />
            );
          } else if (data[key].type === "slideshow") {
            return (
              <ComponentSlideshow
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                changeSlideNumber={changeSlideNumber}
                htmlTemplates={htmlTemplates}
              />
            );
          } else if (data[key].type === "video") {
            return (
              <ComponentVideo
                id={key}
                parentState={parentState}
                setActiveId={setActiveId}
                receivedProperties={data[key]}
                componentDragOver={componentDragOver}
                componentDragStart={componentDragStart}
                updateIdList={updateIdList}
                updateData={updateData}
                changeSlideNumber={changeSlideNumber}
                htmlTemplates={htmlTemplates}
              />
            );
          }
        })}
      </div>
    </Fragment>
  );
};

export default Alignment;
