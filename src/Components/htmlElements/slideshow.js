import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";

const Slideshow = ({
  id,
  parentState,
  receivedProperties,
  setActiveId,
  componentDragOver,
  componentDragStart,
  updateIdList,
  updateData,
  changeSlideNumber,
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
    functionality: "",
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

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    changeSlideNumber(id, currentSlide);
    console.log(receivedProperties["displays"]);
  }, [currentSlide]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [receivedProperties["images"], receivedProperties["displays"].length]);

  const nextSlide = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentSlide + 1 == receivedProperties["displays"].length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prevCount) => prevCount + 1);
    }
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentSlide((prevCount) => prevCount - 1);
    if (currentSlide - 1 < 0) {
      setCurrentSlide(receivedProperties["displays"].length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

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
      {receivedProperties["images"].map((innerImage, index) => {
        return (
          <img
            draggable="true"
            onDragStart={(event) => componentDragStart(event)}
            onDrop={(event) => onDrop(event)}
            onDragOver={(event) => onDragOver(event)}
            src={innerImage}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              display: receivedProperties["displays"][index],
            }}
            className={
              classes.image + " " + classes.fade + " " + classes.functionality
            }
            id={id}
            onClick={(e) => onClick(e)}
          />
        );
      })}
      <a className="Slideshow-Container-Prev" onClick={(e) => prevSlide(e)}>
        &#10094;
      </a>
      <a className="Slideshow-Container-Next" onClick={(e) => nextSlide(e)}>
        &#10095;
      </a>
    </div>
  );
};

export default Slideshow;
