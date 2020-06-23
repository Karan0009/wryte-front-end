import React, { Component } from "react";
import { Link } from "react-router-dom";

import { required, length, email, checkMimeType } from "../../utils/validators";

import "./signup.css";

import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      signupForm: {
        firstName: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 2 })],
        },
        lastName: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 2 })],
        },
        username: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 3 })],
        },
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
        profilePicture: {
          value: null,
          valid: false,
          touched: false,
          validators: [],
        },
      },
      formIsValid: false,
    };
  }

  inputChangeHandler = (e) => {
    const signupForm = this.state.signupForm;
    let isValid = true;
    if (signupForm[e.target.id].validators.length > 0)
      for (const validator of signupForm[e.target.id].validators) {
        isValid = isValid && validator(e.target.value);
      }
    signupForm[e.target.id] = {
      ...signupForm[e.target.id],
      value: e.target.value,
      valid: isValid,
    };
    let formIsValid = true;
    for (const inputId in signupForm)
      formIsValid = formIsValid && signupForm[inputId].valid;
    this.setState({ signupForm, formIsValid: formIsValid });
  };

  inputFileHandler = (e) => {
    const signupForm = this.state.signupForm;
    const errors = this.state.errors;
    signupForm.profilePicture.value = e.target.files[0];
    if (checkMimeType(e) && required(e.target.value)) {
      signupForm.profilePicture.valid = true;
      this.setState({ signupForm });
    } else {
      signupForm.profilePicture.value = null;
      signupForm.profilePicture.valid = false;
      this.setState({ signupForm });
      const err = new Error("invalid file type");
      // console.log(err.toString().split(":")[1]);
      errors.push(err);
      this.setState({ errors });
    }
  };

  inputBlurHandler = (e) => {
    const inputId = e.target.id;
    const signupForm = this.state.signupForm;
    signupForm[inputId].touched = true;
    this.setState({ signupForm });
  };

  render() {
    return (
      <div className="container">
        <h3 className="mt-5" style={{ textAlign: "center" }}>
          Sign up form
        </h3>
        <form
          className="input_form mt-5"
          onSubmit={(e) => this.props.signupHandler(e, this.state.signupForm)}
        >
          <Input
            type="file"
            label="Profile Picture"
            name="profilePicture"
            id="profilePicture"
            classes=""
            onBlur={this.inputBlurHandler}
            onChange={this.inputFileHandler}
            valid={this.state.signupForm["profilePicture"].valid}
            touched={this.state.signupForm.profilePicture.touched}
          />
          <Input
            type="text"
            label="First Name"
            id="firstName"
            classes=""
            value={this.state.signupForm.firstName.value}
            valid={this.state.signupForm.firstName.valid}
            touched={this.state.signupForm.firstName.touched}
            placeholder="first name"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Input
            type="text"
            label="Last Name"
            id="lastName"
            classes=""
            value={this.state.signupForm.lastName.value}
            valid={this.state.signupForm.lastName.valid}
            touched={this.state.signupForm.lastName.touched}
            placeholder="last name"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Input
            type="text"
            id="username"
            classes=""
            label="Username"
            value={this.state.signupForm.username.value}
            valid={this.state.signupForm.username.valid}
            touched={this.state.signupForm.username.touched}
            placeholder="Enter username"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />

          <Input
            type="email"
            label="Email"
            classes=""
            id="email"
            placeholder="Enter email"
            value={this.state.signupForm.email.value}
            valid={this.state.signupForm.email.valid}
            touched={this.state.signupForm.email.touched}
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />

          <Input
            type="password"
            className="form-control"
            id="password"
            label="Password"
            classes=""
            value={this.state.signupForm.password.value}
            valid={this.state.signupForm.password.valid}
            touched={this.state.signupForm.password.touched}
            placeholder="Password"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />

          <Button
            type="submit"
            classes="btn btn-primary"
            disabled={!this.state.formIsValid ? "disabled" : ""}
          >
            Sign up
          </Button>
          <br />
          <Button link="/login" classes="signin-link">
            Already have an account?
          </Button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
