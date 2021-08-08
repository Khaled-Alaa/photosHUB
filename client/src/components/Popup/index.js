import { Component } from "react";

import "./styles.scss";

class Popup extends Component {
  render() {
    return (
      <div>
        <div className="popup">
          <div className="popup_inner">
            <img src={this.props.user.profilePicture} alt="uploaded image" className="userPhoto" />
            <div>
              <div className="username">{this.props.user.name}</div>
              <div className="photodate">{this.props.user.date}</div>
            </div>
            <i className="far fa-times-circle closePopup" onClick={this.props.closePopup}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
