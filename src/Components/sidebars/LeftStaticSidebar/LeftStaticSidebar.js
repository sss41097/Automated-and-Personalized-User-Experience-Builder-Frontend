import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LeftStaticSidebar.css";

class Staticleftbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LeftStaticBar">
        <div>
          <Link to="/studio-editor">
            <img
              src="https://img.icons8.com/dusk/64/000000/template.png"
              className="LeftStaticBar-Icons"
              onClick={this.props.openNav}
            />
          </Link>
        </div>
        <div>
          <Link to="/team-management">
            <img
              src="https://img.icons8.com/officel/50/000000/user-group-man-woman.png"
              className="LeftStaticBar-Icons"
            />
          </Link>
        </div>
        <div>
          <Link to="/studio-project">
            <img
              src="https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png"
              className="LeftStaticBar-Icons"
            />
          </Link>
        </div>
        <div>
          <Link to="/need-to-set-route">
            <img
              src="https://img.icons8.com/cotton/64/000000/lock.png"
              className="LeftStaticBar-Icons"
            />
          </Link>
        </div>
        <div
          style={{
            position: "absolute",
            top: "90vh",
          }}
        >
          <Link to="/account-settings">
            <img
              src="https://img.icons8.com/dusk/64/000000/settings.png"
              className="LeftStaticBar-Icons"
              style={{ marginTop: "5px" }}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Staticleftbar;
