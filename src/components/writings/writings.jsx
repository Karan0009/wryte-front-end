import React, { Component } from "react";

import Writing from "../writingCard/writing";
import "./writings.css";

class Writings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writings: this.props.writings,
    };
  }
  render() {
    if (this.props.writings) {
      if (this.props.writings.length === 0)
        return (
          <div className="writings_div">
            <h4
              style={{
                margin: "auto",
                textAlign: "center",
                padding: "50px",
                textTransform: "uppercase",
              }}
            >
              so empty here :/
            </h4>
          </div>
        );
    }
    return (
      <div className="writings_div">
        {this.props.writings ? (
          this.props.writings.map((writing) => (
            <Writing key={writing._id} writing={writing} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Writings;
