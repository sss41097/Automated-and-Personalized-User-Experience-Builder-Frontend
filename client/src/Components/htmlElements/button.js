import React, { useEffect, useState, Fragment } from "react";
import Draggable from "react-draggable";

const Button = ({ id, receivedProperties, setActiveId }) => {
  const [css, setcss] = useState({
    width: "",
    height: "",
    position: "",
    borderRadius: "",
    fontSize: "",
    top: "",
    transform: "",
  });

  const [value, setvalue] = useState("");

  const styles = {
    height: css.height + "px",
    width: css.width + "px",
    fontSize: css.fontSize + "px",
    borderRadius: css.borderRadius + "px",
    position: css.position,
    top: css.top + "px",
  };

  useEffect(() => {
    setcss(receivedProperties.css);
    setvalue(receivedProperties.value);
  }, [receivedProperties.css, receivedProperties.value]);

  const onClick = (e) => {
    e.preventDefault();
    console.log(typeof id);
    setActiveId(id);
  };

  return (
    <Fragment>
      <button id={id} style={styles} onClick={(e) => onClick(e)}>
        {value}
      </button>
    </Fragment>
  );
};

export default Button;
