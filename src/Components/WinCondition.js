import React, { Component } from 'react';
import Pubsub from 'pubsub-js';

class WinCondition extends Component {
  state = { win: null }

  constructor(props) {
    super(props);
    Pubsub.subscribe('win', (name, msg) => {
      this.setState({ win: msg })
    })
  }

  render() {
    return (
      <div className="win-item">
        {this.state.win}
      </div>
    )
  }
}

export default WinCondition;
