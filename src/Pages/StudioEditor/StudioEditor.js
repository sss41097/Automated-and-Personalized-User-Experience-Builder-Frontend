import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Spinner from "../../utils/spinner/spinner";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./StudioEditor.css";
import { withRouter } from "react-router-dom";
import { Hidden } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import TextField from "@material-ui/core/TextField";
import Draggable from "react-draggable";
import LeftComponentSidebar from "../../Components/sidebars/LeftComponentSidebar/LeftComponentSidebar";
import RightBar from "../../Components/sidebars/RightComponentSideBar/RightComponentSidebar";
import ComponentButton from "../../Components/htmlElements/button";
import ComponentImage from "../../Components/htmlElements/image";
import ComponentAlignment from "../../Components/htmlElements/alignment";
import ComponentHeader from "../../Components/htmlElements/header";
import ComponentText from "../../Components/htmlElements/text";
import ComponentCard from "../../Components/htmlElements/card";
import Default from "../../Layouts/Default/Default";
import jsonData from "../../data.json";
import { ReactSortable } from "react-sortablejs";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { login } from "../../actions/auth";
import { saveComponent } from "../../actions/component";
import { getComponent } from "../../actions/component";
import { testComponent } from "../../actions/component";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import htmlTemplates from "../../templates.json";
var htmlTemplates = require("../../templates.json");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconId: "",
      componentId: "",
      count: 10,
      leftNavBarWidth: "300px",
      rightNavBarWidth: "300px",
      activeId: "",
      data: jsonData.data,
      idList: [],
      notValidComponentId: false,
      dataLoading: true,
    };
  }

  printState = () => {
    console.log(this.state);
  };

  save = async () => {
    await this.props.saveComponent({
      componentId: "5eeb3d2054a15c6d849d09b7",
      data: JSON.stringify(this.state.data),
      idList: this.state.idList.join(","),
      count: this.state.count.toString(),
    });
    this.notify("Saved");

    // await this.props.testComponent({
    //   componentId: "5eeb3d2054a15c6d849d09b7",
    //   data: this.state.data,
    //   idList: this.state.idList.join(","),
    //   count: this.state.count.toString(),
    // });
  };

  componentDidMount = async () => {
    const res = await this.props.getComponent(this.props.match.params.id);
    console.log(res);

    if (res.error) {
      this.setState((prevState) => ({
        notValidComponentId: true,
      }));
    } else {
      var data = JSON.parse(res.data);
      var idList;

      if (res.idList === "") idList = [];
      else idList = res.idList.split(",").map(Number);

      console.log(idList);
      var count = parseInt(res.count);

      this.setState((prevState) => ({
        data: data,
        idList: idList,
        count: count,
        dataLoading: false,
      }));
    }
  };

  deleteComponent = (id) => {
    var modifiedData = this.state.data;
    var modifiedIdList = this.state.idList;

    if (modifiedData[id].childComponent === false) {
      if (!modifiedData[id].childs || modifiedData[id].childs.length == 0) {
        const index = modifiedIdList.indexOf(id);
        if (index > -1) {
          modifiedIdList.splice(index, 1);
        }
        delete modifiedData[id];
      } else if (modifiedData[id].childs.length > 0) {
        var childsArray = modifiedData[id].childs;
        for (var i = 0; i < childsArray.length; i++) {
          if (
            modifiedData[childsArray[i]].childs &&
            modifiedData[childsArray[i]].childs.length > 0
          ) {
            var childsArrayofChild = modifiedData[childsArray[i]].childs;
            for (var j = 0; j < childsArrayofChild.length; j++) {
              console.log("child of child deleted");
              delete modifiedData[childsArrayofChild[j]];
            }
          }
          console.log("child deleted");
          delete modifiedData[childsArray[i]];
        }
        const index = modifiedIdList.indexOf(id);
        if (index > -1) {
          modifiedIdList.splice(index, 1);
        }
        delete modifiedData[id];
      }
      this.setState((prevState) => ({
        data: modifiedData,
        idList: modifiedIdList,
        activeId: "",
      }));
    } else if (modifiedData[id].childComponent === true) {
      var parentId = modifiedData[id].parentComponentId;
      var childsArrayOfParent = modifiedData[parentId].childs;
      if (!modifiedData[id].childs || modifiedData[id].childs.length == 0) {
        const index = childsArrayOfParent.indexOf(id);
        if (index > -1) {
          childsArrayOfParent.splice(index, 1);
        }
        modifiedData[parentId].childs = childsArrayOfParent;
        delete modifiedData[id];
      } else if (modifiedData[id].childs.length > 0) {
        var childsArray = modifiedData[id].childs;
        for (var i = 0; i < childsArray.length; i++) {
          delete modifiedData[childsArray[i]];
        }
      }

      const index = childsArrayOfParent.indexOf(id);
      if (index > -1) {
        childsArrayOfParent.splice(index, 1);
      }
      modifiedData[parentId].childs = childsArrayOfParent;
      delete modifiedData[id];
      this.setState((prevState) => ({
        data: modifiedData,
        activeId: "",
      }));
    }
  };

  updateData = (modifiedData) => {
    this.setState((prevState) => ({
      data: modifiedData,
      componentId: "",
    }));
  };
  updateIdList = (modifiedList) => {
    this.setState((prevState) => ({
      idList: modifiedList,
      componentId: "",
    }));
  };

  updateParentStateWithChildDrop = (modifiedData) => {
    this.setState((prevState) => ({
      data: modifiedData,
      count: prevState.count + 1,
    }));
  };

  updateDataClasses = (type, value) => {
    var modifiedData = this.state.data;
    modifiedData[this.state.activeId].classes[type] = value;
    //    console.log(modifiedData[this.state.activeId]);
    this.setState({
      data: modifiedData,
    });
  };

  updateDataCSS = (type, value) => {
    var modifiedData = this.state.data;
    modifiedData[this.state.activeId].css[type] = value;
    //    console.log(modifiedData[this.state.activeId]);
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

  updateDataSrc = (src) => {
    var modifiedData = this.state.data;
    modifiedData[this.state.activeId].src = src;
    console.log(modifiedData[this.state.activeId]);
    this.setState({
      data: modifiedData,
    });
  };

  setActiveId = (id) => {
    // if statement for initial drop.
    var modifiedData = this.state.data;
    if (this.state.activeId !== "") {
      // remove previous selected component border
      modifiedData[this.state.activeId].classes.selectedeffect = "";
      //add border to new selected component
    }
    modifiedData[id].classes.selectedeffect = "Selected-Effect";

    this.setState(
      {
        activeId: id,
        rightNavBarWidth: "300px",
        data: modifiedData,
      },
      function () {
        console.log("active id : " + this.state.activeId);
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

  iconDragStart = (e) => {
    console.log(e.target.id);
    this.setState({ iconId: e.target.id }, function () {
      console.log(this.state.iconId);
    });
  };

  componentDragOver = (e) => {
    this.setState({ componentId: "" }, function () {
      console.log(this.state.componentId);
    });
  };

  componentDragStart = (e) => {
    this.setState({ componentId: e.target.id }, function () {
      console.log("component drag id : ", this.state.componentId);
    });
  };

  onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  onDrop = (e, position) => {
    e.stopPropagation();
    console.log("droppe on main body");
    htmlTemplates = require("../../templates.json");

    const iconId = this.state.iconId;
    console.log("IconId : ", iconId);
    if (iconId === "buttonIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        value: htmlTemplates["mapping"][iconId].value,
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "button";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "headerIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        value: htmlTemplates["mapping"][iconId].value,
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "header";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "textIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        value: htmlTemplates["mapping"][iconId].value,
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "text";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "imageIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        src: htmlTemplates["mapping"][iconId].src,
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "image";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "alignmentIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        childs: [...htmlTemplates["mapping"][iconId].childs],
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "alignment";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "cardIcon") {
      const template = {
        css: { ...htmlTemplates["mapping"][iconId].css },
        childs: [...htmlTemplates["mapping"][iconId].childs],
        classes: { ...htmlTemplates["mapping"][iconId].classes },
      };
      console.log("Template:", htmlTemplates["mapping"][iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "card";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    }

    if (position === "top") {
      this.setState(
        (prevState) => ({
          data: {
            ...newData,
            ...prevState.data,
          },
          count: prevState.count + 1,
          idList: [id, ...prevState.idList],
        }),
        function () {
          console.log(this.state.data);
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          data: {
            ...prevState.data,
            ...newData,
          },
          count: prevState.count + 1,
          idList: [...prevState.idList, id],
        }),
        function () {
          console.log(this.state.data);
        }
      );
    }
  };

  onbuttonClick = () => {
    console.log("button click");
  };

  onClick = (e) => {
    console.log("clicked");
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

  removeActiveId = (e) => {
    e.preventDefault();
    var modifiedData = this.state.data;
    if (this.state.activeId !== "") {
      modifiedData[this.state.activeId].classes.selectedeffect = "";
    }
    this.setState({ activeId: "" });
  };

  notify = (msg) =>
    toast(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      color: "black",
    });

  render() {
    if (this.state.notValidComponentId === true) {
      return <Redirect to="/Studio-Project" />;
    }
    return (
      <Default>
        <ToastContainer
          style={{ fontWeight: "bold", fontColor: "black" }}
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Fragment>
          {this.state.dataLoading === true ? (
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
                <Grid item xs={6} onClick={this.removeActiveId}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: "100vh" }}
                  >
                    <button onClick={this.printState}>get state</button>
                    <button onClick={this.save}>save state</button>

                    {this.state.iconId !== "" ? (
                      <CSSTransition
                        in={true}
                        appear={true}
                        timeout={2000}
                        classNames="fade-droppable-area"
                      >
                        <div
                          onDragOver={this.onDragOver}
                          onDrop={(event) => this.onDrop(event, "top")}
                          style={{
                            width: "63vh",
                            marginBottom: "10px",
                            height: "10vh",
                            maxHeight: "10vh",
                            maxWidth: "63vh",
                            textAlign: "center",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "#E6EAF1",
                            backgroundColor: "#F1F4FA",
                          }}
                        >
                          <h4 style={{ color: "#8195B8" }}>
                            {" "}
                            Drop Here, To Insert New Component At Top.{" "}
                          </h4>
                        </div>
                      </CSSTransition>
                    ) : (
                      <div
                        style={{
                          width: "63vh",
                          marginBottom: "10px",
                          height: "10vh",
                          maxHeight: "10vh",
                          maxWidth: "63vh",
                          textAlign: "center",
                        }}
                      ></div>
                    )}

                    <div
                      id={99}
                      onDragOver={this.onDragOver}
                      onDrop={(event) => this.onDrop(event, "middle")}
                      style={{
                        width: "60vh",
                        height: "70vh",
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "70vh",
                        maxWidth: "60vh",

                        backgroundColor: "#f2f2f2",
                        outlineStyle: "dotted",
                        outlineColor: "rgb(17, 82, 147)",
                        outlineOffset: "8px",
                      }}
                    >
                      {Object.keys(this.state.data).length === 0 ? (
                        <h2
                          style={{
                            textAlign: "center",
                            position: "relative",
                            top: "30vh",
                          }}
                        >
                          Drop your First Component Here!
                        </h2>
                      ) : (
                        <Fragment></Fragment>
                      )}
                      {/* <ReactSortable
                        style={{
                          width: "500px",
                          height: "500px",
                          flex: "display",
                          flexDirection: "column",
                          //maxHeight: "500px",
                          maxWidth: "500px",
                          maxWidth: "500px",
                          position: "relative",
                          backgroundColor: "white",
                          outlineStyle: "dotted",
                          outlineColor: "rgb(17, 82, 147)",
                          outlineOffset: "8px",
                        }} 
                      list={this.state.idList}
                      setList=
                      {(newState) => this.setState({ idList: newState })}>*/}
                      {this.state.idList.map((key) => {
                        if (this.state.data[key].childComponent !== true) {
                          if (this.state.data[key].type === "button") {
                            return (
                              <ComponentButton
                                id={key}
                                parentState={this.state}
                                setActiveId={this.setActiveId}
                                receivedProperties={this.state.data[key]}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          } else if (this.state.data[key].type === "image") {
                            return (
                              <ComponentImage
                                id={key}
                                parentState={this.state}
                                setActiveId={this.setActiveId}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                receivedProperties={this.state.data[key]}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          } else if (
                            this.state.data[key].type === "alignment"
                          ) {
                            return (
                              <ComponentAlignment
                                id={key}
                                setActiveId={this.setActiveId}
                                updateParentStateWithChildDrop={
                                  this.updateParentStateWithChildDrop
                                }
                                receivedProperties={this.state.data[key]}
                                updateIdList={this.updateIdList}
                                data={this.state.data}
                                parentState={this.state}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          } else if (this.state.data[key].type === "header") {
                            return (
                              <ComponentHeader
                                id={key}
                                setActiveId={this.setActiveId}
                                updateParentStateWithChildDrop={
                                  this.updateParentStateWithChildDrop
                                }
                                receivedProperties={this.state.data[key]}
                                updateIdList={this.updateIdList}
                                data={this.state.data}
                                parentState={this.state}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          } else if (this.state.data[key].type === "text") {
                            return (
                              <ComponentText
                                id={key}
                                setActiveId={this.setActiveId}
                                updateParentStateWithChildDrop={
                                  this.updateParentStateWithChildDrop
                                }
                                receivedProperties={this.state.data[key]}
                                updateIdList={this.updateIdList}
                                data={this.state.data}
                                parentState={this.state}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          } else if (this.state.data[key].type === "card") {
                            return (
                              <ComponentCard
                                id={key}
                                setActiveId={this.setActiveId}
                                updateParentStateWithChildDrop={
                                  this.updateParentStateWithChildDrop
                                }
                                receivedProperties={this.state.data[key]}
                                updateIdList={this.updateIdList}
                                data={this.state.data}
                                parentState={this.state}
                                componentDragOver={this.componentDragOver}
                                componentDragStart={this.componentDragStart}
                                updateIdList={this.updateIdList}
                                updateData={this.updateData}
                              />
                            );
                          }
                        }
                      })}{" "}
                    </div>
                    {this.state.iconId !== "" ? (
                      <CSSTransition
                        timeout={2000}
                        classNames="fade-droppable-area"
                        in={true}
                        appear={true}
                      >
                        <div
                          onDragOver={this.onDragOver}
                          onDrop={(event) => this.onDrop(event, "bottom")}
                          style={{
                            width: "63vh",
                            marginTop: "10px",
                            height: "10vh",
                            maxHeight: "10vh",
                            maxWidth: "63vh",
                            textAlign: "center",
                            borderStyle: "solid",
                            borderWidth: "2px",
                            borderColor: "#E6EAF1",
                            backgroundColor: "#F1F4FA",
                          }}
                        >
                          <h4 style={{ color: "#8195B8" }}>
                            {" "}
                            Drop Here, To Insert New Component At Bottom.{" "}
                          </h4>
                        </div>
                      </CSSTransition>
                    ) : (
                      <div
                        style={{
                          width: "63vh",
                          marginBottom: "10px",
                          height: "10vh",
                          maxHeight: "10vh",
                          maxWidth: "63vh",
                          textAlign: "center",
                        }}
                      ></div>
                    )}
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
                    updateDataSrc={this.updateDataSrc}
                    updateDataClasses={this.updateDataClasses}
                    deleteComponent={this.deleteComponent}
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

export default connect(mstp, { saveComponent, getComponent, testComponent })(
  Dashboard
);
