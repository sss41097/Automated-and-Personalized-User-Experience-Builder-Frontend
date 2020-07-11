import React, { Fragment, useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { GoogleLogin } from "react-google-login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  imageIcon: {
    height: "20px",
    marginBottom: "90%",
  },
  iconRoot: {
    textAlign: "center",
  },

  separatorStyle: {
    width: "359px",
    [theme.breakpoints.down("xs")]: {
      width: "220px",
    },
  },
  emailField: {
    width: "390px",
    [theme.breakpoints.down("xs")]: {
      width: "220px",
    },
  },
}));

const RegisterStep = ({
  register,
  socialLogin,
  errors,
  openNotification,
  setQueryLoading,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const responseGoogle = async (response) => {
    try {
      console.log(response.profileObj);

      setQueryLoading(true);

      const res = await socialLogin(
        response.profileObj.email,
        response.profileObj.givenName,
        response.profileObj.familyName
      );
      console.log(res);
      if (!res.error) {
        openNotification("GOOGLE LOGIN SUCCESSFUL");
      } else {
        openNotification(res.error);
      }
      setQueryLoading(false);
    } catch (error) {
      openNotification(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      openNotification("NO FIELD CAN BE EMPTY");
    } else if (password != passwordConfirm) {
      openNotification("PASSWORD DO NOT MATCH");
    } else if (password.length < 6) {
      openNotification("PASSWORD LENGTH MUST BE ATLEAST 6");
    } else {
      setQueryLoading(true);

      const res = await register({ email, password });
      console.log(res);
      if (!res.error) {
        openNotification("PLEASE CONFIRM EMAIL");
      } else {
        openNotification(res.error);
      }
      setQueryLoading(false);
    }
  };

  return (
    <CSSTransition in={true} appear={true} timeout={2500} classNames="fade">
      <div>
        <Grid container spacing={0} direction="column">
          <Paper elevation={0}>
            <Grid item className="Register-RightBar">
              <div style={{ height: "11vh" }}></div>
            </Grid>

            <Grid item xs={12} className="Register-RightBar">
              <div align="center">
                <Typography variant="h4" className="Register-Heading">
                  Try SpellShow free
                </Typography>
                <br />
                <Typography variant="p" style={{ fontSize: "17px" }}>
                  Full Access. No Credit Card Required.{" "}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12} className="Register-RightBar">
              <div style={{ height: "6vh" }}></div>
              <div align="center">
                <form onSubmit={(e) => onSubmit(e)}>
                  <TextField
                    id="standard-basic"
                    label="Work Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    className={classes.emailField}
                  />
                  <div style={{ height: "5vh" }}></div>

                  <TextField
                    id="standard-basic"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    className={classes.emailField}
                  />

                  <div style={{ height: "5vh" }}></div>

                  <TextField
                    id="standard-basic"
                    label="Password"
                    type="password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => onChange(e)}
                    minLength="6"
                    className={classes.emailField}
                  />

                  <div style={{ height: "6vh" }}></div>

                  <Button
                    type="submit"
                    variant="contained"
                    className="Register-RegistrationButton"
                  >
                    Try It Free
                  </Button>
                </form>
                <div style={{ height: "7vh" }}></div>

                <div className="separator"> or </div>

                <div style={{ height: "7vh" }}></div>

                <div>
                  <GoogleLogin
                    clientId="951758766667-7vabve5pc6mbtdssv3p6nim5s9adlbum.apps.googleusercontent.com"
                    buttonText="Login With Google"
                    onSuccess={responseGoogle}
                  />
                </div>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </CSSTransition>
  );
};

export default RegisterStep;
