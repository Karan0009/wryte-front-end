import React, { Component } from "react";
// import { Link } from "react-router-dom";

import { required, length, email, checkMimeType } from "../../utils/validators";

import "./signup.css";

import Input from "../../components/commonComponents/input/input";
import Image from "../../components/commonComponents/image/image";
import Textarea from "../../components/commonComponents/textarea/textarea";
import Button from "../../components/commonComponents/Button/Button";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      profilePicturePreviewUrl: "https://via.placeholder.com/150",
      signupForm: {
        name: {
          value: "asdfsadf",
          valid: true,
          touched: true,
          validators: [required, length({ min: 2 })],
        },
        bio: {
          value: "asdfsdaf",
          valid: true,
          touched: true,
          validators: [],
        },
        username: {
          value: "asdfsf",
          valid: true,
          touched: true,
          validators: [required, length({ min: 3 })],
        },
        email: {
          value: "asdf@asdf.com",
          valid: true,
          touched: true,
          validators: [required, email],
        },
        password: {
          value: "karanSingh@12",
          valid: true,
          touched: true,
          validators: [required, length({ min: 6 })],
        },
        profilePicture: {
          value: null,
          valid: true,
          touched: false,
          validators: [],
        },
      },
      signupLoading: false,
      formIsValid: true,
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
      this.previewFile(signupForm.profilePicture.value);
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

  previewFile = (file) => {
    this.setState({ profilePicturePreviewUrl: URL.createObjectURL(file) });
  };

  inputBlurHandler = (e) => {
    const inputId = e.target.id;
    const signupForm = this.state.signupForm;
    signupForm[inputId].touched = true;
    this.setState({ signupForm });
  };

  // skipImageHandler = (e) => {
  //   const signupForm = this.state.signupForm;
  //   signupForm["profilePicture"] = {
  //     ...signupForm["profilePicture"],
  //     valid: true,
  //   };
  // };

  render() {
    return (
      <div className="container">
        <h3 className="mt-5" style={{ textAlign: "center" }}>
          Sign up form
        </h3>
        <form
          className="input_form mt-5"
          onSubmit={(e) => {
            this.setState({ signupLoading: true });
            this.props.signupHandler(e, this.state.signupForm);
          }}
        >
          <Image
            src={this.state.profilePicturePreviewUrl}
            alt="profile-picture-preview"
            classes=""
            containerClasses=""
            maxHeight="150px"
            maxWidth="150px"
            height="200px"
            borderRadius="50%"
            border="4px solid #0000ff41"
          />
          {/* <div className="profile-picture-preview">
            <img
              src="https://i.ibb.co/r6K6JJn/altophoto-17-10-12-19-02-2018.png"
              className=""
            />
          </div> */}
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
          {/* <Button type="button" classes="" onClick={this.skipImageHandler}>
            Skip profile Picture
          </Button> */}
          <Input
            type="text"
            label="Name"
            id="name"
            name="name"
            classes=""
            value={this.state.signupForm.name.value}
            valid={this.state.signupForm.name.valid}
            touched={this.state.signupForm.name.touched}
            placeholder="Enter Name"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Textarea
            label="About you"
            id="bio"
            name="bio"
            classes=""
            rows="5"
            value={this.state.signupForm.bio.value}
            valid={this.state.signupForm.bio.valid}
            touched={this.state.signupForm.bio.touched}
            placeholder="short intro about you"
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Input
            type="text"
            id="username"
            name="username"
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
            name="email"
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
            name="password"
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
            loading={this.state.signupLoading}
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
