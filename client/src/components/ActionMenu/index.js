import React, { Component } from "react";

import "./styles.scss";

class ActionMenu extends Component {
  state = {
    flag: false,
  };

  handleSubMenu() {
    this.setState({
      flag: !this.state.flag,
    });
  }

  test() {
    alert("test");
  }

  render() {
    return (
      <div className="subMenu-container">
        <i className="fas fa-ellipsis-v dropbtn" onClick={(e) => this.handleSubMenu()} />
        <div
          className={`dropup-content 
          ${this.state.flag == true ? `clicked` : ""}`}
        >
          <a onClick={(e) => this.test()}>Link 1</a>
          <a onClick={(e) => this.test()}>Link 2</a>
          <a onClick={(e) => this.test()}>Link 3</a>
        </div>
      </div>
    );
  }
}

export default ActionMenu;
