import React from "react";

// import Input from "../../components/commonComponents/input/input";
// import Textarea from "../../components/commonComponents/textarea/textarea";
// import Button from "../../components/commonComponents/Button/Button";
import Image from "../../components/commonComponents/image/image";

import "./comment.css";

const Comment = (props) => {
  return (
    <div>
      <div className="writing_comment_box">
        <div className="writing_comment_data">
          <div className="writing_comment_userdata">
            <Image
              src={props.data.created_by.profilePicture}
              maxWidth="30px"
              maxHeight="30px"
              height="30px"
              classes=""
              containerClasses="writing_comment_authorimage"
              borderRadius="50%"
            />
            <p>{props.data.created_by.username}</p>
          </div>
          <p className="writing_comment_content">{props.data.content}</p>
        </div>
        <div className="writing_comment_interaction">
          <span
            className="writing_comment_like"
            onClick={() => props.commentLikeHandler(props.data._id)}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            <p>{props.data.liked_by.length}</p>
          </span>
          <span
            className="writing_comment_reply"
            onClick={() => props.replyClickHandler(props.data)}
          >
            <i className="fa fa-reply" aria-hidden="true"></i>
            <p>{props.data.replies.length}</p>
          </span>
        </div>
        {props.data.created_by._id === localStorage.getItem("userId") && (
          <div
            className="writing_comment_delete"
            onClick={() => props.deleteCommentHandler(props.data._id)}
          >
            <i className="fa fa-trash" aria-hidden="true">
              delete
            </i>
          </div>
        )}
      </div>
      {/* replies  */}
      <div className="comment_replies_box">
        {props.data.replies.map((reply) => (
          <div className="writing_comment_box">
            <div className="writing_comment_data">
              <div className="writing_comment_userdata">
                <Image
                  src={reply.created_by.profilePicture}
                  maxWidth="30px"
                  maxHeight="30px"
                  height="30px"
                  classes=""
                  containerClasses="writing_comment_authorimage"
                  borderRadius="50%"
                />
                <p>{reply.created_by.username}</p>
              </div>
              <p className="writing_comment_content">{reply.content}</p>
            </div>
            <div className="writing_comment_interaction">
              <span
                className="writing_comment_like"
                onClick={() => props.commentLikeHandler(reply._id)}
              >
                <i className="fa fa-thumbs-up" aria-hidden="true">
                  like
                </i>
                <p>{reply.liked_by.length}</p>
              </span>
              <span className="writing_comment_reply">
                <i className="fa fa-reply" aria-hidden="true">
                  reply
                </i>
                <p>{reply.replies.length}</p>
              </span>
            </div>
            {reply.created_by._id === localStorage.getItem("userId") && (
              <div
                className="writing_comment_delete"
                onClick={() => props.deleteCommentHandler(reply._id)}
              >
                <i className="fa fa-trash" aria-hidden="true">
                  delete
                </i>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
