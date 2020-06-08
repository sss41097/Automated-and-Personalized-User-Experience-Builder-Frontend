import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import { Link, Redirect } from "react-router-dom";
import { Hidden } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import { connect } from "react-redux";
import Spinner from "../../utils/spinner/spinner";
import { CSSTransition } from "react-transition-group";
import Anonymous from "../../Layouts/Anonymous/Anonymous";
import appRoutes from "../../utils/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Landing = ({ isauthenticated, loading }) => {
  const classes = useStyles();

  if (loading === false) {
    if (isauthenticated === true) {
      return <Redirect to="/register" />;
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
          <CSSTransition
            in={true}
            appear={true}
            timeout={2500}
            classNames="fade"
          >
            <div>
              <div style={{ margin: "10px", marginBottom: "-10px" }}>
                <StarsIcon />
              </div>

              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh" }}
              >
                <Paper elevation={0}>
                  <Grid item xs={12}>
                    <div align="center">
                      <Typography variant="h3">Try SpellShow</Typography>
                      <br />
                      <Typography variant="p" style={{ fontSize: "20px" }}>
                        A cloud solution manage your Web Applciations Tour
                        Guides
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    &nbsp;
                  </Grid>

                  <Grid item xs={12}>
                    <div align="center" style={{ marginTop: "10px" }}>
                      <Link
                        to={appRoutes.loginPage}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#38b74e",
                            color: "white",
                            width: "230px",
                            borderRadius: "0",
                            textTransform: "none",
                            fontSize: "20px",
                          }}
                        >
                          Log in
                        </Button>
                      </Link>
                      <Hidden xsDown>
                        <div
                          style={{ width: "20px", display: "inline-block" }}
                        ></div>
                      </Hidden>
                      <Hidden smUp>
                        {" "}
                        <div style={{ height: "20px" }}></div>{" "}
                      </Hidden>

                      <Link
                        to={appRoutes.registerPage}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={
                            <ChangeHistoryIcon
                              style={{ transform: "rotate(90deg)" }}
                            />
                          }
                          style={{
                            width: "230px",
                            borderRadius: "0",
                            borderWidth: "medium",
                            borderColor: "#424342",
                            textTransform: "none",
                            fontSize: "20px",
                          }}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                </Paper>
              </Grid>
            </div>
          </CSSTransition>
        )}
      </Fragment>
    </Anonymous>
  );
};
const mstp = (state) => ({
  isauthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  email: state.auth.email,
  errors: state.alert,
});

export default connect(mstp, {})(Landing);
