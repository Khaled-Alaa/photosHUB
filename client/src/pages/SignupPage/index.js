import { Component } from "react";
import requester from "../../helpers/requester/index";
import { Link } from "react-router-dom";

import "./styles.scss";

class SignupPage extends Component {
  state = {
    name: "",
    email: "",
    birthdate: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    requester()
      .post("signup", {
        name: this.state.name,
        email: this.state.email,
        birthdate: this.state.birthdate,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          localStorage.setItem("id", resp.data.user.id);
          this.props.history.push("/Home");
        }
      })
      .catch((error) => {
        alert("This email is already exist!");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="signup-form-container">
        <img src="assets/images/creative-idea-box-logo-260nw-485822293.png" alt="logo" />
        <h6 className="signup-form-container__site-name">Photos HUB</h6>
        <h6 className="signup-form-container__slogan">Share Your Photos Every Day!</h6>
        <h5 htmlFor="name">Name:</h5>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={this.handleChange}
          className="signup-form-container__input"
          required
        ></input>
        <h5 htmlFor="email">Email:</h5>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          onChange={this.handleChange}
          className="signup-form-container__input"
          required
        ></input>
        <h5 htmlFor="birthdate">Birth Date:</h5>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          onChange={this.handleChange}
          className="signup-form-container__input"
          required
        ></input>
        <h5 htmlFor="password">Password:</h5>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          minLength="8"
          onChange={this.handleChange}
          className="signup-form-container__input"
          required
        ></input>
        <br />
        <input type="submit" value="SignUp" className="signup-form-container__button"></input>
        <Link to="/" className="signup-form-container__login">
          Already on PhotosHUB?
        </Link>
      </form>
    );
  }
}

export default SignupPage;
