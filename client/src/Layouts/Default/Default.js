import React from "react";
import StaticLeftBar from "../../Components/sidebars/LeftStaticSidebar/LeftStaticSidebar";

const Default = (props) => {
  return (
    <div>
      <StaticLeftBar />
      <div style={{ marginLeft: "50px" }}>{props.children}</div>
    </div>
  );
};

export default Default;
