import React, { Component } from "react";
import openSocket from "socket.io-client";
import "./chatPage.css";

const socket = openSocket("http://localhost:8080");

class ChatPage extends Component {
  state = {
    message: "",
    user: null
  };

  componentDidMount() {}

  loadChat = () => {
    console.log(this.props.isAuth);
    socket.on("message", data => {
      console.log(data);
      this.appendMessage(data);
    });
  };

  appendMessage = msg => {
    let ulElment = document.querySelector("#messageList");
    let li = document.createElement("li");
    let text = document.createTextNode(msg);
    li.appendChild(text);
    ulElment.appendChild(li);
  };

  inputChangeHandler = msg => {
    this.setState({ message: msg });
  };

  sendMessage = e => {
    e.preventDefault();
    var inputField = e.target[0];
    socket.emit("message", this.state.message);
    inputField.value = "";
    return false;
  };

  render() {
    return (
      <div className="container" style={{ height: "500px" }}>
        <h1 style={{ textAlign: "center" }}>chat page</h1>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: "2", background: "white" }}>
            <h4 className="online_users_title">Online users</h4>
            <ul className="online_users_list">
              <li>user 1</li>
              <li>user 2</li>
            </ul>
          </div>
          <div
            style={{
              flex: "10",
              background: "white",
              height: "100%"
            }}
          >
            <div
              className="chat_box"
              style={{ position: "relative", height: "100%" }}
            >
              <ul id="messageList" className="w-100">
                <li>hello</li>
                <li>hey</li>
              </ul>
              <form
                className="chat_form w-100"
                style={{ display: "flex", position: "absolute", bottom: "0px" }}
                onSubmit={e => this.sendMessage(e)}
              >
                <input
                  style={{ flex: "8" }}
                  type="text"
                  name="message"
                  onChange={e => this.inputChangeHandler(e.target.value)}
                  placeholder="enter message here"
                />
                <button className="btn btn-primary">send</button>
              </form>
            </div>
          </div>
          <div
            style={{
              boxShadow: "-5px 3px 36px 11px #92c7ff98",
              width: "0px",
              height: "32rem",
              zIndex: "-1"
            }}
          ></div>
        </div>
        <script>$(function() {this.loadChat()});</script>
      </div>
    );
  }
}

export default ChatPage;
