import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";
import Image from "../../components/commonComponents/image/image";
import Comment from "../../components/comment/comment";
import { required } from "../../utils/validators";

import "./singleWritingPage.css";

class SingleWritingPage extends Component {
  state = {
    comments: [],
    writingData: null,
    isLiked: false,
    likeCount: 0,
    linkCopied: false,
    formIsValid: false,
    redirectToLogin: false,
    isReply: false,
    replyTo: {},
    commentContent: {
      value: "",
      valid: false,
      touched: false,
    },
  };

  componentDidMount() {
    this.getWriting();
  }

  getWriting = () => {
    axios
      .get(
        `https://wryteapp.herokuapp.com/api/writing/${this.props.match.params.writingId}`
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
    let likeCount = this.state.likeCount;
    let isLiked = this.state.isLiked;
    const accessToken = localStorage.getItem("accessToken");
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
        `https://wryteapp.herokuapp.com/api/user/writing/${this.state.writingData._id}/like`,
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
        throw new Error(err);
      });
  };

  writingShareHandler = () => {};

  commentInputHandler = (e) => {
    if (required(e.target.value)) {
      const comment = {
        value: e.target.value,
        valid: true,
        touched: true,
      };
      this.setState({ commentContent: comment, formIsValid: true });
    } else {
      const comment = {
        value: e.target.value,
        valid: false,
        touched: true,
      };
      this.setState({ commentContent: comment, formIsValid: false });
    }
  };

  commentSubmitHandler = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      this.setState({ redirectToLogin: true });
      return;
    }
    const commentContent = this.state.commentContent;
    const data = JSON.stringify({ content: commentContent.value });
    if (this.state.isReply) {
      axios
        .post(
          `https://wryteapp.herokuapp.com/api/user/writing/comment/${this.state.replyTo._id}/reply`,
          data,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          // if (response.status !== 200)
          //   throw new Error("couldn't create comment");
          this.getWriting();
        })
        .catch((err) => {
          console.log(err);
          // this.setState({ redirectToLogin: true });
        });
    } else {
      axios
        .post(
          `https://wryteapp.herokuapp.com/api/user/writing/${this.state.writingData._id}/comment/create`,
          data,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status !== 200)
            throw new Error("couldn't create comment");
          this.getWriting();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ redirectToLogin: true });
        });
    }
    this.setState({
      formIsValid: false,
      replyTo: {},
      isReply: false,
      commentContent: {
        value: "",
        valid: false,
        touched: false,
      },
    });
  };

  deleteCommentHandler = (commentId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      this.setState({ redirectToLogin: true });
    }
    axios
      .delete(
        `https://wryteapp.herokuapp.com/api/user/writing/${this.state.writingData._id}/comment/${commentId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // if(result.status !== 200)
        console.log(response.data);
        this.getWriting();
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ redirectToLogin: true });
      });
  };

  commentLikeHandler = (commentId) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      this.setState({ redirectToLogin: true });
    }

    axios
      .post(
        `https://wryteapp.herokuapp.com/api/user/writing/comment/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) throw new Error("couldn't like comment");
        this.getWriting();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  replyClickHandler = (receiver) => {
    this.setState({
      replyTo: receiver,
      isReply: true,
      commentContent: {
        value: `@${receiver.created_by.username} `,
        valid: false,
        touched: false,
      },
    });
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    if (!this.state.writingData)
      return (
        <div className="container container-main">
          <div className="container-div">fetching data...</div>
        </div>
      );
    let tags = "";
    this.state.writingData.tags.forEach((tag) => {
      tags += tag;
      tags += " ";
    });
    return (
      <div className="container container-main">
        <div className="container-div">
          <div className="author-box">
            <Image
              src={this.state.writingData.created_by.profilePicture}
              maxWidth="50px"
              maxHeight="50px"
              height="50px"
              classes=""
              containerClasses=""
              borderRadius="50%"
            />
            {/* <div className="author-profile-picture">
              <img
                src={profilePictureSrc}
                alt="author profile picture"
                className="author-profle-picture__image"
              />
            </div> */}
            <div className="author-username">
              <p className="author-username__p">
                {this.state.writingData.created_by.username}
              </p>
            </div>
          </div>
          <div className="writing-box">
            <h4 className="writing-title">{this.state.writingData.title}</h4>
            <p className="writing-content">{this.state.writingData.content}</p>
            <p className="writing-tags">Tags: {tags} </p>
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
              <span className="share_button_info">
                <i
                  className="fa fa-paper-plane-o"
                  aria-hidden="true"
                  onClick={this.writingShareHandler}
                ></i>
                {this.state.linkCopied && <p>copied!</p>}
              </span>
            </section>
          </div>
        </div>
        <div className="writing_comments_section container-div">
          <div className="writing_comments">
            {this.state.writingData.comments.map((comment, index) => (
              <Comment
                key={index}
                data={comment}
                deleteCommentHandler={this.deleteCommentHandler}
                commentLikeHandler={this.commentLikeHandler}
                replyClickHandler={this.replyClickHandler}
              />
            ))}

            <form
              className="writing_comment_form"
              onSubmit={this.commentSubmitHandler}
            >
              <Input
                classes="writing_comment_input"
                placeholder="write comment here"
                label={null}
                value={this.state.commentContent.value}
                valid={this.state.commentContent.valid}
                touched={this.state.commentContent.touched}
                onChange={this.commentInputHandler}
              />
              <Button
                type="submit"
                classes="btn btn-primary"
                disabled={this.state.formIsValid ? "" : "disabled"}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleWritingPage;
