import React, { Component } from 'react';
import InvTile from './InvTile';

class InvItem extends Component {
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
    let data = this.props.data;
    if (!data || data.equipped) {
        return <div className="empty-inv-item">
        <div>  </div>
        <div>  </div>
        <div>  </div>
        </div>
    }
    let eqtext = data.equipped ? " [EQ]" : "";
    let numtext = "" + (data.index + 1) + eqtext;
    let className = "inv-item";
    let numClass = "inv-num";

    if (data.selected) {
      className = "highlight inv-item";
      numClass = "highlight inv-num";
    }

    let itemcode = data.rendercode;
    let symbol = this.styleSymbol(itemcode);
    let color = this.styleColor(itemcode);
    let bgColor = this.styleBG(itemcode);

    let name = data.name;

    if (bgColor === null) {
      bgColor = "black";
    }

    return(
    <div className={className}>
         <InvTile data={{symbol, color, bgColor}}/>
         <center>{name}</center>
         <div className={numClass}>{numtext}</div>
    </div>
    )
  }
}

export default InvItem;
