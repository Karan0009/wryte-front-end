import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./write.css";

import { required, length } from "../../utils/validators";
import Input from "../../components/commonComponents/input/input";
import Textarea from "../../components/commonComponents/textarea/textarea";
import Button from "../../components/commonComponents/Button/Button";

class WritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      error: null,
      writeForm: {
        title: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ max: 30 })],
        },
        genre: {
          value: "fiction",
          valid: false,
          touched: false,
          validators: [required],
        },
        content: {
          value: "",
          valid: false,
          touched: false,
          validators: [required, length({ min: 5 })],
        },
        tags: {
          value: "",
          valid: false,
          touched: false,
          validators: [required],
        },
      },
      redirectToProfile: false,
      formIsValid: false,
    };
  }

  componentDidMount() {
    const writeForm = this.state.writeForm;
    axios
      .get("https://wryteapp.herokuapp.com/api/genres")
      .then((response) => {
        if (response.status !== 200) throw new Error("failed to fetch Genres");
        writeForm["genre"] = {
          ...writeForm["genre"],
          value: response.data.data.genres[0].name,
        };
        this.setState({ genres: response.data.data.genres, writeForm });
      })
      .catch(this.catchError);
  }

  inputChangeHandler = (e) => {
    const writeForm = this.state.writeForm;
    let isValid = true;
    if (writeForm[e.target.id].validators.length > 0)
      for (const validator of writeForm[e.target.id].validators) {
        isValid = isValid && validator(e.target.value);
      }
    writeForm[e.target.id] = {
      ...writeForm[e.target.id],
      value: e.target.value,
      valid: isValid,
    };

    let formIsValid = true;
    for (const inputId in writeForm)
      formIsValid = formIsValid && writeForm[inputId].valid;

    this.setState({ writeForm, formIsValid: formIsValid });
  };

  inputBlurHandler = (e) => {
    const inputId = e.target.id;
    const writeForm = this.state.writeForm;
    writeForm[inputId].touched = true;
    this.setState({ writeForm });
  };

  handleTagsInput = (event) => {
    let writing = this.state.writing;
    let tag = this.state.tag;
    tag = event.target.value;
    if (
      event.target.value.slice(-1) === " " ||
      event.target.value.slice(-1) === "\n"
    ) {
      console.log("tag created");
      const div = document.createElement("div");
      const p = document.createElement("p");
      const span = document.createElement("span");
      span.addEventListener("click", function () {
        const index = writing.tags.indexOf(
          span.parentNode.firstChild.innerHTML
        );
        console.log(index);
        const tags = writing.tags.splice(index, 1);
        writing.tags = tags;
        console.log(writing.tags);
        span.parentElement.remove();
        this.setState({ writing });
      });
      p.innerHTML = tag.trim();
      writing.tags.push(p.innerHTML);
      span.innerHTML = "X";
      div.classList = "tag";
      div.appendChild(p);
      div.appendChild(span);
      event.target.parentNode.appendChild(div);
      tag = "";
    }
    this.setState({ writing, tag });
  };

  publishWritingHandler = (event) => {
    event.preventDefault();
    let writeForm = this.state.writeForm;

    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(
        "https://wryteapp.herokuapp.com/api/user/writing/create",
        {
          title: writeForm.title.value,
          genre: writeForm.genre.value,
          tags: writeForm.tags.value,
          content: writeForm.content.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status !== 201) throw new Error("publishing error");
        this.props.setAlertMessage("published successfully");
        this.props.alertMessageHandler();
        this.setState({ formIsValid: false, redirectToProfile: true });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    console.log(error);
    this.setState({ error: error });
  };

  render() {
    if (!localStorage.getItem("accessToken") && !this.props.isAuth)
      return <Redirect to="/login" />;
    if (this.state.redirectToProfile) return <Redirect to="/profile" />;
    return (
      <Fragment>
        <div className="container writeForm_div">
          <form onSubmit={this.publishWritingHandler}>
            <Input
              type="text"
              label="Title"
              id="title"
              classes="write-title"
              placeholder="Write title here"
              min="1"
              value={this.state.writeForm.title.value}
              valid={this.state.writeForm.title.valid}
              touched={this.state.writeForm.title.touched}
              onChange={this.inputChangeHandler}
              onBlur={this.inputBlurHandler}
            />
            <Input
              type="select"
              options={this.state.genres}
              label="Genre"
              id="genre"
              classes="write-genre"
              placeholder="Select Genre"
              min="1"
              value={this.state.writeForm.genre.value}
              valid={this.state.writeForm.genre.valid}
              touched={this.state.writeForm.genre.touched}
              onClick={this.inputChangeHandler}
              onBlur={this.inputBlurHandler}
            />
            <Input
              type="text"
              label="Tags"
              id="tags"
              classes="write-tags"
              value={this.state.writeForm.tags.value}
              valid={this.state.writeForm.tags.valid}
              touched={this.state.writeForm.tags.touched}
              placeholder="Write tags here separated by spaces"
              onChange={this.inputChangeHandler}
              onBlur={this.inputBlurHandler}
            />
            <Textarea
              id="content"
              rows="7"
              classes="write-content"
              placeholder="Write your story here"
              value={this.state.writeForm.content.value}
              valid={this.state.writeForm.content.valid}
              touched={this.state.writeForm.content.touched}
              onChange={this.inputChangeHandler}
              onBlur={this.inputBlurHandler}
            />
            <div className="form-group">
              <Button
                link=""
                type="submit"
                classes="btn btn-primary"
                disabled={this.state.formIsValid ? "" : "disabled"}
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default WritePage;
