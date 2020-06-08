import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

class Staticleftbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          width: "50px",
          height: "100vh",
          backgroundColor: "#3498db",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <Link to="/studio-editor">
            <img
              src="https://img.icons8.com/dusk/64/000000/template.png"
              className="fixed-sidebar-icons"
              onClick={this.props.openNav}
            />
          </Link>
        </div>
        <div>
          <Link to="/team-management">
            <img
              src="https://img.icons8.com/officel/50/000000/user-group-man-woman.png"
              className="fixed-sidebar-icons"
            />
          </Link>
        </div>
        <div>
          <Link to="/studio-project">
            <img
              src="https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png"
              className="fixed-sidebar-icons"
            />
          </Link>
        </div>
        <div>
          <Link to="/need-to-set-route">
            <img
              src="https://img.icons8.com/cotton/64/000000/lock.png"
              className="fixed-sidebar-icons"
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
              className="fixed-sidebar-icons"
              style={{ marginTop: "5px" }}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Staticleftbar;
