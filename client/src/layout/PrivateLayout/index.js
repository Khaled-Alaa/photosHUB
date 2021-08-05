import React, { Component } from "react";
import requester from "../../helpers/requester";
import { Switch, Route } from "react-router-dom";

import Header from "../../components/Header";
import HomePage from "../../pages/HomePage";
import ProfilePage from "../../pages/ProfilePage";

import "./styles.scss";

class Layout extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const userId = localStorage.getItem("id");
    if (userId) {
      requester()
        .get(`users/${userId}`)
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
          <Route
            path="/Profile/:id"
            render={(route) => {
              return <ProfilePage user={this.state.user} route={route} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default Layout;
