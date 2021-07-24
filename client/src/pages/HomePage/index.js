import React, { Component } from "react";
import axios from "axios";
import Card from "../../components/Card/index";
import AddPost from "../../components/AddPost/index";

import "./styles.scss";

class HomePage extends Component {
  state = {
    photosData: [],
    photoCommentsById: {},
    postDescriptionsById: {},
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
        this.getAllPhotos();
      })
      .catch((error) => {
        alert("failed to post react!");
      });
  }

  onReactClick(reaction, user, reactphoto) {
    const photo = this.state.photosData.find((photo) =>
      photo.id === reactphoto.id ? photo : null
    );
    const exist = photo.reactions.find((reactItem) =>
      reactItem.userId === user.id ? reactItem : null
    );
    if (!exist) {
      this.postReaction(reaction, user, reactphoto);
    } else {
      if (exist.type === reaction) {
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

  onChangeDescription(e, userId) {
    this.setState({ postDescriptionsById: { [userId]: e.target.value } });
  }

  onPostClick(userId, photo) {
    // console.log(userId, photo, this.state.postDescriptionsById[userId]);

    var formData = new FormData();
    var imagefile = photo;
    formData.append("autherId", userId);
    formData.append("description", this.state.postDescriptionsById[userId]);
    formData.append("postPhoto", imagefile);
    axios
      .post("http://localhost:5000/photos/newPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          this.getAllPhotos();
        }
      })
      .catch((error) => {
        alert("failed to post the post!");
      });

    // axios
    //   .post("http://localhost:5000/photos/newPost", {
    //     autherId: userId,
    //     description: this.state.postDescriptionsById[userId],
    //     postPhoto: photo,
    //   })
    //   .then((resp) => {
    //     if (resp.statusText === "OK") {
    //       this.getAllPhotos();
    //     }
    //   })
    //   .catch((error) => {
    //     alert("failed to post the post!");
    //   });
  }

  render() {
    return (
      <div>
        <AddPost
          user={this.props.user}
          handleDescription={this.onChangeDescription.bind(this)}
          description={this.state.postDescriptionsById[this.props.user.id]}
          handlePostPost={this.onPostClick.bind(this)}
        />
        {this.state.photosData.map((photo, index) => (
          <Card
            user={this.props.user}
            photo={photo}
            handleReactionsClick={this.onReactClick.bind(this)}
            // photoPostId={this.state.photoPostId}
            handleComment={this.onChangeComment.bind(this)}
            comment={this.state.photoCommentsById[photo.id]}
            handlePostComment={this.onCommentClick.bind(this)}
            key={`${photo.id}` - `${index}`}
          />
        ))}
      </div>
    );
  }
}

export default HomePage;
