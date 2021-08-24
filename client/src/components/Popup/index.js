import React, { Component } from "react";
import requester from "../../helpers/requester";

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
    debugger;
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

  // onSaveClick(userId, image) {
  //   console.log(image.name);
  //   if (image) {
  //     var formData = new FormData();
  //     var imageName = image.name;
  //     var imagefile = image;
  //     formData.append("userId", userId);
  //     formData.append("newProfilePicture", imageName);
  //     formData.append("postPhoto", imagefile);
  //     requester()
  //       // .post(`user/${userId}`, formData, {
  //       .post("user", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((resp) => {
  //         if (resp.statusText === "OK") {
  //           alert("just refersh ;)");
  //         }
  //       })
  //       .catch((error) => {
  //         alert("failed to update your data!");
  //       });
  //   }
  // }
  render() {
    return (
      <div className="popup-container">
        <div className="popup-container__popup_inner">
          <i
            className="far fa-times-circle popup-container__closePopup"
            onClick={this.props.closePopup}
          ></i>
          <img
            src={this.checkImage()}
            alt="uploaded image"
            className="popup-container__userPhoto"
          />
          <div>
            <div className="popup-container__username">{this.props.user.name}</div>
            <div className="popup-container__photodate">{this.props.user.date}</div>
          </div>
          <div>
            <UploadImage
              ref={this.ImageUploader}
              onCreateImageURL={this.createImageURL.bind(this)}
            />
            <button
              className="popup-container__save-button"
              onClick={() => {
                this.props.handleSavePost(this.props.user.id, this.state.image);
                // this.onSaveClick(this.props.user.id, this.state.image);
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
