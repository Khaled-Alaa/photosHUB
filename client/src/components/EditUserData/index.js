import React, { Component } from "react";
import { connect } from "react-redux";

import requester from "../../helpers/requester";
import { updateLoggedUserData } from "../../Redux/index";
import Popup from "../Popup";

import "./styles.scss";

class EditUserData extends Component {
  state = {
    showPopup: false,
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  handleProfilePicture() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  onSaveClick(userId, image) {
    if (image) {
      var formData = new FormData();
      var imageName = image.name;
      var imagefile = image;
      formData.append("userId", userId);
      formData.append("newProfilePictureName", imageName);
      formData.append("newProfilePicture", imagefile);
      requester()
        .post("user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          if (resp.statusText === "OK") {
            this.setState({
              showPopup: !this.state.showPopup,
            });
            this.copyUpdatedUserToStore(resp.data);

            // to reload the page and replaced with redux
            // window.location.reload();
          }
        })
        .catch((error) => {
          alert("failed to update your data!");
        });
    }
  }

  copyUpdatedUserToStore(user) {
    this.props.updatedLoggedUser(user);
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
    });
  }

  componentDidUpdate() {
    const { user } = this.props;
    const { name } = this.state;

    if (user && user.name && !name) {
      this.setState({
        name: user.name,
      });
    }
  }

  checkNewPassword(newPass, confirmNewPass) {
    if (newPass === confirmNewPass && newPass !== "") {
      return true;
    } else {
      return false;
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    console.log(this.state);
    if(this.state.newPassword){
debugger
    }
    const checkNewPass = this.checkNewPassword(
      this.state.newPassword,
      this.state.confirmNewPassword
    );
    var formData = new FormData();
    formData.append("userId", this.props.user.id);
    formData.append("name", this.state.name);
    if (checkNewPass) {
      formData.append("oldPass", this.state.oldPassword);
      formData.append("newPass", this.state.newPassword);
    } else {
      alert("the new password not match confirm new password");
    }
    requester()
      .post("user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          this.copyUpdatedUserToStore(resp.data);
        }
      })
      .catch((error) => {
        alert("failed to update your data!");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="editing-form-container">
        <div
          className="editing-form-container__profile-picture"
          style={{ backgroundImage: 'url("' + this.props.user.profilePicture + '")' }}
        >
          <i
            className="fas fa-camera editing-form-container__edit-icon"
            onClick={this.handleProfilePicture.bind(this)}
          ></i>
        </div>
        {this.state.showPopup ? (
          <Popup
            user={this.props.user}
            handleSavePost={this.onSaveClick.bind(this)}
            closePopup={this.handleProfilePicture.bind(this)}
          />
        ) : null}
        <h5 htmlFor="name" className="editing-form-container__user-name">
          Name:
        </h5>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={this.handleChange}
          value={this.state.name}
          className="editing-form-container__input"
        ></input>
        <h5 htmlFor="password" className="editing-form-container__password">
          Old Password:
        </h5>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          placeholder="Your Old Password"
          minLength="8"
          onChange={this.handleChange}
          className="editing-form-container__input"
        ></input>
        <h5 htmlFor="password" className="editing-form-container__password">
          New Password:
        </h5>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Your New Password"
          minLength="8"
          onChange={this.handleChange}
          className="editing-form-container__input"
        ></input>
        <h5 htmlFor="password" className="editing-form-container__password">
          Confirm New Password:
        </h5>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          placeholder="Your New Password"
          minLength="8"
          onChange={this.handleChange}
          className="editing-form-container__input"
        ></input>
        <br />
        <input
          type="submit"
          value="Save Changes"
          className="editing-form-container__button"
        ></input>
      </form>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatedLoggedUser: (user) => dispatch(updateLoggedUserData(user)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUserData);
