import { Component } from "react";
import requester from "../../helpers/requester";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateLoggedUserData } from "../../Redux/index";

import Popup from "../Popup";

import "./styles.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      user: {},
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
  render() {
    const { user } = this.props;
    return (
      <div className="Header">
        <img src="/assets/images/logo2.png" alt="logo" className="Header__logo" />
        <Link to="/Home" className="Header__site-title">
          <h5>Photos HUB</h5>
        </Link>
        <span className="Header__profilePictureCropper">
          <img
            src={
              this.props.loggedUser.profilePicture
                ? this.props.loggedUser.profilePicture
                : "/assets/images/dummy-profile-pic.png"
            }
            alt="profilePicture"
            className="Header__profilePicture"
            onClick={this.handleProfilePicture.bind(this)}
          />
                {this.state.showPopup ? (
            <Popup
              user={user}
              handleSavePost={this.onSaveClick.bind(this)}
              closePopup={this.handleProfilePicture.bind(this)}
            />
          ) : null}
        </span>
        <Link to={`/Profile/${localStorage.getItem("id")}`} className="Header__user-name">
          {user.name}
        </Link>
        <Link>
          <i className="fas fa-user-cog Header__setting-icon"></i>
        </Link>
        <Link to="/">
          <i
            className="fas fa-sign-out-alt Header__logout-icon"
            onClick={this.handleLogout.bind(this)}
          ></i>
        </Link>
      </div>
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
export default connect(mapStoreToProps, mapDispatchToProps)(Header);
