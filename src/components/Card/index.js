import React, { Component } from "react";
import axios from "axios";

import "./styles.scss";

class Card extends Component {
  state = {
    photosData: [],
  };

  // componentDidMount() {
  //   axios
  //     .get(`http://localhost:5000/photos/${this.props.userId}`)
  //     .then((resp) => {
  //       this.setState({
  //         authorName: this.props.userName,
  //         authorProfilePicture: this.props.profilePicture,
  //         authorPhoto: resp.data.URL,
  //         like: [],
  //         dislike: [],
  //         usersComments: [],
  //         userName: resp.data.name,
  //         userPhoto: resp.data.profilePicture,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  componentDidMount() {
    axios
      .get("http://localhost:5000/photos")
      .then((resp) => {
        this.setState({
          photosData: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return this.state.photosData.map((photo) => (
      <div className="card">
        <div className="card__author-container">
          <img
            src={photo.author.profilePicture}
            alt="logo"
            className="card__profilePicture"
          />
          <span>{photo.author.name}</span>
        </div>
        <div>
          <img src={photo.URL} alt="logo" className="card__userPicture" />
        </div>
        <div className="card__reactions-container">
          <i className="fas fa-heart">{photo.like.length}</i>
          <i className="fas fa-heart-broken">{photo.disLike.length}</i>
        </div>
        {/* /////////////////// */}
        {photo.comments.map((pho) => (
          <div className="card__comments-container">
            <img
              src={pho.authorComment.profilePicture}
              alt="logo"
              className="card__profilePicture"
            />
            <div className="card__comments-container__comment">
              <span>{pho.authorComment.name}</span>
              <span>{pho.comment}</span>
            </div>
          </div>
        ))}
        {/* /////////////////// */}
        <div className="card__author-comment">
          <img
            src="https://www.esafety.gov.au/sites/default/files/2019-07/protect_your_personal_information_0.jpg"
            alt="logo"
            className="card__profilePicture"
          />
          <input type="text"></input>
        </div>
      </div>
    ));
  }
}

export default Card;
