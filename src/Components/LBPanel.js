import Leaderboard from './Leaderboard';

import React, { Component } from 'react';

class LBPanel extends Component {
  render() {
  let data = this.props.items;

   return <div className="lb" align = "center">
    <Leaderboard items={data}/>
   </div>
  }
}

export default LBPanel;
