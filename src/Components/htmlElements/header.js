import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";

const Header = ({
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
    borderRadius: "",
    fontSize: "",
    top: "",
    left: "",
    transform: "",
    borderColor: "",
    borderWidth: "",
    fontFamily: "",
    color: "",
    backgroundColor: "",
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
    size: "",
    default: "",
    color: "",
    textcolor: "",
    selectedeffect: "",
  });

  const [value, setvalue] = useState("");

  const styles = {
    height: css.height + "px",
    width: css.width + "px",
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
    setvalue(receivedProperties.value);
    setClasses(receivedProperties.classes);
  }, [
    receivedProperties,
    receivedProperties.css,
    receivedProperties.value,
    receivedProperties.classes,
  ]);
  console.log(classes);
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
      draggable="true"
      onDragStart={(event) => componentDragStart(event)}
      onDrop={(event) => onDrop(event)}
      onDragOver={(event) => onDragOver(event)}
      className={
        classes.default +
        " " +
        classes.size +
        " " +
        classes.textcolor +
        " " +
        classes.selectedeffect
      }
      style={styles}
      id={id}
      onClick={(e) => onClick(e)}
    >
      {value}
    </div>
  );
};

export default Header;
