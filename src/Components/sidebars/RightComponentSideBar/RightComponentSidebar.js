import React, { Fragment, useState, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./RightComponentSidebar.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";

const RightComponentSidebar = ({
  closeNav,
  rightNavBarWidth,
  id,
  data,
  updateDataCSS,
  updateDataValue,
  updateDataSrc,
  updateDataClasses,
  deleteComponent,
  setQueryLoading,
  addImageToSlideShow,
  deleteImageFromSlideShow,
  changeImage,
}) => {
  const refBackGroundColor = useRef(null);
  const refTextColor = useRef(null);
  const refBorderColor = useRef(null);
  const imageUploadButtonReference = useRef(null);

  const handleTriggerImageUploadButton = (e) => {
    imageUploadButtonReference.current.click();
  };

  const handleImageUpload = async (e, type) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("images", e.target.files[0]);

      try {
        setQueryLoading(true);
        const res = await axios.put("/imageUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setQueryLoading(false);
        console.log(res.data.url);
        if (type === "slideshow") addImageToSlideShow(id, res.data.url);
        else if (type === "image") changeImage(id, res.data.url);
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const borderSlider = (event, newValue) => {
    updateDataCSS("borderWidth", newValue);
  };

  // ref functions
  const changeTextColor = () => {
    refTextColor.current.click();
  };

  const changeBackGroundColor = () => {
    refBackGroundColor.current.click();
  };

  const changeBorderColor = () => {
    refBorderColor.current.click();
  };

  const [propertySwitch, setPropertySwitch] = useState({
    textProperty: false,
    borderProperty: false,
    alignmentProperty: false,
    marginAndPaddingProperty: false,
    heightAndWidthProperty: false,
  });

  const propertySwitchToggle = (e) => {
    setPropertySwitch({
      ...propertySwitch,
      [e.target.name]: e.target.checked,
    });
  };

  const onchangecss = (e) => {
    console.log(e.target.name, e.target.value);
    updateDataCSS(e.target.name, e.target.value);
  };

  const onchangeclassesdropdown = (e) => {
    console.log(e.target.name, e.target.value);
    updateDataClasses(e.target.name, e.target.value);
  };

  const onchangeclassessurface = (type, value) => {
    if (type === "backgroundcolor") {
      updateDataCSS("backgroundColor", "");
    } else if (type === "textcolor") {
      updateDataCSS("color", "");
    }
    console.log(type, value);
    updateDataClasses(type, value);
  };

  const onchangevalue = (e) => {
    updateDataValue(e.target.value);
  };

  const onchangesrc = (e) => {
    updateDataSrc(e.target.value);
  };

  return (
    <Fragment>
      {!id ? (
        <div></div>
      ) : (
        <div>
          <div
            style={{ width: rightNavBarWidth }}
            id="mySiderightnav"
            className="RightComponentSideBar"
          >
            <div
              style={{
                marginTop: "-50px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={(e) => closeNav(e)}
            >
              {" "}
              <ArrowBackIosIcon style={{ transform: "rotate(180deg)" }} />
            </div>

            <br />
            <Typography
              variant="p"
              display="inline"
              style={{
                color: "grey",
                fontSize: "15px",
                fontWeight: "bold",
                marginLeft: "10px",
                fontFamily: "sans-serif",
              }}
            >
              SELECTED COMPONENT : {data[id].type}
            </Typography>
            <br />

            {data[id].type !== "button" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                <hr style={{ borderWidth: "2px" }} />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  BUTTON SETTINGS
                </Typography>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Button Text:
                </Typography>
                <br />
                <TextareaAutosize
                  style={{
                    marginLeft: "35px",
                    width: "200px",
                    height: "30px",
                    border: "3px solid #1976d2",
                    padding: "5px",
                    fontFamily: "sans-serif",
                  }}
                  rowsMax={2}
                  aria-label="maximum height"
                  value={data[id].value}
                  onChange={(e) => onchangevalue(e)}
                />
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Button Size:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "35px",
                    marginBottom: "5px",
                    width: "220px",
                  }}
                  name="size"
                  value={data[id].classes.size}
                  onChange={(e) => onchangeclassesdropdown(e)}
                >
                  <MenuItem value={"not set"} disabled>
                    Button Size :
                  </MenuItem>{" "}
                  <MenuItem value={"Button-Size-Small"}>Small </MenuItem>
                  <MenuItem value={"Button-Size-Normal"}>Medium</MenuItem>
                  <MenuItem value={"Button-Size-Large"}>Large</MenuItem>
                </Select>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Text Color:
                </Typography>
                <input
                  style={{
                    width: "0px",
                    height: "0px",
                    opacity: "0",
                  }}
                  ref={refTextColor}
                  name="color"
                  value={data[id].css.color}
                  onChange={(e) => onchangecss(e)}
                  type="color"
                />
                <div
                  onClick={(e) => changeTextColor(e)}
                  style={{
                    marginLeft: "124px",
                    backgroundColor: !data[id].css.color
                      ? "white"
                      : data[id].css.color,
                    borderRadius: "50%",
                    display: "inline-block",
                    borderWidth: "0px",
                    borderColor: "#0c0e0e",
                    cursor: "pointer",
                    width: "23px",
                    height: "22px",
                  }}
                ></div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "35px",
                    width: "220px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Button-TextColor-Black"
                      )
                    }
                    style={{
                      backgroundColor: "black",
                      minHeight: "45px",
                      width: "70%",
                      margin: "4px",
                    }}
                  ></Button>
                  <Button
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Button-TextColor-White"
                      )
                    }
                    style={{
                      backgroundColor: "white",
                      minHeight: "45px",
                      width: "70%",
                      margin: "4px",
                    }}
                  ></Button>
                </div>
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Background Color:
                </Typography>
                <input
                  style={{
                    width: "0px",
                    height: "0px",
                    opacity: "0",
                  }}
                  ref={refBackGroundColor}
                  name="backgroundColor"
                  value={data[id].css.backgroundColor}
                  onChange={(e) => onchangecss(e)}
                  type="color"
                />
                <div
                  onClick={(e) => changeBackGroundColor(e)}
                  style={{
                    marginLeft: "75px",
                    marginTop: "5px",
                    backgroundColor: !data[id].css.backgroundColor
                      ? "white"
                      : data[id].css.backgroundColor,
                    borderRadius: "50%",
                    display: "inline-block",
                    borderWidth: "0px",
                    borderColor: "#0c0e0e",
                    width: "23px",
                    cursor: "pointer",
                    height: "22px",
                  }}
                >
                  {" "}
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "35px",
                    minWidth: "5px",
                    width: "220px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-Black"
                      )
                    }
                    style={{
                      backgroundColor: "black",
                      minHeight: "25px",
                      width: "90%",
                      minWidth: "5px",
                      margin: "2px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-White"
                      )
                    }
                    style={{
                      backgroundColor: "white",
                      minHeight: "25px",
                      width: "90%",
                      minWidth: "5px",
                      margin: "2px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-Blue"
                      )
                    }
                    style={{
                      backgroundColor: "#1976d2",
                      minHeight: "25px",
                      width: "90%",
                      minWidth: "5px",
                      margin: "2px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-Red"
                      )
                    }
                    style={{
                      backgroundColor: "#f44336",
                      minHeight: "25px",
                      width: "90%",
                      minWidth: "5px",
                      margin: "2px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-Green"
                      )
                    }
                    style={{
                      backgroundColor: "#4caf50",
                      minHeight: "25px",

                      width: "90%",
                      minWidth: "5px",

                      margin: "2px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "backgroundcolor",
                        "Button-Color-Golden"
                      )
                    }
                    style={{
                      backgroundColor: "#f0ad4e",
                      minHeight: "25px",
                      width: "90%",
                      minWidth: "5px",
                      margin: "2px",
                    }}
                  ></Button>
                </div>
                <hr style={{ borderWidth: "2px" }} />
                <div className="Border-Property">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="p"
                      display="inline"
                      style={{
                        color: "grey",
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      BORDER PROPERTY
                    </Typography>
                  </div>
                  <br />

                  <Fragment>
                    {" "}
                    <Typography
                      variant="p"
                      display="inline"
                      style={{
                        marginLeft: "35px",
                        color: "#394141",
                        fontSize: "14px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Radius:
                    </Typography>
                    <Select
                      style={{
                        fontSize: "12px",
                        marginLeft: "48px",
                        marginBottom: "5px",
                        width: "120px",
                      }}
                      name="borderRadius"
                      value={
                        !data[id].css.borderRadius
                          ? "not set"
                          : data[id].css.borderRadius
                      }
                      onChange={(e) => onchangecss(e)}
                    >
                      <MenuItem value={"not set"} disabled>
                        Select
                      </MenuItem>
                      <MenuItem value={0}>Pointed Edge</MenuItem>
                      <MenuItem value={8}>Curve Edge</MenuItem>
                      <MenuItem value={25}>Rounded Edge</MenuItem>
                    </Select>
                    <br />
                  </Fragment>
                </div>
                <hr style={{ borderWidth: "2px" }} />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Functional:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "28.5px",
                    marginBottom: "5px",
                    width: "120px",
                  }}
                  name="functionality"
                  value={data[id].classes.functionality}
                  onChange={(e) => onchangeclassesdropdown(e)}
                >
                  <MenuItem value={"Next-Template-Button"}>
                    Go To Next Template
                  </MenuItem>
                  <MenuItem value={"Previous-Template-Button"}>
                    Go To Previous Template
                  </MenuItem>
                </Select>

                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}

            {data[id].type !== "header" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                <hr style={{ borderWidth: "2px" }} />{" "}
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  HEADER SETTINGS
                </Typography>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Header Text:
                </Typography>
                <br />
                <TextareaAutosize
                  style={{
                    marginLeft: "35px",
                    width: "200px",
                    height: "30px",
                    border: "3px solid #1976d2",
                    padding: "5px",
                    fontFamily: "sans-serif",
                  }}
                  rowsMax={2}
                  aria-label="maximum height"
                  value={data[id].value}
                  onChange={(e) => onchangevalue(e)}
                />
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Size:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "64px",
                    marginBottom: "5px",
                    width: "120px",
                  }}
                  name="size"
                  value={data[id].classes.size}
                  onChange={(e) => onchangeclassesdropdown(e)}
                >
                  <MenuItem value={"Header-Size-H1"}>H1</MenuItem>
                  <MenuItem value={"Header-Size-H2"}>H2</MenuItem>
                  <MenuItem value={"Header-Size-H3"}>H3</MenuItem>
                  <MenuItem value={"Header-Size-H4"}>H4</MenuItem>
                  <MenuItem value={"Header-Size-H5"}>H5</MenuItem>
                  <MenuItem value={"Header-Size-H6"}>H6</MenuItem>
                </Select>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Text Color:
                </Typography>
                <input
                  style={{
                    width: "0px",
                    height: "0px",
                    opacity: "0",
                  }}
                  ref={refTextColor}
                  name="color"
                  value={data[id].css.color}
                  onChange={(e) => onchangecss(e)}
                  type="color"
                />
                <div
                  onClick={(e) => changeTextColor(e)}
                  style={{
                    marginLeft: "124px",
                    backgroundColor: !data[id].css.color
                      ? "white"
                      : data[id].css.color,
                    borderRadius: "50%",
                    display: "inline-block",
                    borderWidth: "0px",
                    borderColor: "#0c0e0e",
                    cursor: "pointer",
                    width: "23px",
                    height: "22px",
                  }}
                ></div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "35px",
                    width: "220px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Header-TextColor-Black"
                      )
                    }
                    style={{
                      backgroundColor: "black",
                      minHeight: "45px",
                      width: "60%",
                      margin: "4px",
                    }}
                  ></Button>
                  <Button
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Header-TextColor-White"
                      )
                    }
                    style={{
                      backgroundColor: "white",
                      minHeight: "45px",
                      width: "60%",
                      margin: "4px",
                    }}
                  ></Button>
                </div>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}

            {data[id].type !== "text" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                <hr style={{ borderWidth: "2px" }} />{" "}
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  TEXT SETTINGS
                </Typography>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Text:
                </Typography>
                <br />
                <TextareaAutosize
                  style={{
                    marginLeft: "35px",
                    width: "200px",
                    height: "30px",
                    border: "3px solid #1976d2",
                    padding: "5px",
                    fontFamily: "sans-serif",
                  }}
                  rowsMax={2}
                  aria-label="maximum height"
                  value={data[id].value}
                  onChange={(e) => onchangevalue(e)}
                />
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Size:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "64px",
                    marginBottom: "5px",
                    width: "120px",
                  }}
                  name="size"
                  value={data[id].classes.size}
                  onChange={(e) => onchangeclassesdropdown(e)}
                >
                  <MenuItem value={"Text-Size-Subtitle2"}>Small</MenuItem>
                  <MenuItem value={"Text-Size-Subtitle1"}>large</MenuItem>
                </Select>
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Align Text:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "32px",
                    marginBottom: "5px",
                    width: "120px",
                  }}
                  name="align"
                  onClick={(e) => onchangeclassesdropdown(e)}
                  value={data[id].classes.align}
                >
                  <MenuItem value={"not set"} disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"Text-Align-Left"}>Left</MenuItem>
                  <MenuItem value={"Text-Align-Right"}>Right</MenuItem>
                  <MenuItem value={"Text-Align-Center"}>Center</MenuItem>
                </Select>
                <br />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Text Color:
                </Typography>
                <input
                  style={{
                    width: "0px",
                    height: "0px",
                    opacity: "0",
                  }}
                  ref={refTextColor}
                  name="color"
                  value={data[id].css.color}
                  onChange={(e) => onchangecss(e)}
                  type="color"
                />
                <div
                  onClick={(e) => changeTextColor(e)}
                  style={{
                    marginLeft: "124px",
                    backgroundColor: !data[id].css.color
                      ? "white"
                      : data[id].css.color,
                    borderRadius: "50%",
                    display: "inline-block",
                    borderWidth: "0px",
                    borderColor: "#0c0e0e",
                    cursor: "pointer",
                    width: "23px",
                    height: "22px",
                  }}
                ></div>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "35px",
                    width: "220px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Text-TextColor-Black"
                      )
                    }
                    style={{
                      backgroundColor: "black",
                      minHeight: "45px",
                      width: "60%",
                      margin: "4px",
                    }}
                  ></Button>
                  <Button
                    onClick={(e) =>
                      onchangeclassessurface(
                        "textcolor",
                        "Text-TextColor-White"
                      )
                    }
                    style={{
                      backgroundColor: "white",
                      minHeight: "45px",
                      width: "60%",
                      margin: "4px",
                    }}
                  ></Button>
                </div>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}

            {data[id].type === "alignment" ? (
              <Fragment>
                <hr style={{ borderWidth: "2px" }} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="p"
                    display="inline"
                    style={{
                      color: "grey",
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    ALIGNMENT SETTINGS
                  </Typography>
                </div>
                <br />

                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Flex Direction:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "38px",
                    marginBottom: "5px",
                    width: "90px",
                  }}
                  name="direction"
                  onClick={(e) => onchangeclassesdropdown(e)}
                  value={data[id].classes.direction}
                >
                  <MenuItem value={"not set"} disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"Alignment-Direction-Row"}>Row</MenuItem>
                  <MenuItem value={"Alignment-Direction-Column"}>
                    Column
                  </MenuItem>
                </Select>
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {data[id].classes.direction === "Alignment-Direction-Row"
                    ? "X"
                    : "Y"}
                  -Axis Alignment:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "18px",
                    marginBottom: "5px",
                    width: "90px",
                  }}
                  name="justifycontent"
                  onClick={(e) => onchangeclassesdropdown(e)}
                  value={data[id].classes.justifycontent}
                >
                  <MenuItem value={"not set"} disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"Alignment-JustifyContent-Center"}>
                    Center
                  </MenuItem>
                  <MenuItem value={"Alignment-JustifyContent-SpaceBetween"}>
                    Space-Between
                  </MenuItem>
                  <MenuItem value={"Alignment-JustifyContent-SpaceAround"}>
                    Space-Around
                  </MenuItem>
                  <MenuItem value={"Alignment-JustifyContent-SpaceFlexStart"}>
                    Flex-Start
                  </MenuItem>
                  <MenuItem value={"Alignment-JustifyContent-FlexEnd"}>
                    Flex-End
                  </MenuItem>
                </Select>
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {data[id].classes.direction === "Alignment-Direction-Row"
                    ? "Y"
                    : "X"}
                  -Axis Alignment:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "19px",
                    marginBottom: "5px",
                    width: "90px",
                  }}
                  name="alignitems"
                  onClick={(e) => onchangeclassesdropdown(e)}
                  value={data[id].classes.alignitems}
                >
                  <MenuItem value={"not set"} disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-Center"}>
                    Center
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-Stretch"}>
                    Space-Between
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-SpaceAround"}>
                    Space-Around
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-FlexEnd"}>
                    Flex-End
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-FlexStart"}>
                    Flex-Start
                  </MenuItem>
                  <MenuItem value={"Alignment-AlignItems-SpaceBetween"}>
                    Space-Between
                  </MenuItem>
                </Select>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}

            {data[id].type !== "image" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                {" "}
                <hr style={{ borderWidth: "2px" }} />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    fontFamily: "sans-serif",
                  }}
                >
                  IMAGE SETTINGS
                </Typography>
                <br />
                <br />
                <div></div>
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Image Fit:
                </Typography>
                <Select
                  style={{
                    fontSize: "12px",
                    marginLeft: "48px",
                    marginBottom: "5px",
                    width: "120px",
                  }}
                  name="objectfit"
                  value={data[id].classes.objectfit}
                  onChange={(e) => onchangeclassesdropdown(e)}
                >
                  <MenuItem value={"Image-ObjectFit-Fill"}>Fill</MenuItem>
                  <MenuItem value={"Image-ObjectFit-Contain"}>Contain</MenuItem>
                  <MenuItem value={"Image-ObjectFit-Cover"}>Cover</MenuItem>
                  <MenuItem value={"Image-ObjectFit-ScaleDown"}>
                    Scale Down
                  </MenuItem>
                </Select>
                <br />
                <br />
                <input
                  style={{ display: "none" }}
                  ref={imageUploadButtonReference}
                  onChange={(e) => handleImageUpload(e, "image")}
                  type="file"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="file"
                  onClick={(e) => handleTriggerImageUploadButton(e)}
                  style={{ marginLeft: "37px", width: "212px" }}
                  startIcon={<AddIcon />}
                >
                  Change Image
                </Button>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}

            {data[id].type !== "card" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                {" "}
                <hr style={{ borderWidth: "2px" }} />
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}
            {data[id].type !== "slideshow" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                {" "}
                <hr style={{ borderWidth: "2px" }} />
                <List>
                  {data[id].images.map((image, index) => (
                    <ListItem
                      button
                      style={{
                        fontWeight: "bold",
                        borderTopRightRadius: "23px",
                        borderBottomRightRadius: "23px",
                        right: "5px",
                      }}
                    >
                      <ListItemText primary={"Image : " + (index + 1)} />

                      <div
                        className="DeleteIcon"
                        style={{ zIndex: "111" }}
                        onClick={(e) => deleteImageFromSlideShow(id, index)}
                      >
                        <Tooltip title="Delete Image">
                          <DeleteIcon></DeleteIcon>
                        </Tooltip>
                      </div>
                    </ListItem>
                  ))}
                </List>
                <br />
                <br />
                <input
                  style={{ display: "none" }}
                  ref={imageUploadButtonReference}
                  onChange={(e) => handleImageUpload(e, "slideshow")}
                  type="file"
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="file"
                  onClick={(e) => handleTriggerImageUploadButton(e)}
                  style={{ marginLeft: "37px" }}
                  startIcon={<AddIcon />}
                >
                  Add Image To Slide
                </Button>
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}

            {data[id].type !== "video" ? (
              <Fragment></Fragment>
            ) : (
              <Fragment>
                {" "}
                <hr style={{ borderWidth: "2px" }} />
                <br />
                <Typography
                  variant="p"
                  display="inline"
                  style={{
                    marginLeft: "35px",
                    color: "#394141",
                    fontSize: "14px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Video Src:
                </Typography>
                <TextField
                  inputProps={{
                    style: {
                      width: "110px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{
                    fontSize: "12px",
                    marginLeft: "44px",
                    marginTop: "-10px",
                    width: "120px",
                  }}
                  name="src"
                  type="text"
                  onChange={(e) => onchangesrc(e)}
                  value={data[id].src}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={(e) => deleteComponent(id)}
                  color="secondary"
                  style={{ marginLeft: "37px" }}
                  startIcon={<DeleteIcon />}
                >
                  Delete Component
                </Button>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RightComponentSidebar;
