import React, { Component } from "react";
import Header from "../../components/Header/index";
import HomePage from "../../pages/HomePage/index";
import axios from "axios";

import "./styles.scss";

class Layout extends Component {
  state = {
    userId: "",
    userName: "",
    userPhoto: "",
  };

  componentDidMount() {
    const userId = localStorage.getItem("id");
    this.setState({ userId });
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((resp) => {
        this.setState({
          userName: resp.data.name,
          userPhoto: resp.data.profilePicture,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // const { userName } = this.props.location;

    return (
      <div>
        <Header
          userName={this.state.userName}
          profilePicture={this.state.userPhoto}
        />
        <HomePage />
      </div>
    );
  }
}

export default Layout;
