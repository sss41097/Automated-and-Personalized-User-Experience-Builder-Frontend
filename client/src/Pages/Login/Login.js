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
  paper: {
    minWidth: "450px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "320px",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  dontHaveAnAccount: {
    color: "grey",
    "&:hover": {
      color: "black",
      textDecoration: "underline",
    },
  },
  forgot: {
    color: "grey",
    "&:hover": {
      color: "black",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  emailField: {
    width: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
  passwordField: {
    width: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
  loginButton: {
    backgroundColor: "#38b74e",
    color: "white",
    width: "350px",
    borderRadius: "0",
    textTransform: "none",
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
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

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      alert.error("Both Fields are required.");
    } else {
      const res = await login(email, password);
      if (res.msg) {
        alert.success(res.msg);
      } else {
        res.errors.forEach((error) => alert.error(error.message));
      }
    }
  };

  if (loading === false) {
    if (isauthenticated === true && isFirstProjectCreated === false) {
      return <Redirect to="/onboard" />;
    }
    if (isauthenticated) {
      return <Redirect to="/dashboard" />;
    }
  }

  return (
    <Anonymous>
      <Fragment>
        {loading === true ? (
          <Fragment>
            <div style={{ height: "250px" }}></div>
            <Spinner />
          </Fragment>
        ) : (
          <Fragment>
            <Grid container className={classes.root}>
              <Hidden xsDown>
                <Grid item sm={3} className={classes.sideBar}>
                  <Grid container spacing={0} direction="column">
                    <Paper elevation={0}>
                      <div style={{ backgroundColor: "#3498db" }}>
                        <div style={{ height: "225px" }}></div>
                        <div align="center">
                          <Typography
                            variant="h4"
                            style={{ color: "white", fontWeight: "bold" }}
                          >
                            We know you!
                          </Typography>
                          <br />
                          <Typography
                            variant="p"
                            style={{ color: "#e2e3e4", fontSize: "16px" }}
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
                  style={{ minHeight: "100vh" }}
                >
                  <div>
                    <Grid item xs={9}>
                      <Paper elevation={10} className={classes.paper}>
                        <div style={{ height: "30px" }}></div>
                        <div align="center">
                          <Typography
                            variant="h4"
                            style={{ color: "black", fontWeight: "bold" }}
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
                                        className={classes.dontHaveAnAccount}
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
                              className={classes.loginButton}
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
                              className={classes.dontHaveAnAccount}
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
