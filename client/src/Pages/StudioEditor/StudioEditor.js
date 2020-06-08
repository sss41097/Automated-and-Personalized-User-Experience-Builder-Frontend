import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Spinner from "../../utils/spinner/spinner";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Hidden } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import TextField from "@material-ui/core/TextField";
import Draggable from "react-draggable";
import LeftComponentSidebar from "../../Components/sidebars/LeftComponentSidebar/LeftComponentSidebar";
import RightBar from "../../Components/sidebars/RightComponentSideBar/RightComponentSidebar";
import ComponentButton from "../../Components/htmlElements/button";
import Default from "../../Layouts/Default/Default";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconId: "",
      leftNavBarWidth: "300px",
      rightNavBarWidth: "300px",
      height: 30,
      width: 100,
      borderRadius: 10,

      activeId: "",
      data: {
        "1": {
          css: {
            height: 40,
            width: 180,
            borderRadius: 0,
            fontSize: 12,
            position: "absolute",
            top: 40,
          },
          value: "this is a button",
        },
        "2": {
          css: {
            height: 50,
            width: 210,
            borderRadius: 0,
            fontSize: 12,
            position: "absolute",
            top: 50,
          },
          value: "this is a 2nd button",
        },
      },
    };
  }

  interval = () => {
    // setInterval(() => {
    //   console.log(this.paper.getBoundingClientRect().top);
    //   console.log(this.paper.getBoundingClientRect().left);
    // }, 300);
  };

  updateDataCSS = (type, value) => {
    var modifiedData = this.state.data;
    modifiedData[this.state.activeId].css[type] = value;
    this.setState({
      data: modifiedData,
    });
  };

  updateDataValue = (value) => {
    var modifiedData = this.state.data;
    modifiedData[this.state.activeId].value = value;
    console.log(modifiedData[this.state.activeId]);
    this.setState({
      data: modifiedData,
    });
  };

  setActiveId = (id) => {
    this.setState(
      {
        activeId: id,
        rightNavBarWidth: "300px",
      },
      function () {
        console.log(this.state.activeId);
      }
    );
  };

  openLeftNav = (e) => {
    e.preventDefault();
    console.log("opennav");
    this.setState({
      leftNavBarWidth: "300px",
    });
  };

  closeLeftNav = (e) => {
    e.preventDefault();
    this.setState({
      leftNavBarWidth: "0px",
    });
  };

  closeRightNav = (e) => {
    e.preventDefault();
    this.setState({
      rightNavBarWidth: "0px",
    });
  };

  iconDragOver = (e) => {
    console.log("drag over");
    this.setState({ iconId: "" }, function () {
      console.log(this.state.iconId);
    });
  };

  onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  onDrop = (e, cat) => {
    e.stopPropagation();
    console.log("dropped");
    if (this.state.iconId === "buttonIcon") {
      this.setState({
        show: true,
      });
    }
  };

  onbuttonClick = () => {
    console.log("button click");
  };

  onClick = (e) => {
    console.log("clicked");
  };

  iconDragStart = (e) => {
    console.log(e.target.id);
    this.setState({ iconId: e.target.id }, function () {
      console.log(this.state.iconId);
    });
  };

  clickfunc = (e) => {
    e.preventDefault();
    console.log("apple");
    this.setState({ height: "400px" });
  };

  changefunc = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.height);
  };

  findposition = (e) => {
    e.preventDefault();
    console.log(this.paper.getBoundingClientRect().top);
    console.log(this.paper.getBoundingClientRect().left);
  };

  render() {
    this.interval();
    return (
      <Default>
        <Fragment>
          {this.props.loading === true ? (
            <Fragment>
              <div style={{ height: "250px" }}></div>
              <Spinner />
            </Fragment>
          ) : (
            <Fragment>
              <LeftComponentSidebar
                closeNav={this.closeLeftNav.bind(this)}
                leftNavBarWidth={this.state.leftNavBarWidth}
                iconDragStart={this.iconDragStart.bind(this)}
                iconDragOver={this.iconDragOver.bind(this)}
              />
              <Grid container>
                <Grid item xs={3}>
                  <Grid container style={{ backgroundSize: "cover" }}></Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: "100vh" }}
                  >
                    <Paper
                      elevation={10}
                      ref={(Paper) => {
                        this.paper = Paper;
                      }}
                      onDragOver={this.onDragOver}
                      onDrop={(event) => this.onDrop(event)}
                      style={{ width: "500px", height: "500px" }}
                    >
                      <div style={{ position: "relative" }}>
                        {Object.keys(this.state.data).map((key) => {
                          return (
                            <ComponentButton
                              id={key}
                              setActiveId={this.setActiveId}
                              receivedProperties={this.state.data[key]}
                            />
                          );
                        })}
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <RightBar
                    closeNav={this.closeRightNav.bind(this)}
                    rightNavBarWidth={this.state.rightNavBarWidth}
                    id={this.state.activeId}
                    data={this.state.data}
                    updateDataCSS={this.updateDataCSS}
                    updateDataValue={this.updateDataValue}
                  />
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Fragment>
      </Default>
    );
  }
}
const mstp = (state) => ({
  isauthenticated: state.auth.isAuthenticated,
  isEmailVerified: state.auth.isEmailVerified,
  isFirstProjectCreated: state.auth.isFirstProjectCreated,
  loading: state.auth.loading,
  email: state.auth.email,
  errors: state.alert,
});

export default connect(mstp, {})(Dashboard);

{
  /* <div
id="buttonIcon"
draggable="true"
onDragStart={(event) => this.iconDragStart(event)}
>
<OpenInBrowserIcon style={{ width: "40px", height: "40px" }} />
</div>
<p>Button</p> */
}

// func = () => {
//   if (this.firstName.style.top === "50px") {
//     this.firstName.style.top = 0 + "px";
//     this.firstName.style.left = 0 + "px";
//   } else {
//     this.firstName.style.top = 50 + "px";
//     this.firstName.style.left = 50 + "px";
//   }

//   console.log("css top:", this.firstName.style.top);
//   console.log("css left:", this.firstName.style.left);

//   console.log("x coordinate:", this.firstName.getBoundingClientRect().x);
//   console.log("y coordinate:", this.firstName.getBoundingClientRect().y);
// console.log(this.firstName.getBoundingClientRect());
// console.log(
//   "top",
//   this.firstName.style.top,
//   "top expected",
//   this.firstName.getBoundingClientRect().y + "px"
// );

// var parentx, parenty;

// parentx = this.paper.getBoundingClientRect().x;
// parenty = this.paper.getBoundingClientRect().y;

// var childx, childy;
// childx = this.firstName.getBoundingClientRect().x;
// childy = this.firstName.getBoundingClientRect().y;
// console.log(childx, childy, parentx, parenty);
// if (
//   childx < parentx ||
//   childx > parentx + 500 ||
//   childy < parenty ||
//   childy > parenty + 500
// ) {
//   console.log("inside child");
//   // this.firstName.style.left = parentx + "px";
//   // this.firstName.style.top = parenty + "px";
// }

// console.log("y coordinate", this.firstName.getBoundingClientRect().y);
// console.log("x coordinate", this.firstName.getBoundingClientRect().x);
//};
