import React, { Component } from 'react';
import InvTile from './InvTile';

class EqItem extends Component {
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
    if (!data) {
        return <div className="empty-inv-item">
        <div>  </div>
        <div>  </div>
        <div>  </div>
        </div>
    }

    let className = "eq-item";

    // if (data.selected) {
    //   className = "highlight inv-item";
    // }

    let itemcode = data.rendercode;
    let symbol = this.styleSymbol(itemcode);
    let color = this.styleColor(itemcode);
    let bgColor = this.styleBG(itemcode);

    if (bgColor === null) {
      bgColor = "black";
    }

    return(
    <div className={className}>
         <InvTile data={{symbol, color, bgColor}}/>
    </div>
    )
  }
}

export default EqItem;
