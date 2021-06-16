import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Logo from "../../../src/creative-idea-box-logo-260nw-485822293.png";

import "./styles.scss";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    id: 0,
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
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
      .post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          this.setState({
            id: resp.data.id,
          });

          localStorage.setItem("id", this.state.id);

          this.props.history.push("/Home");

          // this.props.history.push({
          //   pathname: "/Home",
          //   userName: this.state.name,
          // });
        }
      })
      .catch((error) => {
        alert("wrong email or password");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <img src={Logo} alt="logo" />
        <h6 className="form-container__site-name">Photos HUB</h6>
        <h2 className="form-container__welcome">Hi, Welcome Back!</h2>
        <h6 className="form-container__slogan">Share Your Photos Every Day!</h6>
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
          value="Login"
          className="form-container__button"
        ></input>
        <Link to="/SignUp" className="form-container__signup">
          New User?
        </Link>
      </form>
    );
  }
}

export default LoginPage;
