import React, { Component } from "react";
import Card from "../../components/Card/index";
import "./styles.scss";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Card user={this.props.user} />
      </div>
    );
  }
}

export default HomePage;
