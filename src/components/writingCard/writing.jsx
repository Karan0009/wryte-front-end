import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Button from "../commonComponents/Button/Button";
import Image from "../../components/commonComponents/image/image";
import "./writing.css";

class Writing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingData: this.props.writing,
      author: {},
      maxLengthInWritingCard: 50,
      isLiked: false,
      likeCount: this.props.writing.liked_by.length,
      linkCopied: false,
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    if (
      this.state.writingData.liked_by.findIndex(
        (user) => user._id === localStorage.getItem("userId")
      ) > -1
    )
      this.setState({ isLiked: true });
  }

  getWriting = () => {
    axios
      .get(
        `https://wryteapp.herokuapp.com/api/writing/${this.props.writing._id}`
      )
      .then((res) => {
        if (res.status !== 200) throw new Error("failed to fetch writing data");
        let isLiked = false;
        if (
          res.data.data.writing.liked_by.findIndex(
            (user) => user._id === localStorage.getItem("userId")
          ) > -1
        )
          isLiked = true;
        this.setState({
          writingData: res.data.data.writing,
          isLiked: isLiked,
          likeCount: res.data.data.writing.liked_by.length,
        });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  writingLikeHandler = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({ redirectToLogin: true });
      return;
    }
    let likeCount = this.state.likeCount;
    let isLiked = this.state.isLiked;

    if (!isLiked && likeCount >= 0) {
      likeCount += 1;
      this.setState({ likeCount, isLiked: !isLiked });
      console.log("liked");
    } else {
      if (likeCount >= 0) {
        likeCount -= 1;
        this.setState({ likeCount, isLiked: !isLiked });
        console.log("unliked");
      }
    }
    axios
      .post(
        `https://wryteapp.herokuapp.com/api/user/writing/${this.props.writing._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status !== 200) throw new Error("could not like writing");
        this.getWriting();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ redirectToLogin: true });
        // throw new Error(err);
      });
  };

  writingShareHandler = () => {
    console.log("link copied");
    this.setState({ linkCopied: true });
    setTimeout(() => {
      this.setState({ linkCopied: false });
    }, 3000);
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="writing_div">
        <h4 className="writing_title">{this.props.writing.title}</h4>
        <p className="writig_text">
          {this.props.writing.content.substr(
            0,
            this.state.maxLengthInWritingCard
          )}
          {this.props.writing.content.length > this.state.maxLengthInWritingCard
            ? "..."
            : ""}
        </p>
        <Button
          classes="btn btn-secondary read-more-btn"
          link={`/w/${this.props.writing._id}`}
        >
          Read more
        </Button>
        <section className="writing_buttons">
          <span className="like_button_info">
            <i
              className={[
                "fa",
                this.state.isLiked ? "fa-thumbs-up" : "fa-thumbs-o-up",
              ].join(" ")}
              aria-hidden="true"
              onClick={this.writingLikeHandler}
            ></i>
            <p>{this.state.likeCount}</p>
          </span>
          <span className="comment_button_info">
            <Button link={`/w/${this.props.writing._id}`} classes="comment_btn">
              <i
                className="fa fa-comment-o"
                aria-hidden="true"
                // onClick={this.writingCommentHandler}
              ></i>
            </Button>

            <p>{this.props.writing.comments.length}</p>
          </span>
          <span className="share_button_info">
            <i
              className="fa fa-paper-plane-o"
              aria-hidden="true"
              onClick={this.writingShareHandler}
            ></i>
            {this.state.linkCopied && <p>copied!</p>}
          </span>
        </section>
        <div className="writing_footer">
          <div className="author-info">
            <Image
              src={this.props.writing.created_by.profilePicture}
              alt="author-image"
              classes=""
              containerClasses=""
              maxHeight="30px"
              maxWidth="30px"
              height="30px"
              borderRadius="50%"
            />
            {/* <div className="writing-profile-picture">
            <img src={this.state.profilePicSrc} alt="author-image" />
          </div> */}
            <p>{this.props.writing.created_by.username}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Writing;
