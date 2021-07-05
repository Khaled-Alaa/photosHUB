import React, { Component } from "react";
import axios from "axios";

import "./styles.scss";

class Card extends Component {
  // state = {
  //   photosData: [],
  //   photoPostId: "",
  // };

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5000/photos")
  //     .then((resp) => {
  //       this.setState({
  //         photosData: resp.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // onLikeClick() {
  //   alert("like");
  // }

  // onCommentClick(photoPostId) {
  //   axios
  //     .post("http://localhost:5000/photos/comment", {
  //       imageId: photoPostId,
  //       commentAuhtorId: this.props.user.id,
  //       comment: this.state[photoPostId],
  //     })
  //     .then((resp) => {
  //       debugger;
  //       if (resp.statusText === "OK") {
  //         this.setState({
  //           [photoPostId]: "",
  //         });
  //         this.componentDidMount();
  //       }
  //     })
  //     .catch((error) => {
  //       alert("failed to post comment!");
  //     });
  // }

  render() {
    return (
      // this.props.photos.map((photo) => (
      <div className="card" key={this.props.photo.id}>
        <div className="card__author-container">
          <img
            src={this.props.photo.author.profilePicture}
            alt="logo"
            className="card__profilePicture"
          />
          <span>{this.props.photo.author.name}</span>
        </div>
        <div>
          <div>{this.props.photo.description}</div>
          <img src={this.props.photo.URL} alt="logo" className="card__userPicture" />
        </div>
        <div className="card__reactions-container">
          <i
            className="fas fa-heart card__reactions-container__like-button"
            onClick={(e) => this.props.handleReactionsClick("like")}
          >
            {this.props.photo.like.length}
          </i>
          <i
            className="fas fa-heart-broken card__reactions-container__dislike-button"
            onClick={(e) => this.props.handleReactionsClick("dislike")}
          >
            {this.props.photo.disLike.length}
          </i>
        </div>
        {/* /////////////////// */}
        {this.props.photo.comments.map((pho) => (
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
            value={this.props.comment}
            // onChange={(e) => this.setState({ [this.props.photo.id]: e.target.value })}
            onChange={(e) => this.props.handleComment(e, this.props.photo)}
          ></input>
          <button
            className="card__post-button"
            onClick={() => {
              this.props.handlePostComment(this.props.photo.id);
            }}
            disabled={this.props.comment && this.props.comment.length === 0}
          >
            post
          </button>
        </div>
      </div>
      // ));
    );
  }
}

export default Card;
