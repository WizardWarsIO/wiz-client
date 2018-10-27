import Inventory from './Inventory';

import React, { Component } from 'react';

class InventoryPanel extends Component {
  render() {
  let data = this.props.items;
   return <div className="inv" align = "center">
    <Inventory items={data} styleGuide={this.props.styleGuide}/>
   </div>
  }
}

export default InventoryPanel;
