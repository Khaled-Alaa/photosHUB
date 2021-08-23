import React, { Component } from "react";
import { connect } from "react-redux";

import "./styles.scss";

class EditUserData extends Component {
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="editing-form-container">
        <img
          src={this.props.loggedUser.profilePicture}
          className="editing-form-container__profile-picture"
        ></img>
        <h5 htmlFor="name" className="editing-form-container__user-name">
          Name:
        </h5>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={this.handleChange}
          value={this.props.loggedUser.name}
          className="editing-form-container__input"
          required
        ></input>
        <h5 htmlFor="password" className="editing-form-container__password">
          Old Password:
        </h5>
        <input
          type="password"
          id="password"
          name="password"
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
          id="password1"
          name="password"
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
          id="password2"
          name="password"
          placeholder="Your New Password"
          minLength="8"
          onChange={this.handleChange}
          className="editing-form-container__input"
          required
        ></input>
        <br />
        <input type="submit" value="Save Changes" className="signup-form-container__button"></input>
      </form>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    loggedUser: store.user,
  };
};

export default connect(mapStoreToProps)(EditUserData);

// export default EditUserData;
