import React, { Component, Fragment } from "react";
import { Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Nav from "./components/commonComponents/nav/nav";
import Genres from "./components/genres/genres";
import Writings from "./components/writings/writings";
import Alert from "./components/commonComponents/alert/alert";

import WritePage from "./pages/write/write";
import ProfilePage from "./pages/profile/profile";
import SingleWritingPage from "./pages/singleWritingPage/singleWritingPage";
import SignupPage from "./pages/signup/signUp";
import LoginPage from "./pages/login/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "4Writers",
      genres: [],
      error: null,
      isAlerted: true,
      alertMessage: "",
      userId: "1",
      token: "asdfsadfsdf",
      isAuth: false,
    };
  }

  componentDidMount() {
    console.log("mounting occurs");
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

  catchError = (err) => {
    const error = this.state.error;
    this.setState({ error });
  };

  // activeGenreHandler = (name, activeStatus) => {
  //   console.log(name, activeStatus);
  //   let activeGenres = [...this.state.activeGenres];
  //   if (!activeStatus) {
  //     // category is now active so add to the activeGenres
  //     activeGenres.push(name);
  //   } else {
  //     activeGenres = activeGenres.filter((genre) => {
  //       if (genre !== name) return genre;
  //     });
  //   }
  //   this.setState({ activeGenres });
  // };

  alertMessageHandler = () => {
    this.setState({ isAlerted: !this.state.isAlerted });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  setAlertMessage = (msg) => {
    this.setState({ alertMessage: msg });
  };

  loginHandler = (e, authData) => {
    e.preventDefault();
    console.log("you are logged in");
    this.props.history.push("/");
    this.setAlertMessage("you are logged in");
    this.alertMessageHandler();
  };

  signupHandler = (e, authData) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", authData.profilePicture.value);
    formData.append("firstName", authData.firstName.value);
    formData.append("lastName", authData.lastName.value);
    formData.append("username", authData.username.value);
    formData.append("email", authData.email.value);
    formData.append("password", authData.password.value);
    console.log(authData);
    axios
      .post("http://localhost:8080/api/signup", formData)
      .then((res) => {
        // console.log(res);
        console.log(res.data);
      })
      .catch(this.catchError);
    // console.log("new user created");
    // this.props.history.push("/login");
    // this.setAlertMessage("you are signed up");
    // this.alertMessageHandler();
  };

  redirectToLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    return (
      <Fragment>
        <Nav appName={this.state.appName} isAuth={this.state.isAuth} />
        {!this.state.isAlerted && (
          <Alert
            alertMessage={this.state.alertMessage}
            alertMessageHandler={this.alertMessageHandler}
          />
        )}
        {/* <Alert
          alertMessage={this.state.error}
          alertMessageHandler={this.alertMessageHandler}
        /> */}

        <Switch>
          <Route
            exact
            path="/write"
            render={(props) => (
              <WritePage
                {...props}
                isAuth={this.state.isAuth}
                redirectToLogin={this.redirectToLogin}
                genres={this.state.genres}
                setAlertMessage={this.setAlertMessage}
                alertMessageHandler={this.alertMessageHandler}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage {...props} loginHandler={this.loginHandler} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <SignupPage {...props} signupHandler={this.signupHandler} />
            )}
          />
          <Route exact path="/profile" component={ProfilePage} />
          <Route
            exact
            path="/"
            render={() => <Genres genres={this.state.genres} />}
          />
          {/* <Genres
              activeGenreHandler={this.activeGenreHandler}
              genres={this.state.genres}
            /> */}
          <Route
            exact
            path="/w/:writingId"
            render={(props) => <SingleWritingPage {...props} />}
          />
          <Route path="/search">
            <Route
              path="/:searchQuery"
              render={(props) => <div>{props.match.params.searchQuery}</div>}
            ></Route>
          </Route>
          <Route
            exact
            path="/:genreId"
            render={(props) => <Writings {...props} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
// export default App;
