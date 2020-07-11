import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useAlert } from "react-alert";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
}));

const RegisterStep = ({
  register,
  errors,
  email,
  sendVerifyEmail,
  openNotification,
  setQueryLoading,
}) => {
  const classes = useStyles();
  const alert = useAlert();
  const onSubmit = async (e) => {
    e.preventDefault();
    setQueryLoading(true);

    const res = await sendVerifyEmail(email);
    console.log(res);
    if (!res.error) {
      openNotification("VERIFICATION EMAIL RESENT");
    } else {
      openNotification(res.error);
    }
    setQueryLoading(false);
  };
  return (
    <CSSTransition in={true} appear={true} timeout={4000} classNames="fade">
      <Fragment>
        <Grid container spacing={0} direction="column">
          <Paper elevation={0}>
            <Grid item>
              <div style={{ height: "25vh" }}></div>
            </Grid>

            <Grid item xs={12}>
              <div align="center">
                <Typography variant="h3" className="Register-Heading">
                  Please Verify your email
                </Typography>
                <div style={{ height: "5vh" }}></div>{" "}
                <Typography variant="p" style={{ fontSize: "17px" }}>
                  You're almost there! We have sent an email to{" "}
                </Typography>
                <br />
                <div style={{ height: "5vh" }}></div>
                <Typography
                  variant="p"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {email}
                </Typography>
                <div style={{ height: "10vh" }}></div>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                  className="Register-ResendEmailButton"
                >
                  <Typography
                    variant="p"
                    style={{ fontSize: "17px", fontWeight: "bold" }}
                  >
                    Resent Email
                  </Typography>
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
