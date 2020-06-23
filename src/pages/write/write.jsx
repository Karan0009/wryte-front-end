import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "./write.css";

import Alert from "../../components/commonComponents/alert/alert";
import Input from "../../components/commonComponents/input/input";
import Button from "../../components/commonComponents/Button/Button";

class WritePage extends Component {
  constructor(props) {
    super(props);
    if (!this.props.isAuth) this.props.redirectToLogin();
    this.state = {
      genres: [],
      error: null,
      tags: "",
      writing: {
        title: "",
        genre: "",
        content: "",
        tags: [],
      },
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/genres", {
      method: "GET",
    })
      .then((res) => {
        if (res.status !== 200) throw new Error("failed to fetch Genres");
        return res.json();
      })
      .then((resData) => {
        this.setState({ genres: resData.genres });
      })
      .catch(this.catchError);
  }

  inputChangeHandler = (event) => {
    let writing = this.state.writing;
    let tags = this.state.tags;
    if (event.target.id === "title") {
      writing.title = event.target.value;
    } else if (event.target.id === "writing-content") {
      writing.content = event.target.value;
    } else if (event.target.id === "genre") {
      writing.genre = event.target.value;
    } else if (event.target.id === "tags") {
      tags = event.target.value;
    }
    this.setState({ writing, tags });
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

  // handleOptionClick = (event) => {
  //   let writing = this.state.writing;
  //   if (event.target.value !== "" || event.target.value !== undefined) {
  //     if (
  //       writing.genres.find((genre) => genre === event.target.value) ==
  //       undefined
  //     ) {
  //       writing.genres.push(event.target.value);
  //     } else {
  //       writing.genres = writing.genres.filter((genre) => {
  //         if (genre !== event.target.value) return genre;
  //       });
  //     }
  //     this.setState({ writing });
  //   }
  // };

  publishWritingHandler = (event) => {
    event.preventDefault();
    let tags = this.state.tags;
    let writing = this.state.writing;
    writing.tags = tags.trim().split(" ");
    console.log(this.state.writing);
    this.setState({
      writing: { title: "", genre: "", content: "", tags: [] },
      tags: "",
    });
    this.props.setAlertMessage("published successfully");
    this.props.alertMessageHandler();

    // fetch("http://localhost:8080/write", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({
    //     title: this.state.writing.title,
    //     category: this.state.writing.category,
    //     genres: this.state.writing.genres,
    //     content: this.state.writing.content
    //   })
    // })
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Can't publish");
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     this.props.setAlertMessage("writing published successful!!");
    //     this.props.alertMessageHandler();
    //     console.log(resData);
    //     this.setState({
    //       writing: { title: "", category: "", content: "", genres: [] },
    //       genres: ""
    //     });
    //   })
    //   .catch(this.catchError);
  };

  catchError = (error) => {
    console.log(error);
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <div className="container writeForm_div">
          <form onSubmit={(e) => this.publishWritingHandler(e)}>
            <Input
              type="text"
              label="Title"
              id="title"
              classes="write-title"
              placeholder="Write title here"
              min="1"
              value={this.state.writing.title}
              onChange={(e) => this.inputChangeHandler(e)}
            />
            <Input
              type="select"
              options={this.state.genres}
              label="Genre"
              id="genre"
              classes="write-genre"
              placeholder="Select Genre"
              min="1"
              value={this.state.writing.genre}
              onClick={(e) => this.inputChangeHandler(e)}
            />
            <Input
              type="text"
              label="Tags"
              id="tags"
              classes="write-tags"
              value={this.state.tags}
              placeholder="Write tags here separated by spaces"
              onChange={(e) => this.inputChangeHandler(e)}
            />
            <Input
              type="textarea"
              id="writing-content"
              classes="write-content"
              placeholder="Write your story here"
              value={this.state.writing.content}
              onChange={(e) => this.inputChangeHandler(e)}
            />
            <div className="form-group">
              <Button
                link=""
                type="submit"
                classes="btn btn-primary"
                onClick={(e) => this.publishWritingHandler(e)}
              >
                Publish
              </Button>
            </div>
            {/* <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                value={this.state.writing.title}
                onChange={(e) => this.inputChangeHandler(e)}
                placeholder="Some Title"
              />
            </div>
            <div class="form-group">
              <label for="genres">Select max 5 genres</label>
              <select
                multiple={true}
                class="form-control"
                value={this.state.writing.genres}
                onChange={(e) => this.inputChangeHandler(e)}
                id="genres"
              >
                {this.state.categories.map((category) => (
                  <option
                    key={category.name}
                    onClick={(e) => this.handleOptionClick(e)}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="writtenContent">Type your content here</label>
              <textarea
                class="form-control"
                id="writtenContent"
                value={this.state.writing.content}
                onChange={(e) => this.inputChangeHandler(e)}
                rows="4"
              ></textarea>
            </div>
            <div className="form-group"> 
              <button type="submit" className="btn btn-primary">
                Publish
              </button>
            </div>*/}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default WritePage;
