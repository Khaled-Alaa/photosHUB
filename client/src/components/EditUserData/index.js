import React, { Component } from "react";
import { connect } from "react-redux";

import requester from "../../helpers/requester";
import { updateLoggedUserData } from "../../Redux/index";
import Popup from "../Popup";

import "./styles.scss";

class EditUserData extends Component {
  //
  constructor() {
    super();
    this.state = {
      showPopup: false,
      user: {},
      name: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }
  handleLogout() {
    window.localStorage.removeItem("id");
  }

  handleProfilePicture() {
    this.setState({
      showPopup: !this.state.showPopup,
    });

    //to remove home page scroll when the pop up open
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
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
              user: resp.data,
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
  //
  componentDidUpdate(prevProps, prevState) {
    debugger;
    if (prevState.name === "") {
      this.setState({
        name: this.props.loggedUser.name,
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // requester()
    //   .post("signup", {
    //     name: this.state.name,
    //     email: this.state.email,
    //     birthdate: this.state.birthdate,
    //     password: this.state.password,
    //   })
    //   .then((resp) => {
    //     if (resp.statusText === "OK") {
    //       localStorage.setItem("id", resp.data.user.id);
    //       this.props.history.push("/Home");
    //     }
    //   })
    //   .catch((error) => {
    //     alert("This email is already exist!");
    //   });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="editing-form-container">
        <div
          className="editing-form-container__profile-picture"
          style={{ backgroundImage: 'url("' + this.props.loggedUser.profilePicture + '")' }}
        >
          <i
            className="fas fa-camera editing-form-container__edit-icon"
            onClick={this.handleProfilePicture.bind(this)}
          ></i>
        </div>
        {this.state.showPopup ? (
          <Popup
            user={this.props.loggedUser}
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
          required
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
          required
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
          required
        ></input>
        <h5 htmlFor="password" className="editing-form-container__password">
          New Password:
        </h5>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          placeholder="Your New Password"
          minLength="8"
          onChange={this.handleChange}
          className="editing-form-container__input"
          required
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
    loggedUser: store.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatedLoggedUser: (user) => dispatch(updateLoggedUserData(user)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUserData);

// export default EditUserData;
