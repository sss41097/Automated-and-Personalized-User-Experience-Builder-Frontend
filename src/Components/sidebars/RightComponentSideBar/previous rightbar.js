import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./RightComponentSidebar.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class Rightbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      id: props.id,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      //Perform some operation
      this.setState({ data: nextProps.data, id: nextProps.id });
    }
  }

  onchangecss = (e) => {
    this.props.updateDataCSS(e.target.name, e.target.value);
  };

  onchangevalue = (e) => {
    this.props.updateDataValue(e.target.value);
  };

  onchangesrc = (e) => {
    this.props.updateDataSrc(e.target.value);
  };

  render() {
    return (
      <Fragment>
        {!this.state.id ? (
          <div></div>
        ) : (
          <div>
            <div
              ref={(input) => {
                this.navbar = input;
              }}
              style={{ width: this.props.rightNavBarWidth }}
              id="mySiderightnav"
              className="RightComponentSideBar"
            >
              <div
                style={{
                  marginTop: "-50px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={this.props.closeNav}
              >
                {" "}
                <ArrowBackIosIcon style={{ transform: "rotate(180deg)" }} />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  {this.state.id}
                </Typography>
              </div>
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  W:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "8px" }}
                  name="width"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.width}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Justify Content:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "8px" }}
                  name="justifyContent"
                  type="text"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.justifyContent}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  H:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="height"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.height}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Border Radius:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="borderRadius"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.borderRadius}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Border Color:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="borderColor"
                  type="text"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.borderColor}
                />
              </div>{" "}
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Border Width:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="borderWidth"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.borderWidth}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Font Size:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="fontSize"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.fontSize}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Text Value:
                </Typography>

                <TextField
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="value"
                  type="text"
                  onChange={this.onchangevalue}
                  value={this.state.data[this.state.id].value}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  top:
                </Typography>

                <TextField
                  inputProps={{}}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="top"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.top}
                />
              </div>
              <br />
              <div style={{ marginLeft: "10px" }}>
                <Typography
                  variant="p"
                  display="inline"
                  style={{ color: "black", fontSize: "13px" }}
                >
                  Left:
                </Typography>

                <TextField
                  inputProps={{
                    style: {
                      width: "50px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="left"
                  type="number"
                  onChange={this.onchangecss}
                  value={this.state.data[this.state.id].css.left}
                />
              </div>
              <br />
              {!(this.state.data[this.state.id].type === "image") ? (
                <Fragment></Fragment>
              ) : (
                <div style={{ marginLeft: "10px" }}>
                  <Typography
                    variant="p"
                    display="inline"
                    style={{ color: "black", fontSize: "13px" }}
                  >
                    Image src:
                  </Typography>

                  <TextField
                    inputProps={{
                      style: {
                        width: "50px",
                        fontSize: 12,
                        marginTop: "5px",
                      },
                    }}
                    style={{ marginTop: "-10px", marginLeft: "10px" }}
                    name="src"
                    type="text"
                    onChange={this.onchangesrc}
                    value={this.state.data[this.state.id].src}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Rightbar;
