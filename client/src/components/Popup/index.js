import React, { Component } from "react";
import requester from "../../helpers/requester/index";

import UploadImage from "../UploadImage";

import "./styles.scss";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.ImageUploader = React.createRef();
    this.state = {
      image: null,
      imageURL: "",
    };
  }

  createImageURL(image) {
    debugger;
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

  checkImage() {
    if (this.state.imageURL) {
      return this.state.imageURL;
    } else {
      if (this.props.user.profilePicture) {
        return this.props.user.profilePicture;
      } else {
        return "/assets/images/dummy-profile-pic.png";
      }
    }
  }

  onPostClick(userId, image) {
    debugger;
    if (image) {
      var formData = new FormData();
      var imagefile = image;
      formData.append("id", userId);
      formData.append("profilePicture", imagefile);
      requester()
        .post(`user/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          if (resp.statusText === "OK") {
            alert("just refersh ;)");
          }
        })
        .catch((error) => {
          alert("failed to update your data!");
        });
    }
  }
  render() {
    return (
      <div>
        <div className="popup">
          <div className="popup_inner">
            <img src={this.checkImage()} alt="uploaded image" className="userPhoto" />
            <div>
              <div className="username">{this.props.user.name}</div>
              <div className="photodate">{this.props.user.date}</div>
            </div>
            <i className="far fa-times-circle closePopup" onClick={this.props.closePopup}></i>
            <UploadImage
              ref={this.ImageUploader}
              onCreateImageURL={this.createImageURL.bind(this)}
            />
            <button
              className="addpost-container__post-button"
              onClick={() => {
                this.onPostClick(this.props.user.id, this.state.image);
                this.ImageUploader.current.clearState();
                this.clearState();
              }}
              // disabled={this.props.comment && this.props.comment.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
