import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAlert } from "react-alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";

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
  emailField: {
    width: "320px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
}));

const RegisterStep = ({ createFirstProject, email }) => {
  const [formData, setFormData] = useState({
    projectName: "",
  });

  const { projectName } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();
  const alert = useAlert();
  const onSubmit = (e) => {
    if (projectName === "") {
      alert.error("Project Name can't be empty.");
    } else {
      alert.success("Success");
      createFirstProject(email);
    }
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
                <div style={{ height: "40px" }}></div>
                <Typography variant="h3" style={{ fontWeight: "bold" }}>
                  Let's begin
                </Typography>
                <div style={{ height: "30px" }}></div>{" "}
                <Typography variant="p" style={{ fontSize: "20px" }}>
                  We are on last step! Enter your first project name to begin{" "}
                </Typography>
                <br />
                <div style={{ height: "30px" }}></div>
                <TextField
                  name="projectName"
                  value={projectName}
                  onChange={(e) => onChange(e)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Project Name"
                  id="standard-basic"
                  className={classes.emailField}
                />{" "}
                <div style={{ height: "70px" }}></div>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                  startIcon={
                    <ChangeHistoryIcon style={{ transform: "rotate(90deg)" }} />
                  }
                  style={{
                    width: "230px",
                    borderRadius: "0",
                    borderWidth: "medium",
                    borderColor: "#424342",
                    textTransform: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Finish
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
