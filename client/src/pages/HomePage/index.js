import React, { Component } from "react";
import axios from "axios";

import Card from "../../components/Card/index";

import "./styles.scss";

class HomePage extends Component {
  state = {
    photosData: [],
    photoCommentsById: {},
  };

  getAllPhotos() {
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
  
  componentDidMount() {
    this.getAllPhotos();
  }

  onLikeClick(string) {
    if (string == "like") {
      alert("like");
    } else {
      alert("dislike");
    }
  }

  onCommentClick(photoId) {
    axios
      .post("http://localhost:5000/photos/comment", {
        imageId: photoId,
        commentAuhtorId: this.props.user.id,
        comment: this.state.photoCommentsById[photoId],
      })
      .then((resp) => {
        debugger;
        if (resp.statusText === "OK") {
          this.setState({
            photoCommentsById: {
              [photoId]: "",
            },
          });
          this.getAllPhotos();
        }
      })
      .catch((error) => {
        alert("failed to post comment!");
      });
  }

  onChangeComment(e, photo) {
    this.setState({ photoCommentsById: { [photo.id]: e.target.value } });
  }

  render() {
    return this.state.photosData.map((photo) => (
      <Card
        user={this.props.user}
        photo={photo}
        handleReactionsClick={this.onLikeClick}
        // photoPostId={this.state.photoPostId}
        handleComment={this.onChangeComment.bind(this)}
        comment={this.state.photoCommentsById[photo.id]}
        handlePostComment={this.onCommentClick.bind(this)}
      />
    ));
  }
}

export default HomePage;
