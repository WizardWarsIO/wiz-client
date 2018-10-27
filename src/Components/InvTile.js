import React, { Component } from 'react';

class InvTile extends Component {
  render() {
    if (!this.props.data) {
      return <div/>
    }
    let symbol = this.props.data.symbol;
    let color = this.props.data.color;
    let bgColor = this.props.data.bgColor;
    return <center className="invtop">
    <div style={{backgroundColor: bgColor, color: color}} className="inv-tile">{symbol}</div></center>;
  }
}

export default InvTile;