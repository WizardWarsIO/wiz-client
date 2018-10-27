import React, { Component } from 'react';
import InvItem from './InvItem';

class Inventory extends Component {
  render() {
    let items = this.props ? this.props.items : [];

    let itemList = [];
    for (let j = 0; j < 9; j++) {
      if (items.length >= j + 1) {
        itemList.push(items[j]);
      } else {
        if (j === 0 && items.length < 1) {
          //itemList.push({name: "", equipped: false, selected: true});
        } else {
          itemList.push(null);
        }
      }
    }

    let elems = itemList.map((n, i) => {
      return <InvItem key={i} styleGuide={this.props.styleGuide} data={itemList[i]}/>
    });

    return <div className="inv" align="center">
      {elems}
    </div>
  
  }
}

export default Inventory;
