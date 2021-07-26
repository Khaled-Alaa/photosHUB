import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/Header/index";
import HomePage from "../../pages/HomePage/index";
import ProfilePage from "../../pages/ProfilePage/index";

import "./styles.scss";

class Layout extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const userId = localStorage.getItem("id");
    if (userId) {
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
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <Switch>
          <Route path="/Home">
            <HomePage user={this.state.user} />
          </Route>
          <Route path="/Profile">
            <ProfilePage user={this.state.user} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Layout;
