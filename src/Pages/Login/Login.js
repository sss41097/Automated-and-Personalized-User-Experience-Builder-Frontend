import "./Login.css";
import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Hidden } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import shieldImage from "../../utils/icons/shield.PNG";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { socialLogin } from "../../actions/auth";
import appRoutes from "../../utils/routes";
import Spinner from "../../utils/spinner/spinner";
import Anonymous from "../../Layouts/Anonymous/Anonymous";
import LoadingOverlay from "react-loading-overlay";
import { notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  emailField: {
    width: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
  },
  passwordField: {
    width: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
  },
}));

const Signin = ({
  login,
  isauthenticated,
  socialLogin,
  loading,
  isEmailVerified,
  isFirstProjectCreated,
}) => {
  const alert = useAlert();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [queryLoading, setQueryLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openNotification = (msg) => {
    notification.open({
      message: msg,
      placement: "topRight",
      duration: 2,
      icon: <ExclamationCircleOutlined style={{ color: "blue" }} />,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      openNotification("PASSWORD CANNOT BE EMPTY");
    } else {
      setQueryLoading(true);

      const res = await login(email, password);
      console.log(res);
      if (!res.error) {
        openNotification("LOGIN SUCCESSFUL");
      } else {
        openNotification(res.error);
      }
      setQueryLoading(false);
    }
  };

  if (loading === false) {
    if (isauthenticated === true && isFirstProjectCreated === false) {
      return <Redirect to={appRoutes.registerPage} />;
    }
    if (isauthenticated) {
      return <Redirect to={appRoutes.studioProjectsPage} />;
    }
  }

  return (
    <Anonymous>
      <Fragment>
        {loading === true ? (
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
          <LoadingOverlay active={queryLoading} spinner text="">
            <Fragment>
              <Grid container className={classes.root}>
                <Hidden xsDown>
                  <Grid item sm={3} className="Login-LeftBar">
                    <Grid container spacing={0} direction="column">
                      <Paper elevation={0}>
                        <div className="Login-LeftBar-ContentBox">
                          <div style={{ height: "30vh" }}></div>
                          <div align="center">
                            <Typography
                              variant="h4"
                              style={{ fontWeight: "bold", color: "white" }}
                            >
                              We know you!
                            </Typography>
                            <br />
                            <Typography
                              variant="p"
                              style={{ fontSize: "16px" }}
                            >
                              Simply enter your primary Shift Account to get
                              started.
                            </Typography>
                            <br />
                            <img
                              src={shieldImage}
                              style={{
                                width: "120px",
                                height: "100px",
                                paddingTop: "130px",
                              }}
                            />
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm={9}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className="Login-RightBar"
                  >
                    <div>
                      <Grid item xs={9}>
                        <Paper elevation={10} className="Login-Card">
                          <div style={{ height: "30px" }}></div>
                          <div align="center">
                            <Typography
                              variant="h4"
                              className="Login-Card-Heading"
                            >
                              LOG IN{" "}
                            </Typography>

                            <div style={{ height: "40px" }}></div>

                            <form onSubmit={(e) => onSubmit(e)}>
                              <TextField
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EmailIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                placeholder="Email"
                                id="standard-basic"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                type="email"
                                className={classes.emailField}
                              />

                              <div style={{ height: "30px" }}></div>

                              <TextField
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LockIcon />
                                    </InputAdornment>
                                  ),
                                  endAdornment: (
                                    <Link
                                      to={appRoutes.forgetPasswordPage}
                                      style={{
                                        textDecoration: "none",
                                      }}
                                    >
                                      <div>
                                        <Typography
                                          variant="p"
                                          className="Login-Card-Text"
                                          style={{
                                            fontSize: "13px",
                                          }}
                                        >
                                          Forgot?
                                        </Typography>
                                      </div>
                                    </Link>
                                  ),
                                }}
                                id="standard-basic"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                className={classes.passwordField}
                              />
                              <div style={{ height: "50px" }}></div>
                              <Button
                                type="submit"
                                variant="contained"
                                className="Login-Card-LoginButton"
                              >
                                Log In
                              </Button>
                            </form>

                            <div style={{ height: "30px" }}></div>
                            <Link
                              to={appRoutes.registerPage}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <Typography
                                variant="p"
                                className="Login-Card-Text"
                                style={{
                                  fontSize: "18px",
                                }}
                              >
                                Don't have an account ?
                              </Typography>
                            </Link>
                            <div style={{ height: "20px" }}></div>
                          </div>
                        </Paper>
                      </Grid>
                    </div>
                  </Grid>
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
  loading: state.auth.loading,
  email: state.auth.email,
  isEmailVerified: state.auth.isEmailVerified,
  isFirstProjectCreated: state.auth.isFirstProjectCreated,
});

export default connect(mstp, { login, socialLogin })(Signin);
