import { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../src/logo2.png";

import "./styles.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={Logo} alt="logo" className="Header__logo" />
        <h5 className="Header__site-title">Photos HUB</h5>
        <Link to="/signup" className="Header__user-name">
          {this.props.user.name}
        </Link>
        <span className="Header__profilePictureCropper">
          <img
            src={this.props.user.profilePicture}
            alt="profilePicture"
            className="Header__profilePicture"
          />
        </span>

        <Link to="/">
          <i className="fas fa-sign-out-alt Header__logout-icon"></i>
        </Link>
      </div>
    );
  }
}

export default Header;
