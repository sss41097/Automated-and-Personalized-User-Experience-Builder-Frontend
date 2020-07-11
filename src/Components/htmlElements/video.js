import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";

const Video = ({
  id,
  parentState,
  receivedProperties,
  setActiveId,
  componentDragOver,
  componentDragStart,
  updateIdList,
  updateData,
}) => {
  const [css, setcss] = useState({
    width: "",
    height: "",
    position: "",
    minWidth: "",
    minHeight: "",
    borderRadius: "",
    fontSize: "",
    top: "",
    left: "",
    transform: "",
    borderColor: "",
    borderWidth: "",
  });

  const [src, setsrc] = useState("");

  const [classes, setClasses] = useState({
    default: "",
    selectedeffect: "",
  });

  const styles = {
    height: css.height,
    width: css.width,
    fontSize: css.fontSize + "px",
    borderRadius: css.borderRadius + "px",
    position: css.position,
    top: css.top + "px",
    left: css.left + "px",
    borderColor: css.borderColor,
    borderWidth: css.borderWidth + "px",
    fontFamily: css.fontFamily,
    color: css.color,
    backgroundColor: css.backgroundColor,
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
    setsrc(receivedProperties.src);
    setClasses(receivedProperties.classes);
    document.getElementById(id).load();
  }, [receivedProperties.css, receivedProperties.src]);

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveId(id);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.stopPropagation();
    if (parentState.componentId === "") {
      return;
    }

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
  };
  return (
    <div className={classes.selectedeffect + " " + classes.default}>
      <video
        draggable="true"
        onDragStart={(event) => componentDragStart(event)}
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => onDragOver(event)}
        id={id}
        onClick={(e) => onClick(e)}
        width="100%"
        height="100%"
        style={{ objectFit: "fill", borderRadius: "4px" }}
        controls
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
