import React, { Component } from "react";
import axios from "axios";

import Header from "../../components/Header/index";
import HomePage from "../../pages/HomePage/index";

import "./styles.scss";

class Layout extends Component {
  state = {
    userId: "",
    user: {},
  };

  componentDidMount() {
    const userId = localStorage.getItem("id");
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((resp) => {
        this.setState({
          user: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <HomePage user={this.state.user} />
      </div>
    );
  }
}

export default Layout;
