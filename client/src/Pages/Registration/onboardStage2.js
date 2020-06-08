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
  resendButton: {
    backgroundColor: "#38b74e",
    color: "white",
    width: "280px",
    borderRadius: "0",
    textTransform: "none",
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
}));

const RegisterStep = ({ register, errors, email, sendVerifyEmail }) => {
  const classes = useStyles();
  const alert = useAlert();
  const onSubmit = (e) => {
    e.preventDefault();
    sendVerifyEmail(email);
    alert.success("Verification Email Sent.");
  };
  return (
    <CSSTransition in={true} appear={true} timeout={4000} classNames="fade">
      <Fragment>
        <Grid container spacing={0} direction="column">
          <Paper elevation={0}>
            <Grid item>
              <div style={{ height: "140px" }}></div>
            </Grid>

            <Grid item xs={12}>
              <div align="center">
                <div style={{ height: "70px" }}></div>
                <Typography variant="h3" style={{ fontWeight: "bold" }}>
                  Please Verify your email
                </Typography>
                <div style={{ height: "30px" }}></div>{" "}
                <Typography variant="p" style={{ fontSize: "17px" }}>
                  You're almost there! We have sent an email to{" "}
                </Typography>
                <br />
                <div style={{ height: "30px" }}></div>
                <Typography
                  variant="p"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {email}
                </Typography>
                <div style={{ height: "90px" }}></div>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                  className={classes.resendButton}
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
