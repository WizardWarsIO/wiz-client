import React, { Component } from 'react';

import Leaderboard from './Leaderboard';

const LBPanel = ({ items }) => (
  <div className='lb' align='center'>
    <Leaderboard items={items} />
  </div>
)

export default LBPanel;
