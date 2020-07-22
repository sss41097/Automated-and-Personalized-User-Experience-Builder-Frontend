import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";

const Image = ({
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
    size: "",
    default: "",
    objectfit: "",
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
    <div
      className={
        classes.size +
        " " +
        classes.selectedeffect +
        " " +
        classes.default +
        " " +
        classes.objectfit
      }
    >
      <img
        draggable="true"
        onDragStart={(event) => componentDragStart(event)}
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => onDragOver(event)}
        src={src}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          maxHeight: "200px",
        }}
        className={classes.objectfit}
        id={id}
        onClick={(e) => onClick(e)}
      />
    </div>
  );
};

export default Image;
