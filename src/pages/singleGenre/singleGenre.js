import React, { Component } from "react";
import { Redirect } from "react-dom";
import axios from "axios";

import Writings from "../../components/writings/writings";
import "./singleGenre.css";

class singleGenrePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genreId: this.props.match.params.genreId,
      writings: [],
      genre: "genre name",
    };
  }
  componentDidMount() {
    axios
      .get(`https://wryteapp.herokuapp.com/api/genre/${this.state.genreId}`)
      .then((res) => {
        if (res.status !== 200) throw new Error("failed to fetch genre name");
        this.setState({ genre: res.data.data.genre.name });
        console.log("from single genre");
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
    this.fetchWritings();
  }

  fetchWritings = () => {
    if (!this.state.genreId) {
      throw new Error("failed to fetch writings");
    }
    axios
      .get(
        `https://wryteapp.herokuapp.com/api/genre/writings/${this.state.genreId}`
      )
      .then((res) => {
        if (res.status !== 200) {
          console.log("error!!");
          throw new Error("failed to fetch writings");
        }
        this.setState({ writings: res.data.data.writings });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  };

  render() {
    if (this.state.redirectToLogin) return <Redirect to="/login" />;
    return (
      <div className="container">
        <h4 className="genre_name">{this.state.genre}</h4>
        <Writings writings={this.state.writings} />
      </div>
    );
  }
}

export default singleGenrePage;
