import { Component } from "react";
import requester from "../../helpers/requester/index";

import Card from "../../components/Card/index";

import "./styles.scss";

class ProfilePage extends Component {
  state = {
    userPhotos: [],
    photoCommentsById: {},
  };

  getuserPhotos() {
    const userId = localStorage.getItem("id");
    // .get(`users/${userId}/photos`)

    requester()
      .get(`users/${this.props.route.match.params.id}/photos`)
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

  postReaction(reaction, user, reactphoto) {
    requester()
      .post("photos/reaction", {
        type: reaction,
        user: user,
        photo: reactphoto,
      })
      .then((resp) => {
        this.getuserPhotos();
      })
      .catch((error) => {
        alert("failed to post react!");
      });
  }

  onReactClick(reaction, user, reactphoto) {
    const photo = this.state.userPhotos.find((photo) =>
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
    debugger
    return this.state.userPhotos.map((photo, index) => (
      <Card
        user={this.props.user}
        photo={photo}
        handleReactionsClick={this.onReactClick.bind(this)}
        handleComment={this.onChangeComment.bind(this)}
        comment={this.state.photoCommentsById[photo.id]}
        handlePostComment={this.onCommentClick.bind(this)}
        refershAfterDelete={this.getuserPhotos.bind(this)}
        key={`${photo.id}` - `${index}`}
      />
    ));
  }
}

export default ProfilePage;
