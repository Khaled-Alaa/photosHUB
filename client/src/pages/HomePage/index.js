import React, { Component } from "react";
import { connect } from "react-redux";
import requester from "../../helpers/requester/index";

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
    requester()
      .get("photos")
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
    requester()
      .post("photos/reaction", {
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
    requester()
      .post("photos/comment", {
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
    console.log(photo);
    if (photo) {
      var formData = new FormData();
      var imagefile = photo;
      formData.append("autherId", userId);
      formData.append("description", this.state.postDescriptionsById[userId]);
      formData.append("postPhoto", imagefile);
      requester()
        .post("photos/newPost", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          if (resp.statusText === "OK") {
            this.clearDescription(userId);
            this.getAllPhotos();
          }
        })
        .catch((error) => {
          alert("failed to post the post!");
        });
    }
  }
  clearDescription(userId) {
    this.setState({
      postDescriptionsById: {
        [userId]: "",
      },
    });
  }
  render() {
    return (
      <div>
        <AddPost
          user={this.props.user}
          handleDescription={this.onChangeDescription.bind(this)}
          description={this.state.postDescriptionsById[this.props.user.id]}
          handlePostPost={this.onPostClick.bind(this)}
          handleCancelPost={this.clearDescription.bind(this)}
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
            refershAfterDelete={this.getAllPhotos.bind(this)}
            key={`${photo.id}` - `${index}`}
          />
        ))}
      </div>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    loggedUser: store.user,
  };
};

export default connect(mapStoreToProps)(HomePage);
