import React, { Component } from "react";
import axios from "axios";

import "./styles.scss";

class Card extends Component {
  state = {
    photosData: [],
    photoPostId: "",
  };

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

  onLikeClick() {
    alert("like");
  }

  onCommentClick(photoPostId) {
    console.log({
      1: photoPostId,
      2: this.props.user.id,
      3: this.state[photoPostId],
    });
  }

  render() {
    return this.state.photosData.map((photo) => (
      <div className="card" key={photo.id}>
        <div className="card__author-container">
          <img src={photo.author.profilePicture} alt="logo" className="card__profilePicture" />
          <span>{photo.author.name}</span>
        </div>
        <div>
          <div>{photo.description}</div>
          <img src={photo.URL} alt="logo" className="card__userPicture" />
        </div>
        <div className="card__reactions-container">
          <i
            className="fas fa-heart card__reactions-container__like-button"
            onClick={this.onLikeClick.bind(this)}
          >
            {photo.like.length}
          </i>
          <i
            className="fas fa-heart-broken card__reactions-container__dislike-button"
            onClick={this.onLikeClick.bind(this)}
          >
            {photo.disLike.length}
          </i>
        </div>
        {/* /////////////////// */}
        {photo.comments.map((pho) => (
          <div className="card__comments-container" key={pho.authorComment.id}>
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
          <img src={this.props.user.profilePicture} alt="logo" className="card__profilePicture" />
          <input
            type="text"
            className="card__input-comment"
            value={this.state[photo.id]}
            onChange={(e) => this.setState({ [photo.id]: e.target.value })}
          ></input>
          <button
            className="card__post-button"
            onClick={() => {
              this.onCommentClick(photo.id);
            }}
            disabled={this.state[photo.id] && this.state[photo.id].length === 0}
          >
            post
          </button>
        </div>
      </div>
    ));
  }
}

export default Card;
