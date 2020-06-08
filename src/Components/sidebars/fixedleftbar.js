import React, { Fragment } from "react";

class Staticleftbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div>
          <img
            src="https://img.icons8.com/dusk/64/000000/template.png"
            className="fixed-sidebar-icons"
            onClick={this.props.openNav}
          />
        </div>
        <div>
          <img
            src="https://img.icons8.com/officel/50/000000/user-group-man-woman.png"
            className="fixed-sidebar-icons"
          />
        </div>
        <div>
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/folder-invoices.png"
            className="fixed-sidebar-icons"
          />
        </div>
        <div>
          <img
            src="https://img.icons8.com/cotton/64/000000/lock.png"
            className="fixed-sidebar-icons"
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "90vh",
          }}
        >
          <img
            src="https://img.icons8.com/dusk/64/000000/settings.png"
            className="fixed-sidebar-icons"
            style={{ marginTop: "5px" }}
          />
        </div>
      </Fragment>
    );
  }
}

export default Staticleftbar;
