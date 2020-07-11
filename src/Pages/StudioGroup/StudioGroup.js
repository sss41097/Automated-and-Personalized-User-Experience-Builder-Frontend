import React, { Fragment, useState, useEffect } from "react";
import Default from "../../Layouts/Default/Default";
import appRoutes from "../../utils/routes";
import Spinner from "../../utils/spinner/spinner";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddIcon from "@material-ui/icons/Add";
import SearchBar from "@opuscapita/react-searchbar";
import "./StudioGroup.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Moment from "react-moment";
import { getAllGroups, createGroup, deleteGroup } from "../../actions/groups";
import {
  createTemplateInGroup,
  deleteTemplateInGroup,
  changeTemplateOrder,
  passTemplateInGroup,
} from "../../actions/templates";

import {
  getAllProjects,
  createProject,
  deleteProject,
} from "../../actions/projects";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import LoadingOverlay from "react-loading-overlay";
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import DialogTitle from "@material-ui/core/DialogTitle";

var drawerWidth = false;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "170px",
    height: "100%",
  },
  rootCard: {
    width: "100%",
    minHeight: "170px",
    height: "100%",
  },
  rootDrawer: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaperFalse: {
    width: 270,
    overflowX: "hidden",
    marginLeft: "50px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: 700,
    }),
  },
  drawerPaperTrue: {
    width: 30,
    overflowX: "hidden",

    marginLeft: "50px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: 700,
    }),
  },
  arrowIconFalse: {
    transform: "rotate(180deg)",
    marginTop: "20px",
    marginLeft: "225px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: 700,
    }),
    "&:hover": {
      cursor: "pointer",
    },
  },
  arrowIconTrue: {
    marginTop: "20px",
    marginLeft: "5px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: 700,
    }),
    "&:hover": {
      cursor: "pointer",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  media: {
    height: 140,
  },
}));

