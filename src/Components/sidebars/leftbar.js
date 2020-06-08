import React from "react";
import paginationIcon from "./paginationIcon.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

class Leftbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div
          ref={(input) => {
            this.navbar = input;
          }}
          style={{ width: this.props.leftNavBarWidth }}
          id="mySidenav"
          className="sidenav"
        >
          <div
            style={{
              marginTop: "-50px",
              marginLeft: "270px",
              cursor: "pointer",
            }}
            onClick={this.props.closeNav}
          >
            {" "}
            <ArrowBackIosIcon />
          </div>
          <div style={{ marginTop: "-20px" }}>
            <h2 style={{ marginLeft: "36px", color: "grey" }}>COMPONENTS</h2>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "36px" }}
            >
              <img src="https://img.icons8.com/officel/50/000000/template.png" />{" "}
              <br />
              <span className="leftbartext">Card</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "36px" }}
            >
              <img src="https://img.icons8.com/color/45/000000/document-header.png" />{" "}
              <br />
              <span className="leftbartext">Header</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "32px" }}
            >
              <img src="https://img.icons8.com/ios-filled/50/000000/title.png" />
              <br />
              <span className="leftbartext">Title</span>
            </div>

            <div align="center" style={{ height: "25px" }}></div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "36px" }}
            >
              <img src="https://img.icons8.com/color/48/000000/subtitles.png" />
              <br />
              <span className="leftbartext">Subtitle</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "27px" }}
            >
              <img src="https://img.icons8.com/officel/45/000000/content.png" />
              <br />
              <span className="leftbartext">Content</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "34px" }}
            >
              <img src="https://img.icons8.com/fluent/50/000000/video.png" />
              <br />
              <span className="leftbartext">Video</span>
            </div>

            <div align="center" style={{ height: "25px" }}></div>
            <div style={{ display: "inline-block", marginLeft: "36px" }}>
              <img src="https://img.icons8.com/plasticine/50/000000/image.png" />
              <br />
              <span className="leftbartext">Image</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "36px" }}
            >
              <img src="https://img.icons8.com/fluent/50/000000/sorting-options.png" />
              <br />
              <span className="leftbartext">Slider</span>
            </div>
            <div style={{ display: "inline-block", marginLeft: "36px" }}>
              <img
                src="https://img.icons8.com/ios/50/000000/button2.png"
                id="buttonIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
              />
              <br />
              <span className="leftbartext">Button</span>
            </div>

            <div align="center" style={{ height: "25px" }}></div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "23px" }}
            >
              <img
                style={{ height: "46px", width: "42px" }}
                src={paginationIcon}
              />
              <br />
              <span className="leftbartext">Pagination</span>
            </div>

            <h2 style={{ marginLeft: "36px", color: "grey" }}>LAYOUTS</h2>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "36px" }}
            >
              <img src="https://img.icons8.com/office/50/000000/channel-mosaic.png" />{" "}
              <br />
              <span className="leftbartext">Position</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "26px" }}
            >
              <img src="https://img.icons8.com/office/50/000000/channel-mosaic.png" />{" "}
              <br />
              <span className="leftbartext">Overlay</span>
            </div>
            <div
              align="center"
              style={{ display: "inline-block", marginLeft: "26px" }}
            >
              <img src="https://img.icons8.com/office/50/000000/channel-mosaic.png" />{" "}
              <br />
              <span className="leftbartext">Layout</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leftbar;
