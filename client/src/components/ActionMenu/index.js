import React, { Component } from "react";
import requester from "../../helpers/requester/index";
import { Link } from "react-router-dom";

import "./styles.scss";

class ActionMenu extends Component {
  state = {
    flag: false,
  };

  handleSubMenu() {
    this.setState({
      flag: !this.state.flag,
    });
  }

  handleDelete(photoId) {
    requester()
      .delete("photos", {
        data: { photoId: photoId },
      })
      .then((resp) => {
        this.setState({
          flag: !this.state.flag,
        });
        this.props.refershAfterDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="subMenu-container">
        <i className="fas fa-ellipsis-v dropbtn" onClick={(e) => this.handleSubMenu()} />
        <div
          className={`dropup-content 
          ${this.state.flag === true ? `clicked` : ""}`}
        >
          <Link to={`/Profile/${this.props.cardOwner}`} className="Header__user-name">
            Visit Profile
          </Link>
          <a onClick={() => this.handleDelete(this.props.photoId)}>Delete</a>
        </div>
      </div>
    );
  }
}

export default ActionMenu;
