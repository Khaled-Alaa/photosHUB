import React, { Component } from "react";
import UploadImage from "../UploadImage";

import "./styles.scss";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.ImageUploader = React.createRef();
    this.state = {
      image: null,
      imageURL: "",
    };
  }

  createImageURL(image) {
    if (image) {
      this.setState({ image, imageURL: URL.createObjectURL(image) });
    }
  }

  clearState() {
    this.setState({
      image: null,
      imageURL: "",
    });
  }

  render() {
    return (
      <div className="addpost-container">
        <div className="addpost-container__author-post">
          <img
            src={
              this.props.user.profilePicture
                ? this.props.user.profilePicture
                : "/assets/images/dummy-profile-pic.png"
            }
            alt="logo"
            className="addpost-container__profilePicture"
          />
          <input
            type="text"
            className="addpost-container__input-post"
            value={this.props.description}
            placeholder={`What's on your mind, ${this.props.user.name}?`}
            // value={this.props.description || `What's on your mind, ${this.props.user.name}?`}
            // onChange={(e) => this.setState({ [this.props.photo.id]: e.target.value })}
            onChange={(e) => this.props.handleDescription(e, this.props.user.id)}
          ></input>
        </div>
        <div
          className={`addpost-container__uploaded-photo-frame ${
            this.state.image === null ? "disappear" : ""
          }`}
        >
          <img
            src={this.state.imageURL}
            alt="uploaded image"
            className="addpost-container__uploaded-photo"
          />
        </div>
        <div>
          <UploadImage ref={this.ImageUploader} onCreateImageURL={this.createImageURL.bind(this)} />
          <button
            className="addpost-container__cancel-post"
            onClick={() => {
              this.props.handleCancelPost(this.props.user.id);
              this.clearState();
            }}
          >
            Cancel
          </button>
          <button
            className="addpost-container__post-button"
            onClick={() => {
              this.props.handlePostPost(this.props.user.id, this.state.image);
              this.ImageUploader.current.clearState();
              this.clearState();
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

export default AddPost;
