import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Hidden } from "@material-ui/core";
import OnboardStage1 from "./onboardStage1";
import OnboardStage2 from "./onboardStage2";
import OnboardStage3 from "./onboardStage3";
import { register, socialLogin } from "../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../../utils/spinner/spinner";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { sendVerifyEmail } from "../../actions/auth";
import { createFirstProject } from "../../actions/auth";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Anonymous from "../../Layouts/Anonymous/Anonymous";
import "./Register.css";
import LoadingOverlay from "react-loading-overlay";
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import appRoutes from "../../utils/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  sideBar: {
    backgroundColor: "#3498db",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  iconHollow: {
    color: "white",
    height: "20px",
    width: "20px",
    marginBottom: "-2px",
  },
  iconFilled: {
    color: "white",
    height: "24px",
    width: "24px",
    marginBottom: "-5px",
  },
}));

const Register = ({
  isauthenticated,
  register,
  socialLogin,
  loading,
  errors,
  email,
  isEmailVerified,
  isFirstProjectCreated,
  sendVerifyEmail,
  createFirstProject,
}) => {
  const classes = useStyles();
  const [queryLoading, setQueryLoading] = useState(false);

  const openNotification = (msg) => {
    notification.open({
      message: msg,
      placement: "topRight",
      duration: 2,
      icon: <ExclamationCircleOutlined style={{ color: "blue" }} />,
    });
  };

  var step2 = "#d5dadc";
  var step3 = "#d5dadc";
  var componentNumber = 1;

  if (loading === false) {
    if (
      isauthenticated === true &&
      isEmailVerified === true &&
      isFirstProjectCreated === true
    ) {
      return <Redirect to={appRoutes.studioProjectsPage} />;
    }
  }

  if (isauthenticated === true) {
    step2 = "white";
    componentNumber = 2;
  }
  if (isEmailVerified === true) {
    step3 = "white";
    componentNumber = 3;
  }

  //classes.circle.backgroundColor = "#FFFFFF";

  return (
    <Anonymous>
      <Fragment>
        {loading === true ? (
          <Fragment>
            <div style={{ height: "250px" }}></div>
            <Spinner />
          </Fragment>
        ) : (
          <LoadingOverlay active={queryLoading} spinner text="">
            <Fragment>
              <Grid container className={classes.root}>
                <Hidden xsDown>
                  <CSSTransition
                    in={true}
                    appear={true}
                    timeout={2500}
                    classNames="fade"
                  >
                    <Grid item xs={0} sm={3} className="Register-LeftBar">
                      <Grid container spacing={0} direction="column">
                        <Paper elevation={0}>
                          <Grid item xs={12}>
                            <div className="Register-LeftBar-ContentBox">
                              <div style={{ height: "10vh" }}></div>
                              <FiberManualRecordIcon
                                className={classes.iconFilled}
                              />
                              &nbsp;
                              <Typography
                                variant="p"
                                style={{
                                  color: "white",
                                  fontSize: "20px",

                                  marginLeft: "20px",
                                }}
                              >
                                Add Work Account
                              </Typography>
                              <div style={{ height: "40px" }}></div>
                              {isauthenticated ? (
                                <FiberManualRecordIcon
                                  className={classes.iconFilled}
                                />
                              ) : (
                                <RadioButtonUncheckedIcon
                                  className={classes.iconHollow}
                                />
                              )}
                              &nbsp;
                              <Typography
                                variant="p"
                                style={{
                                  color: step2,
                                  fontSize: "20px",

                                  marginLeft: "20px",
                                }}
                              >
                                Verify your Email
                              </Typography>
                              <div style={{ height: "40px" }}></div>
                              {isEmailVerified ? (
                                <FiberManualRecordIcon
                                  className={classes.iconFilled}
                                />
                              ) : (
                                <RadioButtonUncheckedIcon
                                  className={classes.iconHollow}
                                />
                              )}{" "}
                              &nbsp;
                              <Typography
                                variant="p"
                                style={{
                                  color: step3,
                                  fontSize: "20px",

                                  marginLeft: "20px",
                                }}
                              >
                                Create your first Project
                              </Typography>
                            </div>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CSSTransition>
                </Hidden>

                <Grid item xs={12} sm={9} className="Register-RightBar">
                  <Fragment>
                    {isauthenticated === false ? (
                      <OnboardStage1
                        register={register}
                        socialLogin={socialLogin}
                        errors={errors}
                        openNotification={openNotification}
                        setQueryLoading={setQueryLoading}
                      />
                    ) : (
                      <Fragment></Fragment>
                    )}

                    {isauthenticated === true && isEmailVerified === false ? (
                      <OnboardStage2
                        email={email}
                        sendVerifyEmail={sendVerifyEmail}
                        openNotification={openNotification}
                        setQueryLoading={setQueryLoading}
                      />
                    ) : (
                      <Fragment></Fragment>
                    )}
                    {isauthenticated === true &&
                    isEmailVerified === true &&
                    isFirstProjectCreated === false ? (
                      <OnboardStage3
                        createFirstProject={createFirstProject}
                        email={email}
                        createFirstProject={createFirstProject}
                        openNotification={openNotification}
                        setQueryLoading={setQueryLoading}
                      />
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </Fragment>
                </Grid>
              </Grid>
            </Fragment>
          </LoadingOverlay>
        )}
      </Fragment>
    </Anonymous>
  );
};
const mstp = (state) => ({
  isauthenticated: state.auth.isAuthenticated,
  isEmailVerified: state.auth.isEmailVerified,
  isFirstProjectCreated: state.auth.isFirstProjectCreated,
  loading: state.auth.loading,
  email: state.auth.email,
  errors: state.alert,
});

export default connect(mstp, {
  register,
  sendVerifyEmail,
  createFirstProject,
  socialLogin,
})(Register);
