import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { required, length, email, checkMimeType } from "../../utils/validators";

import "./editProfile.css";

import Input from "../../components/commonComponents/input/input";
import Image from "../../components/commonComponents/image/image";
import Textarea from "../../components/commonComponents/textarea/textarea";
import Button from "../../components/commonComponents/Button/Button";

class EditProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      profilePicturePreviewUrl: "https://via.placeholder.com/150",
      redirectToLogin: false,
      editProfileForm: {
        name: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 2 })],
        },
        bio: {
          value: "",
          valid: false,
          touched: false,
          validators: [],
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
        profilePicture: {
          value: null,
          valid: true,
          touched: false,
          validators: [],
        },
      },
      editIsLoading: false,
      formIsValid: false,
    };
  }

  componentDidMount() {
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
        const editProfileForm = this.state.editProfileForm;
        for (let key in editProfileForm) {
          if (key !== "profilePicture") {
            editProfileForm[key].value = res.data.data.user[key];
            editProfileForm[key].valid = true;
            editProfileForm[key].touched = false;
          }
        }
        this.setState({
          editProfileForm,
          formIsValid: true,
          profilePicturePreviewUrl: res.data.data.user.profilePicture,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ redirectToLogin: true });
      });
  }

  inputChangeHandler = (e) => {
    const editProfileForm = this.state.editProfileForm;
    let isValid = true;
    if (editProfileForm[e.target.id].validators.length > 0)
      for (const validator of editProfileForm[e.target.id].validators) {
        isValid = isValid && validator(e.target.value);
      }
    editProfileForm[e.target.id] = {
      ...editProfileForm[e.target.id],
      value: e.target.value,
      valid: isValid,
    };

    let formIsValid = true;
    for (const inputId in editProfileForm)
      formIsValid = formIsValid && editProfileForm[inputId].valid;

    this.setState({ editProfileForm, formIsValid: formIsValid });
  };

  inputFileHandler = (e) => {
    const editProfileForm = this.state.editProfileForm;
    const errors = this.state.errors;
    editProfileForm.profilePicture.value = e.target.files[0];
    if (checkMimeType(e) && required(e.target.value)) {
      editProfileForm.profilePicture.valid = true;
      this.previewFile(editProfileForm.profilePicture.value);
      this.setState({ editProfileForm });
    } else {
      editProfileForm.profilePicture.value = null;
      editProfileForm.profilePicture.valid = false;
      this.setState({ editProfileForm });
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
    const editProfileForm = this.state.editProfileForm;
    editProfileForm[inputId].touched = true;
    this.setState({ editProfileForm });
  };

  editProfileHandler = (e, authData) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    if (authData.profilePicture.value !== null)
      formData.append("profilePicture", authData.profilePicture.value);
    formData.append("name", authData.name.value);
    formData.append("bio", authData.bio.value);
    formData.append("username", authData.username.value);
    formData.append("email", authData.email.value);
    axios
      .put("https://wryteapp.herokuapp.com/api/user/profile/edit", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.replace("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirectToLogin) return <Redirect to="/login" />;
    return (
      <div className="container">
        <h3 className="mt-5" style={{ textAlign: "center" }}>
          Edit profile
        </h3>
        <form
          className="input_form mt-5 mb-5"
          onSubmit={(e) => {
            this.setState({ editIsLoading: true });
            this.editProfileHandler(e, this.state.editProfileForm);
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

          <Input
            type="file"
            label="Profile Picture"
            name="profilePicture"
            id="profilePicture"
            classes=""
            onBlur={this.inputBlurHandler}
            onChange={this.inputFileHandler}
            valid={this.state.editProfileForm["profilePicture"].valid}
            touched={this.state.editProfileForm.profilePicture.touched}
          />

          <Input
            type="text"
            label="Name"
            id="name"
            name="name"
            classes=""
            value={this.state.editProfileForm.name.value}
            valid={this.state.editProfileForm.name.valid}
            touched={this.state.editProfileForm.name.touched}
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
            value={this.state.editProfileForm.bio.value}
            valid={this.state.editProfileForm.bio.valid}
            touched={this.state.editProfileForm.bio.touched}
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
            value={this.state.editProfileForm.username.value}
            valid={this.state.editProfileForm.username.valid}
            touched={this.state.editProfileForm.username.touched}
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
            value={this.state.editProfileForm.email.value}
            valid={this.state.editProfileForm.email.valid}
            touched={this.state.editProfileForm.email.touched}
            onBlur={this.inputBlurHandler}
            onChange={this.inputChangeHandler}
          />
          <Button
            type="submit"
            classes="btn btn-primary mb-3"
            disabled={!this.state.formIsValid ? "disabled" : ""}
            loading={this.state.editIsLoading}
          >
            Done
          </Button>

          <br />

          <Button
            link="/changePassword"
            classes="btn btn-light border border-1"
          >
            Change Password
          </Button>
        </form>
      </div>
    );
  }
}

export default EditProfilePage;
