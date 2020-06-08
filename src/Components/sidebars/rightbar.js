import React, { Fragment } from "react";
import paginationIcon from "./paginationIcon.svg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

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
              className="siderightnav"
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
                  inputProps={{
                    style: {
                      width: "100px",
                      fontSize: 12,
                      marginTop: "5px",
                    },
                  }}
                  style={{ marginTop: "-10px", marginLeft: "10px" }}
                  name="value"
                  type="text"
                  onChange={this.onchangevalue}
                  value={this.state.data[this.state.id].value}
                />
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Rightbar;
