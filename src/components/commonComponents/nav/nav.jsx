import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Button from "../Button/Button";

import "./nav.css";

class Nav extends Component {
  state = {
    serachQuery: "sadf",
  };

  searchHandler = () => {
    console.log("hello");
  };

  profileHandler = () => {
    const isAuth = this.props.isAuth;
    if (isAuth) {
      return { link: "/profile", name: "Profile" };
    } else {
      return { link: "/login", name: "Login" };
    }
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        {/* <Link className="navbar-brand col-9" to="/">
          {this.props.appName}
        </Link> */}
        <Button link="/" classes="navbar-brand col-4">
          {this.props.appName}
        </Button>
        <div className="search-container col-3">
          <form className="nav-search-form">
            <input
              type="text"
              className="search-input"
              placeholder="search stories"
              id="search"
            />
            <Button
              link={`/search/${this.state.serachQuery}`}
              classes="nav-search-btn"
              onClick={(e) => this.searchHandler(e)}
            >
              <i className="fa fa-search"></i>
            </Button>
          </form>
        </div>
        {this.props.urlOfPage.includes("profile") && (
          <Button
            onClick={() => {
              this.props.logoutHandler();
            }}
            classes="btn btn-danger btn_profile col-1"
          >
            Logout
          </Button>
        )}
        <Button
          link={this.profileHandler().link}
          classes="btn btn-secondary btn_profile col-1"
        >
          {this.profileHandler().name}
        </Button>
        <Button link="/write" classes="btn btn-warning btn_write col-1">
          Write
        </Button>
      </nav>
    );
  }
}

export default Nav;
