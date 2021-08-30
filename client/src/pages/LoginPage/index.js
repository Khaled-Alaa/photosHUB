import { Component } from "react";
import requester from "../../helpers/requester/index";
import { Link } from "react-router-dom";

import "./styles.scss";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    id: 0,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    requester()
      .post("login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.statusText === "OK") {
          this.setState({
            id: resp.data.id,
          });

          localStorage.setItem("id", this.state.id);
          this.props.history.push("/home");

          // this.props.history.push({
          //   pathname: "/home",
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
      <form onSubmit={this.handleSubmit} className="login-form-container">
        <img src="assets/images/creative-idea-box-logo-260nw-485822293.png" alt="logo" />
        <h6 className="login-form-container__site-name">Photos HUB</h6>
        <h2 className="login-form-container__welcome">Hi, Welcome Back!</h2>
        <h6 className="login-form-container__slogan">Share Your Photos Every Day!</h6>
        <h5 htmlFor="email">Email:</h5>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          onChange={this.handleChange}
          className="login-form-container__input"
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
          className="login-form-container__input"
          required
        ></input>
        <br />
        <input
          type="submit"
          value="Login"
          className="login-form-container__button"
        ></input>
        <Link to="/SignUp" className="login-form-container__signup">
          New User?
        </Link>
      </form>
    );
  }
}

export default LoginPage;
