import React, { Component } from 'react';

class Tile extends Component {
  render() {
    let symbol = this.props.data.symbol;
    let color = this.props.data.color;
    let bgColor = this.props.data.bgColor;
    return <center><div style={{backgroundColor: bgColor, color: color}} className="map-tile">{symbol}</div></center>;
  }
}

export default Tile;
