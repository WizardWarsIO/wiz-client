import React, { Component } from 'react';

class LBItem extends Component {
  render() {
    let num = this.props.num;
    let data = this.props.data ? this.props.data : {name: "", score: ""};

    return(
    <tr className="lb-item">
         <td></td>
         <td>{'' + num + ')' + data.name}</td>
         <td align="right">{'<' + data.score + '>'}</td>
    </tr>
    )
  }
}

export default LBItem;
