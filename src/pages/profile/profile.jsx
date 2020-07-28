import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./profile.css";

import Writings from "../../components/writings/writings";
import Image from "../../components/commonComponents/image/image";
import Button from "../../components/commonComponents/Button/Button";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      writings: [],
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getWritings();
  }

  getUserData = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    axios
      .get(`https://wryteapp.herokuapp.com/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error!");
          throw new Error("failed to fetch user");
        }
        this.setState({
          user: res.data.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getWritings = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("https://wryteapp.herokuapp.com/api/user/writings", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error!");
          throw new Error("failed to fetch wrtings");
        }
        console.log(res.data);
        this.setState({
          writings: res.data.data.writings,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (!localStorage.getItem("accessToken")) return <Redirect to="/login" />;
    return (
      <Fragment>
        <div className="container">
          <div className="profile_header_div">
            <Image
              src={this.state.user.profilePicture}
              alt="profile picture"
              containerClasses=""
              classes=""
              borderRadius="50%"
              maxHeight="150px"
              maxWidth="150px"
              border="4px solid #00000041"
            />

            <div className="profile_bio">
              <h4 className="profile_bio_username">{this.state.user.name}</h4>
              <small className="profile_bio_bio">{this.state.user.bio}</small>
              <br />
              <Button
                classes="btn btn-secondary edit_profile_btn"
                link="/Edit-Profile"
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="profile_writings_div">
            <h4 className="profile_writings_title col-12">My writings</h4>
            <div className="profile_writings_writings_div col-12">
              <Writings writings={this.state.writings} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;
