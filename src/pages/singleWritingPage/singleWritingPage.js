import React, { Component, useState, useEffect } from "react";

import "./singleWritingPage.css";

const SingleWritingPage = (props) => {
  useEffect(() => {
    console.log(props.match.params.writingId);
  });
  return (
    <div className="container container-main">
      <div className="container-div">
        <div className="author-box">
          <div className="author-profile-picture">
            <img
              src="https://i.ibb.co/r6K6JJn/altophoto-17-10-12-19-02-2018.png"
              alt="author profile picture"
              className="author-profle-picture__image"
            />
          </div>
          <div className="author-username">
            <p className="author-username__p">usernameHere</p>
          </div>
        </div>
        <div className="writing-box">
          <h4 className="writing-title">writing title</h4>
          <p className="writing-content">writing body</p>
        </div>
      </div>
    </div>
  );
};

export default SingleWritingPage;
