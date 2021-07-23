import { Component } from "react";
import axios from "axios";

import Card from "../../components/Card/index";

import "./styles.scss";

class ProfilePage extends Component {
  state = {
    userPhotos: [],
    photoCommentsById: {},
  };

  getuserPhotos() {
    const userId = localStorage.getItem("id");

    axios
      .get(`http://localhost:5000/users/${userId}/photos`)
      .then((resp) => {
        this.setState({
          userPhotos: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getuserPhotos();
  }

  onLikeClick(string) {
    if (string === "like") {
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
        if (resp.statusText === "OK") {
          this.setState({
            photoCommentsById: {
              [photoId]: "",
            },
          });
          this.getuserPhotos();
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
    return this.state.userPhotos.map((photo, index) => (
      <Card
        user={this.props.user}
        photo={photo}
        handleReactionsClick={this.onLikeClick}
        handleComment={this.onChangeComment.bind(this)}
        comment={this.state.photoCommentsById[photo.id]}
        handlePostComment={this.onCommentClick.bind(this)}
        key={`${photo.id}` - `${index}`}
      />
    ));
  }
}

export default ProfilePage;
