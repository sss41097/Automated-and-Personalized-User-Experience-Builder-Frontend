import React, { Fragment } from "react";
import StaticLeftBar from "../../Components/sidebars/LeftStaticSidebar/LeftStaticSidebar";
import Spinner from "../../utils/spinner/spinner";
import Grid from "@material-ui/core/Grid";
import appRoutes from "../../utils/routes";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Default = (props) => {
  if (props.auth.loading === false) {
    if (
      props.auth.isAuthenticated === false ||
      props.auth.isFirstProjectCreated === false ||
      props.auth.isEmailVerified === false
    ) {
      return <Redirect to={appRoutes.homePage} />;
    }
  }
  return (
    <div>
      {props.auth.loading === true ? (
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
        <Fragment>
          <StaticLeftBar />
          <div style={{ marginLeft: "50px" }}>{props.children}</div>
        </Fragment>
      )}
    </div>
  );
};

const mstp = (state) => ({
  auth: state.auth,
});

export default connect(mstp, {})(Default);
