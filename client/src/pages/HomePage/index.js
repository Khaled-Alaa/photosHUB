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

  postReaction(reaction, user, reactphoto) {
    axios
      .post("http://localhost:5000/photos/reaction", {
        type: reaction,
        user: user,
        photo: reactphoto,
      })
      .then((resp) => {
        debugger;
        this.getAllPhotos();
      })
      .catch((error) => {
        alert("failed to post react!");
      });
  }

  onReactClick(reaction, user, reactphoto) {
    const photo = this.state.photosData.find((photo) => (photo.id == reactphoto.id ? photo : null));
    const exist = photo.reactions.find((reactItem) =>
      reactItem.userId == user.id ? reactItem : null
    );
    if (!exist) {
      this.postReaction(reaction, user, reactphoto);
    } else {
      if (exist.type == reaction) {
        reaction = "remove";
        this.postReaction(reaction, user, reactphoto);
      } else {
        this.postReaction(reaction, user, reactphoto);
      }
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
        handleReactionsClick={this.onReactClick.bind(this)}
        // photoPostId={this.state.photoPostId}
        handleComment={this.onChangeComment.bind(this)}
        comment={this.state.photoCommentsById[photo.id]}
        handlePostComment={this.onCommentClick.bind(this)}
      />
    ));
  }
}

export default HomePage;
