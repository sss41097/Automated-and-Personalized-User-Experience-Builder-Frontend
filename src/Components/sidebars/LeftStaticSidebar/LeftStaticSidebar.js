import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LeftStaticSidebar.css";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import appRoutes from "../../../utils/routes";

const LeftStaticSidebar = ({ logout }) => {
  return (
    <div className="LeftStaticBar">
      <div>
        <Link to={appRoutes.studioProjectsPage}>
          <img
            src="https://img.icons8.com/dusk/64/000000/template.png"
            className="LeftStaticBar-Icons"
          />
        </Link>
      </div>
      <div>
        <Link to={appRoutes.teamManagementPage}>
          <img
            src="https://img.icons8.com/officel/50/000000/user-group-man-woman.png"
            className="LeftStaticBar-Icons"
          />
        </Link>
      </div>
      <div>
        <Link to={appRoutes.teamManagementPage}>
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png"
            className="LeftStaticBar-Icons"
          />
        </Link>
      </div>
      <div>
        <Link to={appRoutes.teamManagementPage}>
          <img
            src="https://img.icons8.com/cotton/64/000000/lock.png"
            className="LeftStaticBar-Icons"
          />
        </Link>
      </div>
      <div
        style={{
          position: "absolute",
          top: "84vh",
        }}
      >
        <Link to={appRoutes.accountSettingsPage}>
          <img
            src="https://img.icons8.com/dusk/64/000000/settings.png"
            className="LeftStaticBar-Icons"
            style={{ marginTop: "5px" }}
          />
        </Link>
      </div>

      <div
        style={{
          position: "absolute",
          top: "91vh",
        }}
      >
        <img
          src="https://img.icons8.com/color/48/000000/logout-rounded-up--v1.png"
          className="LeftStaticBar-Icons"
          style={{ marginTop: "5px" }}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
};

export default connect(null, { logout })(LeftStaticSidebar);
