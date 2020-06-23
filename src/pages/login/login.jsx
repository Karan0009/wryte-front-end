import React, { Component } from "react";
import "./login.css";

import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";

class LoginPage extends Component {
  state = {
    user: {
      email: "",
      password: "",
    },
  };

  inputChangeHandler = (e) => {
    let user = this.state.user;
    let targetId = e.target.id;
    if (targetId === "email") user.email = e.target.value;
    else if (targetId === "password") user.password = e.target.value;

    this.setState({ user });
  };

  // handleLogin = (e) => {

  //   this.setState({
  //     user: {
  //       email: "",
  //       password: "",
  //     },
  //   });
  // };

  render() {
    return (
      <div className="container">
        <h3 className="mt-5" style={{ textAlign: "center" }}>
          Login form
        </h3>
        <form
          className="input_form mt-5"
          onSubmit={(e) => this.props.loginHandler(e, this.state.user)}
        >
          <Input
            type="email"
            label="Email"
            id="email"
            placeholder="Enter email"
            value={this.state.user.email}
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <Input
            type="password"
            className="form-control"
            id="password"
            label="Password"
            value={this.state.user.password}
            placeholder="Password"
            onChange={(e) => this.inputChangeHandler(e)}
          />
          <Button type="submit" classes="btn btn-primary">
            Log in
          </Button>
          <br />
          <Button link="/signup" classes="signin-link">
            New User?
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
