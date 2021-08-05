import { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

class Header extends Component {
  handleLogout() {
    window.localStorage.removeItem("id");
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
          <img src={user.profilePicture} alt="profilePicture" className="Header__profilePicture" />
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
