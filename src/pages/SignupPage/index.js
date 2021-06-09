import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Logo from "../../../src/creative-idea-box-logo-260nw-485822293.png";

import "./styles.scss";

class SignupPage extends Component {
  state = {
    name: "",
    email: "",
    birthdate: "",
    password: "",
  };
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleBirthDate = (e) => {
    this.setState({
      birthdate: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", {
        name: this.state.name,
        email: this.state.email,
        birthdate: this.state.birthdate,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          this.props.history.push("/Home");
        }
      })
      .catch((error) => {
        alert("This email is already exist!");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <img src={Logo} alt="logo" />
        <h6 className="form-container__site-name">Photos HUB</h6>
        <h6 className="form-container__slogan">Share Your Photos Every Day!</h6>
        <h5 htmlFor="name">Name:</h5>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={this.handleName}
          className="form-container__input"
          required
        ></input>
        <h5 htmlFor="email">Email:</h5>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          onChange={this.handleEmail}
          className="form-container__input"
          required
        ></input>
        <h5 htmlFor="birthdate">Birth Date:</h5>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          onChange={this.handleBirthDate}
          className="form-container__input"
          required
        ></input>
        <h5 htmlFor="password">Password:</h5>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
          minLength="8"
          onChange={this.handlePassword}
          className="form-container__input"
          required
        ></input>
        <br />
        <input
          type="submit"
          value="SignUp"
          className="form-container__button"
        ></input>
        <Link to="/" className="form-container__login">
          Already on PhotosHUB?
        </Link>
      </form>
    );
  }
}

export default SignupPage;
