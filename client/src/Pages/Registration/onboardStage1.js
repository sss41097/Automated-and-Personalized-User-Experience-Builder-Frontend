import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import GoogleIcon from "../../utils/icons/google-icon.svg";
import { Icon } from "@material-ui/core";
import { useAlert } from "react-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
  tryItFreeButton: {
    backgroundColor: "#38b74e",
    color: "white",
    width: "350px",
    borderRadius: "0",
    textTransform: "none",
    fontSize: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
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
  googleButton: {
    [theme.breakpoints.down("xs")]: {
      width: "220px",
    },
  },
}));

const RegisterStep = ({ register, errors }) => {
  const alert = useAlert();
  const classes = useStyles();

  var displayErrorid = [];

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const notify = (msg) =>
      toast(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    if (!email && !password) {
      alert.error("No field can be empty");
    } else if (password != passwordConfirm) {
      alert.error("Password do not match");
    } else if (password.length < 6) {
      notify("PASSWORD LENGTH MUST BE ATLEAST 6");
    } else {
      const res = await register({ email, password });
      if (res.msg) {
        alert.success(res.msg);
      } else {
        res.errors.forEach((error) => alert.error(error.message));
      }
    }
  };

  return (
    <CSSTransition in={true} appear={true} timeout={2500} classNames="fade">
      <Fragment>
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
        <Grid container spacing={0} direction="column">
          <Paper elevation={0}>
            <Grid item>
              <div style={{ height: "15vh" }}></div>
            </Grid>

            <Grid item xs={12}>
              <div align="center">
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  Try SpellShow free
                </Typography>
                <br />
                <Typography variant="p" style={{ fontSize: "17px" }}>
                  Full Access. No Credit Card Required.{" "}
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div style={{ height: "70px" }}></div>
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
                  <div style={{ height: "30px" }}></div>

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

                  <div style={{ height: "30px" }}></div>

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

                  <div style={{ height: "40px" }}></div>

                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.tryItFreeButton}
                  >
                    Try It Free
                  </Button>
                </form>
                <div style={{ height: "45px" }}></div>
                <div
                  className="separator"
                  style={{ color: "grey", width: "190px" }}
                >
                  {" "}
                  or{" "}
                </div>
                <div style={{ height: "50px" }}></div>
                <Button variant="contained" className={classes.googleButton}>
                  <Icon classes={{ root: classes.iconRoot }}>
                    <img
                      className={classes.imageIcon}
                      src={GoogleIcon}
                      style={{ paddingBottom: "5px" }}
                    />
                  </Icon>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Quick access with Google
                </Button>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Fragment>
    </CSSTransition>
  );
};

export default RegisterStep;
