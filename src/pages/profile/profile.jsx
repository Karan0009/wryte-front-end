import React, { Component, Fragment } from "react";

import "./profile.css";

import Writings from "../../components/writings/writings";

class Profile extends Component {
  state = {
    writings: [],
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="profile_header_div">
            <div className="profile_picture">
              <img
                className="profile_picture_img"
                src="https://i.ibb.co/r6K6JJn/altophoto-17-10-12-19-02-2018.png"
                alt="profile picture"
              />
            </div>
            <div className="profile_bio">
              <h4 className="profile_bio_username">karan singh</h4>
              <small className="profile_bio_bio">just another human</small>
            </div>
          </div>
          <div className="profile_writings_div">
            <h4 className="profile_writings_title col-12">My writings</h4>
            <div className="profile_writings_writings_div col-12">
              <Writings />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
