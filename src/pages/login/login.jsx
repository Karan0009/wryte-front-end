import React, { Component } from "react";
import "./login.css";

import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";
import { required, length, email } from "../../utils/validators";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        email: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, email],
        },
        password: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 6 })],
        },
      },
      formIsValid: false,
    };
  }

  inputChangeHandler = (e) => {
    const loginForm = this.state.loginForm;
    let isValid = true;
    if (loginForm[e.target.id].validators.length > 0)
      for (const validator of loginForm[e.target.id].validators) {
        isValid = isValid && validator(e.target.value);
      }
    loginForm[e.target.id] = {
      ...loginForm[e.target.id],
      value: e.target.value,
      valid: isValid,
    };

    let formIsValid = true;
    for (const inputId in loginForm)
      formIsValid = formIsValid && loginForm[inputId].valid;

    this.setState({ loginForm, formIsValid: formIsValid });
  };

  inputBlurHandler = (e) => {
    const inputId = e.target.id;
    const loginForm = this.state.loginForm;
    loginForm[inputId].touched = true;
    this.setState({ loginForm });
  };

  render() {
    return (
      <div className="container">
        <h3 className="mt-5" style={{ textAlign: "center" }}>
          Login form
        </h3>
        <form
          className="input_form mt-5"
          onSubmit={(e) =>
            this.props.loginHandler(e, {
              email: this.state.loginForm.email.value,
              password: this.state.loginForm.password.value,
            })
          }
        >
          <Input
            type="email"
            label="Email"
            classes=""
            id="email"
            name="email"
            placeholder="Enter email"
            value={this.state.loginForm.email.value}
            valid={this.state.loginForm.email.valid}
            touched={this.state.loginForm.email.touched}
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Input
            type="password"
            className="form-control"
            id="password"
            name="password"
            label="Password"
            classes=""
            value={this.state.loginForm.password.value}
            valid={this.state.loginForm.password.valid}
            touched={this.state.loginForm.password.touched}
            placeholder="Password"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Button
            type="submit"
            classes="btn btn-primary"
            loading={this.props.authLoading}
            disabled={!this.state.formIsValid ? "disabled" : ""}
          >
            Login
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
