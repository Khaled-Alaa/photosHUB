import React, { Component } from "react";

import "./styles.scss";

class uploadImage extends Component {
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
      <>
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
      </>
    );
  }
}

export default uploadImage;
