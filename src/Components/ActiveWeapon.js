import React, { Component } from 'react';
import InvTile from './InvTile';

class ActiveWeapon extends Component {
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
    if (!this.props.items) {
        return <div/>
    }
    
    let data = null; 
    if (this.props.eqIndexes.weapon) {
        data = this.props.items[this.props.eqIndexes.weapon - 1];
    }

    if (!data) {
         return (<div className="active-item">
         <InvTile data={null}/>
         <div className="active-item-name"></div>
         <div className="active-item-header">WEAPON</div>
    </div>)
    }

    let itemcode = data.rendercode;

    let symbol = this.styleSymbol(itemcode);
    let color = this.styleColor(itemcode);
    let bgColor = this.styleBG(itemcode);

    if (bgColor === null) {
      bgColor = "black";
    }

    return(
    <div className="active-item">
         <InvTile data={{symbol, color, bgColor}}/>
         <div className="active-item-name">{data.name}</div>
         <div className="active-item-header">WEAPON</div>
    </div>
    )
  }
}

export default ActiveWeapon;