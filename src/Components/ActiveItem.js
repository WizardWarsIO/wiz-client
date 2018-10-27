import React, { Component } from 'react';
import InvTile from './InvTile';

class ActiveItem extends Component {
  componentWillMount() {
    this.styleGuide = this.props.styleGuide;
  }

  styleSymbol(symbol){
    if (this.styleGuide[symbol]) {
      return  String.fromCharCode(this.styleGuide[symbol].symbol);
    }
    return String.fromCharCode(symbol);
  }

  styleColor(symbol){
    if (this.styleGuide[symbol]) {
      return this.styleGuide[symbol].color;
    }
    return 'white'
  }

  styleBG(symbol){
    if (this.styleGuide[symbol]) {
      return this.styleGuide[symbol].bgcolor;
    }
    return 'black';
  }

  render() {
    let items = this.props.items;
    
    let data = null;
    for (let itemData of items) {
      if (itemData.selected) {
        data = itemData;
        break;
      }
    }

    if (!data) {
      return (
         <div className="active-item">
         <InvTile data={null}/>
         <div className="active-item-name">{}</div>
         <div className="active-item-header">ITEM</div>
    </div>)
    }

    let itemcode = data.rendercode;

    let symbol = this.styleSymbol(itemcode);
    let color = this.styleColor(itemcode);
    let bgColor = this.styleBG(itemcode);

    let eqText = "";
    if (data.equipped) {
      eqText = " [EQ]";
    }

    if (bgColor === null) {
      bgColor = "black";
    }

    return(
    <div className="active-item">
         <InvTile data={{symbol, color, bgColor}}/>
         <div className="active-item-name">{data.name + eqText}</div>
         <div className="active-item-header">ITEM</div>
    </div>
    )
  }
}

export default ActiveItem;