const StudioGroups = ({
  auth,
  projects,
  groups,
  getAllGroups,
  getAllProjects,
  createGroup,
  deleteGroup,
  createTemplateInGroup,
  deleteTemplateInGroup,
  changeTemplateOrder,
  passTemplateInGroup,
  history,
  match,
  window,
}) => {
  var currentProjectDetails = {};

  for (var i = 0; i < projects.projects.length; i++) {
    console.log(projects.projects[i]);
    if (projects.projects[i]["_id"] === match.params.id) {
      currentProjectDetails = projects.projects[i];
      break;
    }
  }

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // group add, delete states
  const [openAddGroupDialog, setopenAddGroupDialog] = useState(false);
  const [openDeleteGroupDialog, setopenDeleteGroupDialog] = useState(false);
  const [
    openPassThroughGroupsDialog,
    setopenPassThroughGroupsDialog,
  ] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [clickedGroupId, setClickedGroupId] = useState("");

  // template add, delete states
  const [templateList, setTemplateList] = useState([]);
  const [openAddTemplateDialog, setopenAddTemplateDialog] = useState(false);
  const [openDeleteTemplateDialog, setopenDeleteTemplateDialog] = useState(
    false
  );
  const [newTemplateName, setNewTemplateName] = useState("");
  const [clickedTemplateId, setClickedTemplateId] = useState("");
  const [draggedTemplateId, setDraggedTemplateId] = useState("");

  const [queryLoading, setQueryLoading] = useState(false);
  const [arrowClick, setArrowClick] = useState(false);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div
        style={{
          width: "100%",
          marginTop: "-20px",
          marginBottom: "30px",
          marginLeft: "10px",
        }}
      >
        <br />
        <Typography variant="p" style={{ fontWeight: "bold" }}>
          {groups.groups.length + " Groups"}
        </Typography>
        <br />
      </div>
      <Divider />
      <List
        style={{
          cursor: "pointer",
        }}
      >
        <ListItem
          selected={clickedGroupId === "" ? true : false}
          button
          onClick={(e) => handleAllTemplates()}
          style={{
            fontWeight: "bold",
            borderTopRightRadius: "23px",
            borderBottomRightRadius: "23px",
            right: "5px",
          }}
        >
          All Templates
        </ListItem>
      </List>

      <Divider />
      <br />
      <Typography
        variant="p"
        style={{ fontWeight: "bold", marginLeft: "12px" }}
      >
        Group List
      </Typography>
      <Tooltip title="Add Group">
        <div className="AddIcon" onClick={(e) => handleOpenAddGroupDialog()}>
          <AddIcon />
          <br />
        </div>
      </Tooltip>
      {groups.groups.length === 0 ? (
        <Fragment>
          <br />
          <br />
          <Empty description={<p>No Groups Created.</p>} />
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
      <List>
        {groups.groups.map((group) => (
          <ListItem
            selected={group._id === clickedGroupId ? true : false}
            button
            style={{
              fontWeight: "bold",
              borderTopRightRadius: "23px",
              borderBottomRightRadius: "23px",
              right: "5px",
            }}
            onClick={(e) => handleListItemClick(group._id)}
            key={group._id}
            id={group._id}
          >
            <ListItemText primary={group.name} />

            <div
              className="DeleteIcon"
              id={group._id}
              style={{ zIndex: "111" }}
              onClick={(e) => handleOpenDeleteGroupDialog(e)}
            >
              <Tooltip title="Delete Group">
                <DeleteIcon
                  id={group._id}
                  onClick={(e) => handleOpenDeleteGroupDialog(group._id)}
                ></DeleteIcon>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleListItemClick = (groupId) => {
    setClickedGroupId(groupId);
    for (var i = 0; i < groups.groups.length; i++) {
      if (groups.groups[i]._id === groupId) {
        setTemplateList(groups.groups[i].templateList);
        break;
      }
    }
  };

  const handleAllTemplates = () => {
    setClickedGroupId("");
    let allTemplates = [];
    let uniqueTemplates = {};
    for (var i = 0; i < groups.groups.length; i++) {
      for (var j = 0; j < groups.groups[i].templateList.length; j++) {
        if (!uniqueTemplates[groups.groups[i].templateList[j].templateId]) {
          uniqueTemplates[groups.groups[i].templateList[j].templateId] = 1;
          allTemplates = [...allTemplates, groups.groups[i].templateList[j]];
        }
      }
    }
    setTemplateList(allTemplates);
  };

  const handleOpenPassThroughGroupsDialog = (e, templateId) => {
    e.stopPropagation();
    setClickedTemplateId(templateId);
    setopenPassThroughGroupsDialog(true);
  };

  const handleClosePassThroughGroupsDialog = (e) => {
    setopenPassThroughGroupsDialog(false);
  };

  const handleOpenAddTemplateDialog = () => {
    setopenAddTemplateDialog(true);
  };

  const handleCloseAddTemplateDialog = () => {
    setopenAddTemplateDialog(false);
  };

  const handleOpenDeleteTemplateDialog = (e, TemplateId) => {
    e.stopPropagation();
    setClickedTemplateId(TemplateId);
    setopenDeleteTemplateDialog(true);
  };

  const handleCloseDeleteTemplateDialog = () => {
    setopenDeleteTemplateDialog(false);
  };

  const handleCreateTemplate = async () => {
    setQueryLoading(true);
    var groupName = "";
    for (var i = 0; i < groups.groups.length; i++) {
      if (groups.groups[i]._id === clickedGroupId) {
        groupName = groups.groups[i].name;
      }
    }
    const res = await createTemplateInGroup(
      clickedGroupId,
      match.params.id,
      newTemplateName,
      groupName
    );
    if (!res.error) {
      history.push("/studio/" + res.data.template._id);
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };

  const handleDeleteTemplate = async (templateId) => {
    setQueryLoading(true);
    console.log("selected Template id : ", clickedTemplateId);
    const res = await deleteTemplateInGroup(
      clickedTemplateId,
      clickedGroupId,
      match.params.id
    );
    console.log(res);
    if (!res.error) {
      openNotification("TEMPLATE DELETED");
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i]._id === clickedGroupId) {
          setTemplateList(res.data[i].templateList);
          break;
        }
      }
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };

  const handleOpenAddGroupDialog = () => {
    setopenAddGroupDialog(true);
  };

  const handleCloseAddGroupDialog = () => {
    setopenAddGroupDialog(false);
  };

  const handleOpenDeleteGroupDialog = (groupId) => {
    setClickedGroupId(groupId);
    console.log("clicked Group id : ", clickedGroupId);

    setopenDeleteGroupDialog(true);
  };

  const handleCloseDeleteGroupDialog = () => {
    setopenDeleteGroupDialog(false);
  };

  const handleCreateGroup = async () => {
    setQueryLoading(true);
    const res = await createGroup(match.params.id, newGroupName);
    console.log(res);
    if (!res.error) {
      openNotification("GROUP ADDED");
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };
  const openNotification = (msg) => {
    notification.open({
      message: msg,
      placement: "topRight",
      duration: 2,
      icon: <ExclamationCircleOutlined style={{ color: "blue" }} />,
    });
  };

  const handlePassTemplateInGroup = async (
    clickedTemplateId,
    clickedGroupId,
    groupId,
    projectId
  ) => {
    setQueryLoading(true);
    const res = await passTemplateInGroup(
      clickedTemplateId,
      clickedGroupId,
      groupId,
      projectId
    );
    console.log("respond from passTemplaateinGroup : ", res);
    if (!res.error) {
      openNotification("PASSED TO GROUP.");
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i]._id === clickedGroupId) {
          setTemplateList(res.data[i].templateList);
          break;
        }
      }
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };

  const handleDeleteGroup = async () => {
    setQueryLoading(true);
    console.log("selected group id : ", clickedGroupId);
    const res = await deleteGroup(clickedGroupId, match.params.id);
    console.log(res);
    if (!res.error) {
      openNotification("GROUP DELETED");
      setTemplateList([]);
      setClickedGroupId("");
      setClickedTemplateId("");
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };

  const handleChipClick = (e, groupId) => {
    e.stopPropagation();
    setClickedGroupId(groupId);
    for (var i = 0; i < groups.groups.length; i++) {
      if (groups.groups[i]._id === groupId) {
        setTemplateList(groups.groups[i].templateList);
        break;
      }
    }
  };

  const templatetDragStart = (id) => {
    console.log("dragged template Id : ", id);
    setDraggedTemplateId(id);
  };

  const templatetDragOver = (e) => {};

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = async (e, droppedOnTemplateId) => {
    e.stopPropagation();
    console.log("TemplateList : ", templateList);
    console.log("Dropped on id : ", droppedOnTemplateId);
    let indexDragged;
    let indexDropped;
    let tempList = templateList;
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].templateId === droppedOnTemplateId) {
        indexDropped = i;
      }
      if (tempList[i].templateId === draggedTemplateId) {
        indexDragged = i;
      }
    }
    const res = await changeTemplateOrder(
      groups.groups,
      clickedGroupId,
      match.params.id,
      indexDropped,
      indexDragged
    );

    console.log(res);
    if (!res.error) {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i]._id === clickedGroupId) {
          setTemplateList(res.data[i].templateList);
          break;
        }
      }
    } else {
      openNotification(res.error);
    }
  };

  useEffect(() => {
    console.log("match params id : ", match.params.id);
    getAllGroups(match.params.id);
    if (projects.loading === true) {
      getAllProjects();
    }
    setClickedGroupId("");
    let allTemplates = [];
    setTemplateList([]);
    let uniqueTemplates = {};
    for (var i = 0; i < groups.groups.length; i++) {
      for (var j = 0; j < groups.groups[i].templateList.length; j++) {
        if (!uniqueTemplates[groups.groups[i].templateList[j].templateId]) {
          uniqueTemplates[groups.groups[i].templateList[j].templateId] = 1;
          allTemplates = [...allTemplates, groups.groups[i].templateList[j]];
        }
      }
    }
    setTemplateList(allTemplates);
  }, [auth.isAuthenticated, groups.loading]);

  const handleArrowClick = (e) => {
    console.log("arrow click");
    setArrowClick(!arrowClick);
  };

  const handleSearchBar = (e) => {
    var searchName = e.target.value;
    var templateList = [];
    if (clickedGroupId === "") {
      let uniqueTemplates = {};
      for (var i = 0; i < groups.groups.length; i++) {
        for (var j = 0; j < groups.groups[i].templateList.length; j++) {
          if (!uniqueTemplates[groups.groups[i].templateList[j].templateId]) {
            uniqueTemplates[groups.groups[i].templateList[j].templateId] = 1;
            templateList = [...templateList, groups.groups[i].templateList[j]];
          }
        }
      }
    } else {
      for (var i = 0; i < groups.groups.length; i++) {
        if (groups.groups[i]._id.toString() === clickedGroupId.toString()) {
          templateList = groups.groups[i].templateList;
        }
      }
    }

    var filteredTemplateList = [];

    filteredTemplateList = templateList.filter((template) => {
      return template.name.toLowerCase().startsWith(searchName.toLowerCase());
    });
    setTemplateList(filteredTemplateList);
  };

  const handleGoToTemplate = async (templateId) => {
    history.push("/studio/" + templateId);
  };
  if (auth.loading === false) {
    if (
      auth.isAuthenticated === false ||
      auth.isFirstProjectCreated === false ||
      auth.isEmailVerified === false
    ) {
      return <Redirect to={appRoutes.homePage} />;
    }
  }
  return (
    <Default>
      <Fragment>
        {auth.loading === true || groups.loading === true ? (
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
          <CSSTransition
            in={true}
            appear={true}
            timeout={2500}
            classNames="fade"
          >
            <LoadingOverlay active={queryLoading} spinner text="">
              <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                  transitionDuration={2000}
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === "rtl" ? "right" : "left"}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper:
                      arrowClick === false
                        ? classes.drawerPaperFalse
                        : classes.drawerPaperTrue,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {arrowClick === false ? drawer : ""}
                </Drawer>

                <Drawer
                  transitionDuration={2000}
                  classes={{
                    paper:
                      arrowClick === false
                        ? classes.drawerPaperFalse
                        : classes.drawerPaperTrue,
                  }}
                  variant="permanent"
                  open
                >
                  <ArrowForwardIosIcon
                    onClick={(e) => handleArrowClick(e)}
                    className={
                      arrowClick === false
                        ? classes.arrowIconFalse
                        : classes.arrowIconTrue
                    }
                  />

                  {arrowClick === false ? drawer : ""}
                </Drawer>
              </nav>

              <div style={{ height: "100vh", width: "100%" }}>
                <Grid container spacing={0}>
                  <Grid item xs={1} sm={3}></Grid>

                  <Grid item xs={10} sm={8}>
                    <div style={{ height: "10vh" }}></div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <div class="searchbar">
                        <input
                          class="search_input"
                          onChange={(e) => handleSearchBar(e)}
                          type="text"
                          name="search"
                          placeholder="Search Template..."
                        />
                      </div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                    <div style={{ float: "left", display: "inline" }}>
                      <Typography variant="h4" style={{ fontWeight: "bold" }}>
                        {currentProjectDetails.name}
                      </Typography>
                    </div>
                    <div style={{ float: "right", marginRight: "20px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon />}
                        style={{ fontWeight: "bold" }}
                        disabled={clickedGroupId === "" ? true : false}
                        onClick={(e) => handleOpenAddTemplateDialog()}
                      >
                        Create Template
                      </Button>
                      <br />
                    </div>
                    <br />

                    {templateList.length === 0 ? (
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ height: "100%" }}
                      >
                        <Empty
                          style={{}}
                          description={<p>No Templates to Show.</p>}
                        />
                      </Grid>
                    ) : (
                      <Grid container spacing={4}>
                        {templateList.map((template) => {
                          return (
                            <Grid item xs={12} sm={6} md={4}>
                              <ButtonBase
                                onClick={(e) =>
                                  handleGoToTemplate(template.templateId)
                                }
                                style={{ width: "90%", height: "100%" }}
                              >
                                <Card
                                  onClick={(e) =>
                                    handleGoToTemplate(template.templateId)
                                  }
                                  draggable={
                                    clickedGroupId === "" ? false : true
                                  }
                                  onDragStart={(event) =>
                                    templatetDragStart(template.templateId)
                                  }
                                  onDragOver={(event) =>
                                    templatetDragOver(template.templateId)
                                  }
                                  onDrop={(event) =>
                                    onDrop(event, template.templateId)
                                  }
                                  onDragOver={(event) => onDragOver(event)}
                                  className={classes.root}
                                  style={{
                                    boxShadow: "0px 0px 5px 5px #e3e6e8",
                                  }}
                                >
                                  <CardMedia
                                    onClick={(e) =>
                                      handleGoToTemplate(template.templateId)
                                    }
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&w=1000&q=80"
                                    title="Contemplative Reptile"
                                  />
                                  <CardContent
                                    onClick={(e) =>
                                      handleGoToTemplate(template.templateId)
                                    }
                                  >
                                    <Typography
                                      variant="h6"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {template.name}
                                    </Typography>
                                  </CardContent>
                                  {clickedGroupId === "" ? (
                                    <Fragment></Fragment>
                                  ) : (
                                    <Divider
                                      onClick={(e) =>
                                        handleGoToTemplate(template.templateId)
                                      }
                                      id={template.templateId}
                                      style={{
                                        marginLeft: "20%",
                                        width: "60%",
                                      }}
                                    />
                                  )}
                                  <CardActions
                                    id={template.templateId}
                                    style={{ justifyContent: "center" }}
                                  >
                                    {clickedGroupId === "" ? (
                                      <Fragment></Fragment>
                                    ) : (
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <Tooltip title="Pass Through Groups">
                                          <CallSplitIcon
                                            className="PassThroughGroupsIcon"
                                            id={template.templateId}
                                            color="secondary"
                                            onClick={(e) =>
                                              handleOpenPassThroughGroupsDialog(
                                                e,
                                                template.templateId
                                              )
                                            }
                                          ></CallSplitIcon>
                                        </Tooltip>
                                        <Tooltip title="Delete Template">
                                          <DeleteIcon
                                            className="DeleteIcon"
                                            id={template.templateId}
                                            color="secondary"
                                            onClick={(e) =>
                                              handleOpenDeleteTemplateDialog(
                                                e,
                                                template.templateId
                                              )
                                            }
                                          ></DeleteIcon>
                                        </Tooltip>
                                      </div>
                                    )}
                                  </CardActions>
                                  <div className="ChipScroll">
                                    &nbsp;
                                    {template.groupList &&
                                    template.groupList.length !== 0 ? (
                                      template.groupList.map((inGroup) => {
                                        return (
                                          <Fragment>
                                            <Chip
                                              style={{ minWidth: "80px" }}
                                              label={inGroup.name}
                                              onClick={(e) =>
                                                handleChipClick(
                                                  e,
                                                  inGroup.groupId
                                                )
                                              }
                                              clickable
                                            />
                                            &nbsp;
                                          </Fragment>
                                        );
                                      })
                                    ) : (
                                      <Fragment></Fragment>
                                    )}
                                  </div>
                                </Card>
                              </ButtonBase>
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={1} sm={1}></Grid>
                </Grid>
                <Dialog
                  open={openAddGroupDialog}
                  onClose={handleCloseAddGroupDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Enter Group Name:
                    </Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Name"
                      name="groupname"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseAddGroupDialog} color="primary">
                      CANCEL
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseAddGroupDialog();
                        handleCreateGroup();
                      }}
                      color="primary"
                    >
                      SUBMIT
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openDeleteGroupDialog}
                  onClose={handleCloseDeleteGroupDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Are you sure ?
                    </Typography>
                    <Typography variant="p">
                      This group will be permanently deleted.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseDeleteGroupDialog}
                      color="primary"
                    >
                      RETURN
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseDeleteGroupDialog();
                        handleDeleteGroup();
                      }}
                      color="primary"
                    >
                      PROCEED
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openAddTemplateDialog}
                  onClose={handleCloseAddTemplateDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Enter Template Name:
                    </Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Name"
                      name="templatename"
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseAddTemplateDialog}
                      color="primary"
                    >
                      CANCEL
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseAddTemplateDialog();
                        handleCreateTemplate();
                      }}
                      color="primary"
                    >
                      SUBMIT
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openDeleteTemplateDialog}
                  onClose={handleCloseDeleteTemplateDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Are you sure ?
                    </Typography>
                    <Typography variant="p">
                      This Template will be permanently deleted.
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseDeleteTemplateDialog}
                      color="primary"
                    >
                      RETURN
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseDeleteTemplateDialog();
                        handleDeleteTemplate();
                      }}
                      color="primary"
                    >
                      PROCEED
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openPassThroughGroupsDialog}
                  onClose={handleClosePassThroughGroupsDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Choose Group To Which You Want To Add This Template:
                    </Typography>
                    {groups.groups.map((group) =>
                      group._id !== clickedGroupId ? (
                        <ListItem
                          button
                          onClick={() => {
                            handleClosePassThroughGroupsDialog();
                            handlePassTemplateInGroup(
                              clickedTemplateId,
                              clickedGroupId,
                              group._id,
                              match.params.id
                            );
                          }}
                          key={group._id}
                        >
                          <ListItemText primary={group.name} />
                        </ListItem>
                      ) : (
                        <Fragment></Fragment>
                      )
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={(e) => handleClosePassThroughGroupsDialog()}
                      color="primary"
                    >
                      RETURN
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </LoadingOverlay>
          </CSSTransition>
        )}
      </Fragment>
    </Default>
  );
};

const mstp = (state) => ({
  auth: state.auth,
  groups: state.groups,
  projects: state.projects,
});

export default connect(mstp, {
  getAllGroups,
  createGroup,
  deleteGroup,
  getAllProjects,
  createTemplateInGroup,
  deleteTemplateInGroup,
  changeTemplateOrder,
  passTemplateInGroup,
})(StudioGroups);
