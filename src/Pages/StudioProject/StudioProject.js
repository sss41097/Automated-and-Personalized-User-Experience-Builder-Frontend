import React, { Fragment, useState, useEffect } from "react";
import Default from "../../Layouts/Default/Default";
import appRoutes from "../../utils/routes";
import Spinner from "../../utils/spinner/spinner";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddIcon from "@material-ui/icons/Add";
import SearchBar from "@opuscapita/react-searchbar";
import "./StudioProject.css";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getAllProjects,
  createProject,
  deleteProject,
  unloadProjects,
} from "../../actions/projects";
import { unloadGroups } from "../../actions/groups";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingOverlay from "react-loading-overlay";
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "170px",
    height: "100%",
  },
});

const StudioProject = ({
  auth,
  projects,
  unloadProjects,
  getAllProjects,
  createProject,
  unloadGroups,
  deleteProject,
  history,
}) => {
  const classes = useStyles();
  const [openAddProjectDialog, setopenAddProjectDialog] = useState(false);
  const [openDeleteProjectDialog, setopenDeleteProjectDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [clickedProjectId, setClickedProjectId] = useState("");
  const [queryLoading, setQueryLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);

  const handleOpenAddProjectDialog = () => {
    setopenAddProjectDialog(true);
  };

  const handleCloseAddProjectDialog = () => {
    setopenAddProjectDialog(false);
  };

  const handleOpenDeleteProjectDialog = (e, projectId) => {
    setClickedProjectId(projectId);
    console.log("clicked project id : ", projectId);

    setopenDeleteProjectDialog(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleCloseDeleteProjectDialog = () => {
    setopenDeleteProjectDialog(false);
  };

  const handleCreateProject = async () => {
    setQueryLoading(true);
    const res = await createProject(newProjectName);
    console.log(res);
    if (!res.error) {
      setProjectList(res.data);
      openNotification("PROJECT ADDED");
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

  const handleDeleteProject = async () => {
    setQueryLoading(true);

    const res = await deleteProject(clickedProjectId);
    console.log(res);
    if (!res.error) {
      openNotification("PROJECT DELETED");
      setProjectList(res.data);
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };

  const handleGoToGroups = async (e) => {
    history.push("/project/" + e.target.id);
  };

  const handleSearchBar = (e) => {
    var searchName = e.target.value;
    var filteredProjectList = [];

    filteredProjectList = projects.projects.filter((project) => {
      return project.name.toLowerCase().startsWith(searchName.toLowerCase());
    });
    setProjectList(filteredProjectList);
  };

  useEffect(() => {
    unloadGroups();
    getAllProjects();
    setProjectList(projects.projects);
  }, [auth.isAuthenticated, projects.loading]);

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
        {auth.loading === true || projects.loading === true ? (
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
              <div style={{ height: "100vh", width: "100%" }}>
                <Grid container spacing={0}>
                  <Grid item xs={1} sm={2}></Grid>

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
                          type="text"
                          onChange={(e) => handleSearchBar(e)}
                          name="search"
                          placeholder="Search Projects..."
                        />
                      </div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                    <div style={{ float: "right", marginRight: "30px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<AddIcon />}
                        style={{ fontWeight: "bold" }}
                        onClick={(e) => handleOpenAddProjectDialog()}
                      >
                        Create Project
                      </Button>
                      <br />
                    </div>
                    {projects.projects.length === 0 ? (
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
                          description={<p>No Projects to Show.</p>}
                        />
                      </Grid>
                    ) : (
                      <Fragment></Fragment>
                    )}
                    <Grid container spacing={4}>
                      {projectList.map((project) => {
                        return (
                          <Grid item id={project._id} xs={12} sm={6} md={4}>
                            <ButtonBase
                              id={project._id}
                              onClick={(e) => handleGoToGroups(e)}
                              style={{ width: "90%", height: "100%" }}
                            >
                              <Card
                                id={project._id}
                                className={classes.root}
                                style={{ boxShadow: "0px 0px 5px 5px #e3e6e8" }}
                              >
                                <CardContent id={project._id}>
                                  <Typography
                                    id={project._id}
                                    variant="h6"
                                    onClick={(e) => handleGoToGroups(e)}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {project.name}
                                  </Typography>
                                  <br />
                                  <Typography
                                    variant="p"
                                    id={project._id}
                                    onClick={(e) => handleGoToGroups(e)}
                                    style={{
                                      fontWeight: "bold",
                                      color: "grey",
                                    }}
                                  >
                                    Total Groups : {project.groupCount}
                                  </Typography>
                                  <br />
                                  <Typography
                                    id={project._id}
                                    onClick={(e) => handleGoToGroups(e)}
                                    variant="p"
                                    style={{
                                      fontWeight: "bold",
                                      color: "grey",
                                    }}
                                  >
                                    Last Modified :{" "}
                                    <Moment fromNow ago>
                                      {project.updatedAt}
                                    </Moment>
                                  </Typography>
                                </CardContent>

                                <Divider
                                  id={project._id}
                                  style={{
                                    marginLeft: "20%",
                                    width: "60%",
                                  }}
                                />

                                <CardActions
                                  id={project._id}
                                  style={{ justifyContent: "center" }}
                                >
                                  <Tooltip title="Delete Group">
                                    <DeleteIcon
                                      className="DeleteIcon"
                                      id={project._id}
                                      color="secondary"
                                      onClick={(e) =>
                                        handleOpenDeleteProjectDialog(
                                          e,
                                          project._id
                                        )
                                      }
                                    ></DeleteIcon>
                                  </Tooltip>
                                </CardActions>
                              </Card>
                            </ButtonBase>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid iteme xs={1} sm={2}></Grid>
                </Grid>
                <Dialog
                  open={openAddProjectDialog}
                  onClose={handleCloseAddProjectDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Enter Project Name:
                    </Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Name"
                      name="projectname"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      type="text"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseAddProjectDialog}
                      color="primary"
                    >
                      CANCEL
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseAddProjectDialog();
                        handleCreateProject();
                      }}
                      color="primary"
                    >
                      SUBMIT
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={openDeleteProjectDialog}
                  onClose={handleCloseDeleteProjectDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Are you sure ?
                    </Typography>
                    <Typography variant="p">
                      This will delete all groups and templates associated with
                      this project
                    </Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseDeleteProjectDialog}
                      color="primary"
                    >
                      RETURN
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleCloseDeleteProjectDialog();
                        handleDeleteProject();
                      }}
                      color="primary"
                    >
                      PROCEED
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
  projects: state.projects,
});

export default connect(mstp, {
  getAllProjects,
  createProject,
  deleteProject,
  unloadGroups,
  unloadProjects,
})(StudioProject);
