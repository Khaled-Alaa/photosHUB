import React, { Component } from "react";

import "./styles.scss";

class Card extends Component {
  getReactions(clickedReact) {
    if (this.props.photo.reactions.length !== 0) {
      const newArray = this.props.photo.reactions.filter((react) => react.type === clickedReact);
      const length = newArray.length;
      return length;
    }else{
      return 0
    }
  }
  render() {
    return (
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
            onClick={(e) =>
              this.props.handleReactionsClick("like", this.props.user, this.props.photo)
            }
          >
            {this.getReactions("like")}
          </i>
          <i
            className="fas fa-heart-broken card__reactions-container__dislike-button"
            onClick={(e) =>
              this.props.handleReactionsClick("dislike", this.props.user, this.props.photo)
            }
          >
            {this.getReactions("dislike")}
          </i>
        </div>
        {/* /////////////////// */}
        {this.props.photo.comments.map((comment, index) => (
          <div
            className="card__comments-container"
            key={`${comment.authorComment.id}` - `${index}`}
          >
            <img
              src={comment.authorComment.profilePicture}
              alt="logo"
              className="card__profilePicture"
            />
            <div className="card__comments-container__comment">
              <span>{comment.authorComment.name}</span>
              <span>{comment.comment}</span>
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
    );
  }
}

export default Card;
