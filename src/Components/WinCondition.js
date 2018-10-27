import React, { Component } from 'react';
import Pubsub from 'pubsub-js';

class WinCondition extends Component {
  componentWillMount() {
    this.setState({'win': ''});
    Pubsub.subscribe('win', this.saveWin.bind(this));
  }

  saveWin(name, msg) {
    this.setState({'win': msg});
  }

  render() {
    let win = "";
    if (this.state && this.state.win) {
      win = this.state.win;
    }
    return <div className="win-item">
      {win}
    </div>
  }
}

export default WinCondition;
