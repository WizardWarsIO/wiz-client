import React from 'react';
import PropTypes from 'prop-types'

import LBItem from './LBItem';

const Leaderboard = ({ items = [{}, {}, {}, {}, {}] }) => (
  <div className="leaderboard">
    <table id="leaderboard-table">
      <tbody>
        <tr>
          <th className="leader-table-header1" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th className="leader-table-header2" align="left"><a target="blank" href="https://github.com/WizardWarsIO/wiz-server">WizardWars.IO</a></th>
          <th className="leader-table-header3" align="right"></th>
        </tr>
        {items.map((item, index) => <LBItem key={index} {...item} num={index+1} />)}
      </tbody>
    </table>
  </div>
)

Leaderboard.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.name,
    score: PropTypes.number
  }))
}

export default Leaderboard;
