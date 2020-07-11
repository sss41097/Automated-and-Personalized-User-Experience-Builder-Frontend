import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

const RegisterStep = ({
  createFirstProject,
  email,
  openNotification,
  setQueryLoading,
}) => {
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
  const onSubmit = async (e) => {
    if (projectName.trim() === "") {
      openNotification("PROJECT NAME CANNOT BE EMPTY");
    } else {
      setQueryLoading(true);

      const res = await createFirstProject(email, projectName);
      console.log(res);
      if (!res.error) {
        openNotification("FIRST PROJECT CREATED");
      } else {
        openNotification(res.error);
      }
      setQueryLoading(false);
    }
  };

  return (
    <CSSTransition in={true} appear={true} timeout={4000} classNames="fade">
      <Fragment>
        <Grid container spacing={0} direction="column">
          <Paper elevation={0}>
            <Grid item xs={12}>
              <div align="center">
                <div style={{ height: "24vh" }}></div>
                <Typography variant="h3" className="Register-Heading">
                  Let's begin
                </Typography>
                <div style={{ height: "5vh" }}></div>{" "}
                <Typography variant="p" style={{ fontSize: "20px" }}>
                  We are on last step! Enter your first project name to begin{" "}
                </Typography>
                <br />
                <div style={{ height: "5vh" }}></div>
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
                <div style={{ height: "10vh" }}></div>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                  startIcon={
                    <ChangeHistoryIcon style={{ transform: "rotate(90deg)" }} />
                  }
                  className="Register-FinishButton"
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
