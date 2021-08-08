import React, { Component } from "react";

import "./styles.scss";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.uploadImageController = React.createRef();
  }

  state = {
    image: null,
  };

  onUpload() {
    this.uploadImageController.current.click();
  }

  checkFile(uploadedImages, resolve) {
    const image = uploadedImages[0];
    if (uploadedImages.length !== 0) {
      if (image.type === "image/png" || image.type === "image/gif" || image.type === "image/jpeg") {
        resolve(image);
      } else {
        alert("Please choose an image");
      }
    }
  }

  loadImage(event) {
    const images = event.target.files;
    this.checkFile(images, (image) => {
      this.setState({
        image: image,
      });
    });
  }
  clearState() {
    this.setState({
      image: null,
    });
  }
  createImageURL(image) {
    if (image) {
      return URL.createObjectURL(image);
    }
  }

  render() {
    return (
      <div className="addpost-container">
        <div className="addpost-container__author-post">
          <img
            src={this.props.user.profilePicture}
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
        <div className={`addpost-container__uploaded-photo-frame ${this.state.image == null ? "disappear" : ""}`}>
          <img
            src={this.createImageURL(this.state.image)}
            alt="uploaded image"
            className="addpost-container__uploaded-photo"
          />
        </div>
        <div>
          <input
            ref={this.uploadImageController}
            type="file"
            id="myFile"
            name="filename"
            accept="image/png, image/gif, image/jpeg"
            onChange={this.loadImage.bind(this)}
            className="addpost-container__upload-input"
          />
          <button className="addpost-container__upload-photo" onClick={this.onUpload.bind(this)}>
            Add Photo
          </button>

          {/* <span>{this.state.image == null ? "" : this.state.image.name}</span> */}
          <button
            className="addpost-container__post-button"
            onClick={() => {
              this.props.handlePostPost(this.props.user.id, this.state.image);
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
