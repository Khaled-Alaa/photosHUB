import { Component } from "react";
import { Link } from "react-router-dom";
import Popup from "../Popup";
import "./styles.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }
  handleLogout() {
    window.localStorage.removeItem("id");
  }

  handleProfilePicture() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
    // var body = document.getElementsByTagName("body");
    // debugger;
    if (document.body.style.overflow == "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
    // body.style.overflow = "hidden";
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
            src={user.profilePicture}
            alt="profilePicture"
            className="Header__profilePicture"
            onClick={this.handleProfilePicture.bind(this)}
          />
          {this.state.showPopup ? (
            <Popup
              user={user}
              closePopup={this.handleProfilePicture.bind(this)}
            />
          ) : null}
        </span>
        <Link to={`/Profile/${localStorage.getItem("id")}`} className="Header__user-name">
          {user.name}
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

export default Header;
