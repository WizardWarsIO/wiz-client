import React, { Component } from 'react';

class InfoPanel extends Component {
  render() {
    let msg = this.props ? this.props.data : null;
    if (!msg) {
      return <div></div>
    }


    return <div className="info" align = "left">
      {msg}
    </div>
  }
}

export default InfoPanel;
