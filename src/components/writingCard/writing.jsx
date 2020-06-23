import React, { Component, Fragment } from "react";

import Button from "../commonComponents/Button/Button";

import "./writing.css";

class Writing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="writing_div">
        <h4 className="writing_title">{this.props.title}</h4>
        <p className="writig_text">{this.props.text}</p>
        <Button
          classes="btn btn-secondary read-more-btn"
          link={`/w/${this.props._id}`}
        >
          Read more
        </Button>
        <div className="author-info">
          <div className="writing-profile-picture">
            <img
              src="https://i.ibb.co/r6K6JJn/altophoto-17-10-12-19-02-2018.png"
              alt="author-image"
            />
          </div>
          <p>username</p>
        </div>
      </div>
    );
  }
}

export default Writing;
