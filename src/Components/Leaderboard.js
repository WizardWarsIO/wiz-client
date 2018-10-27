import React, { Component } from 'react';
import LBItem from './LBItem';

class Leaderboard extends Component {
  render() {
    let items = this.props && this.props.items ? this.props.items : [{},{},{},{},{}];

    items = [1,2,3,4,5].map((num, i) => {
      return <LBItem key={i} data={items[i]} num={num}/>
    });

    return <div className="leaderboard">
      <table id="leaderboard-table">
        <tbody>
        <tr>
          <th className="leader-table-header1" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th className="leader-table-header2" align="left"><a target="blank" href="https://github.com/WizardWarsIO/wiz-server">WizardWars.IO</a></th>
          <th className="leader-table-header3" align="right"></th>
        </tr>
        {items}
        </tbody>
      </table>
    </div>
  }
}

export default Leaderboard;
