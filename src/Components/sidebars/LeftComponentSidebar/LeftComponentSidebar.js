import React from "react";
import paginationIcon from "../../../utils/icons/paginationIcon.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./LeftComponentSidebar.css";

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
          className="LeftComponentSideBar"
        >
          <div
            className="LeftComponentSideBar-CloseIcon"
            onClick={this.props.closeNav}
          >
            {" "}
            <ArrowBackIosIcon />
          </div>

          <div>
            <h2 className="LeftComponentSideBar-Heading">COMPONENTS</h2>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img
                id="cardIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
                src="https://img.icons8.com/officel/50/000000/template.png"
              />{" "}
              <br />
              <span className="LeftComponentSideBar-Text">Card</span>
            </div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img
                id="headerIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
                src="https://img.icons8.com/color/45/000000/document-header.png"
              />{" "}
              <br />
              <span className="LeftComponentSideBar-Text">Header</span>
            </div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img
                id="textIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
                src="https://img.icons8.com/ios-filled/50/000000/title.png"
              />
              <br />
              <span className="LeftComponentSideBar-Text">Text</span>
            </div>

            <div className="LeftComponentSideBar-Icons-VerticalSpacing"></div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
              style={{ marginLeft: "30px" }}
            >
              <img src="https://img.icons8.com/fluent/50/000000/video.png" />
              <br />
              <span className="LeftComponentSideBar-Text">Video</span>
            </div>

            <div className="LeftComponentSideBar-Icons-VerticalSpacing"></div>

            <div className="LeftComponentSideBar-Icons-HorizontalSpacing">
              <img
                src="https://img.icons8.com/plasticine/50/000000/image.png"
                id="imageIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
              />
              <br />
              <span className="LeftComponentSideBar-Text">Image</span>
            </div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img src="https://img.icons8.com/fluent/50/000000/sorting-options.png" />
              <br />
              <span className="LeftComponentSideBar-Text">Slider</span>
            </div>

            <div className="LeftComponentSideBar-Icons-HorizontalSpacing">
              <img
                src="https://img.icons8.com/ios/50/000000/button2.png"
                id="buttonIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
              />
              <br />
              <span className="LeftComponentSideBar-Text">Button</span>
            </div>

            <div className="LeftComponentSideBar-Icons-VerticalSpacing"></div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
              style={{ marginLeft: "25px" }}
            >
              <img
                style={{ height: "46px", width: "42px" }}
                src={paginationIcon}
              />
              <br />
              <span className="LeftComponentSideBar-Text">Pagination</span>
            </div>

            <h2 className="LeftComponentSideBar-Heading">LAYOUTS</h2>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img src="https://img.icons8.com/office/50/000000/channel-mosaic.png" />{" "}
              <br />
              <span className="LeftComponentSideBar-Text">Position</span>
            </div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img src="https://img.icons8.com/office/50/000000/channel-mosaic.png" />{" "}
              <br />
              <span className="LeftComponentSideBar-Text">Overlay</span>
            </div>

            <div
              align="center"
              className="LeftComponentSideBar-Icons-HorizontalSpacing"
            >
              <img
                id="alignmentIcon"
                onDragStart={(event) => this.props.iconDragStart(event)}
                onDragEnd={(event) => this.props.iconDragOver(event)}
                src="https://img.icons8.com/office/50/000000/channel-mosaic.png"
              />{" "}
              <br />
              <span className="LeftComponentSideBar-Text">Alignment</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leftbar;
