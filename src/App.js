import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Nav from "./components/commonComponents/nav/nav";
import Genres from "./components/genres/genres";
import Alert from "./components/commonComponents/alert/alert";

import WritePage from "./pages/write/write";
import ProfilePage from "./pages/profile/profile";
import SingleWritingPage from "./pages/singleWritingPage/singleWritingPage";
import SignupPage from "./pages/signup/signUp";
import LoginPage from "./pages/login/login";
import SingleGenrePage from "./pages/singleGenre/singleGenre";
import EditProfilePage from "./pages/editProfile/editProfile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: "4Writers",
      genres: [],
      error: null,
      isAlerted: true,
      alertMessage: "",
      userId: "",
      accessToken: "",
      isAuth: false,
      authLoading: false,
      urlOfPage: "",
    };
  }

  componentDidMount() {
    this.getGenres();
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!accessToken || !userId || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const remainingMilliSeconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({
      accessToken,
      userId,
      isAuth: true,
      urlOfPage: window.location.href,
    });
    this.setAutoLogout(remainingMilliSeconds);
  }

  componentDidUpdate() {
    if (window.location.href !== this.state.urlOfPage) {
      console.log(window.location.href);
      this.setState({ urlOfPage: window.location.href });
    }
  }

  catchError = (err) => {
    console.log(err);
    const error = this.state.error;
    this.setState({ error });
  };

  getGenres = () => {
    axios
      .get("https://wryteapp.herokuapp.com/api/genres")
      .then((response) => {
        if (response.status !== 200) throw new Error("failed to fetch Genres");
        this.setState({ genres: response.data.data.genres });
      })
      .catch(this.catchError);
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
    this.setState({ authLoading: true });
    axios
      .post(
        "https://wryteapp.herokuapp.com/api/login",
        {
          email: authData.email,
          password: authData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        console.log(res.data);
        this.setState({
          accessToken: res.data.data.tokens.accessToken,
          userId: res.data.data.user._id,
          isAuth: true,
          authLoading: false,
        });
        localStorage.setItem("accessToken", this.state.accessToken);
        localStorage.setItem("userId", this.state.userId);
        //3 hours
        const remainingMilliSeconds = 3 * 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliSeconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliSeconds);
        console.log(res.data);
        this.props.history.push("/");
        this.setAlertMessage("you are logged in");
        this.alertMessageHandler();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          token: null,
          userId: null,
          authLoading: false,
          error: err,
        });
        this.setAlertMessage("wrong credentials");
        this.alertMessageHandler();
      });
  };

  logoutHandler = () => {
    console.log("user logged out");
    this.setState({
      token: null,
      userId: null,
      isAuth: false,
    });
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  setAutoLogout = (mS) => {
    setTimeout(() => {
      this.logoutHandler();
    }, mS);
  };

  signupHandler = (e, authData) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", authData.profilePicture.value);
    formData.append("name", authData.name.value);
    formData.append("bio", authData.bio.value);
    formData.append("username", authData.username.value);
    formData.append("email", authData.email.value);
    formData.append("password", authData.password.value);
    console.log(authData.password.value);
    axios
      .post("https://wryteapp.herokuapp.com/api/signup", formData)
      .then((res) => {
        console.log(res.data);
        this.setAlertMessage("now login");
        this.alertMessageHandler();
        this.props.history.replace("/login");
      })
      .catch(this.catchError);
  };

  render() {
    return (
      <Fragment>
        <Nav
          {...this.props}
          appName={this.state.appName}
          isAuth={this.state.isAuth}
          urlOfPage={this.state.urlOfPage}
          logoutHandler={this.logoutHandler}
        />
        {!this.state.isAlerted && (
          <Alert
            error={this.state.error}
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
              <LoginPage
                {...props}
                authLoading={this.state.authLoading}
                loginHandler={this.loginHandler}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <SignupPage {...props} signupHandler={this.signupHandler} />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route
            exact
            path="/edit-profile"
            render={(props) => <EditProfilePage {...props} />}
          />
          <Route
            exact
            path="/"
            render={() => <Genres genres={this.state.genres} />}
          />
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
            render={(props) => (
              <SingleGenrePage {...props} genres={this.state.genres} />
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
// export default App;
