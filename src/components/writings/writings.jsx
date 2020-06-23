import React, { Component, Fragment } from "react";

import Writing from "../writingCard/writing";
import "./writings.css";

class Writings extends Component {
  state = {
    writings: [
      {
        _id: "1",
        title: "title1",
        text:
          "ldsf;kgjlsa;jfsdl;fjsdl;fjdslafhsdalhfglksjglsda;jfds;ljflsd;jfsda;fjsda;lfkjsd",
      },
      {
        _id: "2",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
      {
        _id: "13",
        title: "title1",
        text:
          "ldsf;kgjlsa;jfsdl;fjsdl;fjdslafhsdalhfgll;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdal;fjsdl;fjdslafhsdalhfglksjglsdaksjglsda;jfds;ljflsd;jfsda;fjsda;lfkjsd",
      },
      {
        _id: "45",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
      {
        _id: "25",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
      {
        _id: "245",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
      {
        _id: "2456",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
      {
        _id: "462",
        title: "title1",
        text: "ldsf;kgjlsa;jfsdl;fjsdl",
      },
    ],
  };
  render() {
    return (
      <div className="writings_div">
        {this.state.writings.map((writing) => (
          <Writing
            key={writing._id}
            _id={writing._id}
            title={writing.title}
            text={writing.text}
          />
        ))}
      </div>
    );
  }
}

export default Writings;
