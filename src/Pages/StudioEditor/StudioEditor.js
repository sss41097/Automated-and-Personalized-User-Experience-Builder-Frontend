import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Spinner from "../../utils/spinner/spinner";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./StudioEditor.css";
import LeftComponentSidebar from "../../Components/sidebars/LeftComponentSidebar/LeftComponentSidebar";
import RightBar from "../../Components/sidebars/RightComponentSideBar/RightComponentSidebar";
import ComponentButton from "../../Components/htmlElements/button";
import ComponentImage from "../../Components/htmlElements/image";
import ComponentAlignment from "../../Components/htmlElements/alignment";
import ComponentHeader from "../../Components/htmlElements/header";
import ComponentText from "../../Components/htmlElements/text";
import ComponentCard from "../../Components/htmlElements/card";
import ComponentSlideshow from "../../Components/htmlElements/slideshow";
import ComponentVideo from "../../Components/htmlElements/video";
import Default from "../../Layouts/Default/Default";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getAllComponentTemplates } from "../../actions/componentTemplate";
import { saveTemplate, getTemplate } from "../../actions/templates";
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LoadingOverlay from "react-loading-overlay";
import appRoutes from "../../utils/routes";

var htmlTemplates;

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
      data: {},
      idList: [],
      notValidComponentId: false,
      dataLoading: true,
      queryLoading: false,
      toolTip: false,
      overLay: false,
      identifier: "",
    };
    this.myRef = React.createRef();
  }

  changeLayout = (tooltip, overlay) => {
    this.setState((prevState) => ({
      toolTip: tooltip,
      overLay: overlay,
    }));
  };

  deleteImageFromSlideShow = (id, index) => {
    let modifiedData = this.state.data;
    if (modifiedData[id]["images"].length === 1) {
      this.openNotification("SLIDESHOW NEED TO CONTAIN ONE IMAGE");
      return;
    }
    modifiedData[id]["images"].splice(index, 1);
    modifiedData[id]["displays"].splice(index, 1);
    for (let i = 1; i < modifiedData[id]["displays"].length; i++) {
      modifiedData[id]["displays"][i] = "none";
    }
    modifiedData[id]["displays"][0] = "block";
    console.log(modifiedData[id]["displays"]);

    this.setState((prevState) => ({
      data: modifiedData,
    }));
  };

  addImageToSlideShow = (id, url) => {
    let modifiedData = this.state.data;
    console.log(modifiedData[id]);
    modifiedData[id]["images"].push(url);
    modifiedData[id]["displays"].push("none");
    console.log(modifiedData[id]["images"]);
    this.setState((prevState) => ({
      data: modifiedData,
    }));
  };

  changeImage = (id, url) => {
    let modifiedData = this.state.data;
    modifiedData[id]["src"] = url;
    this.setState((prevState) => ({
      data: modifiedData,
    }));
  };

  setQueryLoading = (value) => {
    this.setState(
      (prevState) => ({
        queryLoading: value,
      }),
      () => {
        console.log(this.state.queryLoading);
      }
    );
  };

  openNotification = (msg) => {
    notification.open({
      message: msg,
      placement: "topRight",
      duration: 2,
      icon: <ExclamationCircleOutlined style={{ color: "blue" }} />,
    });
  };

  printState = () => {
    console.log(this.state);
  };

  changeSlideNumber = async (id, slideNumber) => {
    console.log(slideNumber);
    var modifiedData = this.state.data;
    for (var i = 0; i < modifiedData[id]["displays"].length; i++) {
      modifiedData[id]["displays"][i] = "none";
    }
    modifiedData[id]["displays"][slideNumber] = "block";
    console.log(modifiedData[id]["displays"]);

    this.setState({
      data: modifiedData,
    });
  };

  save = async () => {
    this.setQueryLoading(true);
    var DOMString =
      '<div class="SuperParentComponent">' +
      this.myRef.current.innerHTML.split('draggable="true"').join("") +
      "</div>";
    DOMString = DOMString.split('"').join("'");
    console.log(DOMString);
    await this.props.saveTemplate({
      templateId: this.props.match.params.id,
      data: this.state.data,
      idList: this.state.idList.join(","),
      count: this.state.count.toString(),
      toolTip: this.state.toolTip === true ? "true" : "false",
      overLay: this.state.overLay === true ? "true" : "false",
      DOMString: DOMString,
    });
    this.openNotification("COMPONENT SAVED!");
    this.setQueryLoading(false);
  };

  componentDidMount = async () => {
    this.setQueryLoading(true);

    let res = await this.props.getAllComponentTemplates();
    htmlTemplates = res.data.componentTemplates;
    console.log(htmlTemplates);

    res = await this.props.getTemplate(this.props.match.params.id);
    console.log("returned data : ", res);
    if (res.error) {
      this.setState((prevState) => ({
        notValidComponentId: true,
      }));
    } else {
      var structuredData = res.data.data;

      var data = {};
      for (var i = 0; i < structuredData.length; i++) {
        data[structuredData[i].id] = {
          classes: structuredData[i].classes,
          src: structuredData[i].src,
          value: structuredData[i].value,
          css: structuredData[i].css,
          type: structuredData[i].type,
          childComponent: structuredData[i].childComponent,
          css: structuredData[i].css,
          childs: structuredData[i].childs,
          parentComponentId: structuredData[i].parentComponentId,
          displays: structuredData[i].displays,
          images: structuredData[i].images,
        };
      }
      console.log("data : ", data);
      var idList;

      if (res.data.idList === "") idList = [];
      else idList = res.data.idList.split(",").map(Number);

      console.log(idList);
      var count = parseInt(res.data.count);
      console.log("data : ", data);
      console.log("idList : ", idList);
      console.log("count : ", count);
      this.setState((prevState) => ({
        data: data,
        idList: idList,
        count: count,
        toolTip: res.data.toolTip === "true",
        overLay: res.data.overLay === "true",
        dataLoading: false,
        identifier: res.data.identifier,
      }));
    }
    this.setQueryLoading(false);
  };

  deleteComponent = (id) => {
    console.log("Deleting ID : ", id);
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
      leftNavBarWidth: "40px",
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

    const iconId = this.state.iconId;
    console.log("IconId : ", iconId);
    if (iconId === "buttonIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "button";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "headerIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "header";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "textIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        value: htmlTemplates[iconId].value,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "text";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "imageIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        src: htmlTemplates[iconId].src,
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "image";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "alignmentIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        childs: [...htmlTemplates[iconId].childs],
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "alignment";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "cardIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        childs: [...htmlTemplates[iconId].childs],
        classes: { ...htmlTemplates[iconId].classes },
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "card";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "slideshowIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        classes: { ...htmlTemplates[iconId].classes },
        images: [...htmlTemplates[iconId].images],
        displays: [...htmlTemplates[iconId].displays],
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "slideshow";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else if (iconId === "videoIcon") {
      const template = {
        css: { ...htmlTemplates[iconId].css },
        classes: { ...htmlTemplates[iconId].classes },

        src: htmlTemplates[iconId].src,
      };
      console.log("Template:", htmlTemplates[iconId]);
      var id = this.state.count;
      var newData = {};
      newData[id] = template;
      newData[id].type = "video";
      newData[id].childComponent = false;
      //console.log("New Data before update : ", newData);
    } else {
      return;
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

  removeActiveId = (e) => {
    e.preventDefault();
    var modifiedData = this.state.data;
    if (this.state.activeId !== "") {
      modifiedData[this.state.activeId].classes.selectedeffect = "";
    }
    this.setState({ activeId: "" });
  };

  render() {
    if (this.state.notValidComponentId === true) {
      return <Redirect to="/Projects" />;
    }

    if (this.props.auth.loading === false) {
      if (
        this.props.auth.isAuthenticated === false ||
        this.props.auth.isFirstProjectCreated === false ||
        this.props.auth.isEmailVerified === false
      ) {
        return <Redirect to={appRoutes.homePage} />;
      }
    }

    return (
      <Default>
        <Fragment>
          {this.state.dataLoading === true ||
          this.props.auth.loading === true ? (
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Spinner />
            </Grid>
          ) : (
            <LoadingOverlay active={this.state.queryLoading} spinner text="">
              <Fragment>
                <LeftComponentSidebar
                  closeNav={this.closeLeftNav.bind(this)}
                  openNav={this.openLeftNav.bind(this)}
                  leftNavBarWidth={this.state.leftNavBarWidth}
                  iconDragStart={this.iconDragStart.bind(this)}
                  iconDragOver={this.iconDragOver.bind(this)}
                  changeLayout={this.changeLayout.bind(this)}
                  identifier={this.state.identifier}
                  toolTip={this.state.toolTip}
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
                        id="1"
                        ref={this.myRef}
                        onDragOver={this.onDragOver}
                        onDrop={(event) => this.onDrop(event, "middle")}
                        className="SuperParentComponent"
                      >
                        {Object.keys(this.state.idList).length === 0 ? (
                          <h2
                            style={{
                              textAlign: "center",
                              position: "relative",
                              top: "30vh",
                            }}
                          >
                            Drop your First Component Here !
                          </h2>
                        ) : (
                          <Fragment></Fragment>
                        )}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
                                />
                              );
                            } else if (
                              this.state.data[key].type === "slideshow"
                            ) {
                              return (
                                <ComponentSlideshow
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
                                />
                              );
                            } else if (this.state.data[key].type === "video") {
                              return (
                                <ComponentVideo
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
                                  changeSlideNumber={this.changeSlideNumber}
                                  htmlTemplates={htmlTemplates}
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
                      setQueryLoading={this.setQueryLoading}
                      addImageToSlideShow={this.addImageToSlideShow}
                      deleteImageFromSlideShow={this.deleteImageFromSlideShow}
                      changeImage={this.changeImage}
                    />
                  </Grid>
                </Grid>
              </Fragment>
            </LoadingOverlay>
          )}
        </Fragment>
      </Default>
    );
  }
}
const mstp = (state) => ({
  auth: state.auth,
});

export default connect(mstp, {
  saveTemplate,
  getTemplate,
  getAllComponentTemplates,
})(Dashboard);
