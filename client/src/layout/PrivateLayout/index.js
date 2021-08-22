import React, { Component } from "react";
import requester from "../../helpers/requester";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { saveLoggedUser } from "../../Redux/index";

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
          this.copyUserToStore(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.props.history.push("/");
    }
  }

  copyUserToStore(user) {
    this.props.loggedUser(user);
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
          {/* <Route
            path="/EditProfile/:id"
            render={(route) => {
              return <ProfilePage user={this.state.user} route={route} />;
            }}
          /> */}
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedUser: (user) => dispatch(saveLoggedUser(user)),
  };
};
export default connect(null, mapDispatchToProps)(Layout);
// export default Layout;
