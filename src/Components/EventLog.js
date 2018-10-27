import Log from './Log';

import React, { Component } from 'react';

class EventLog extends Component {
  render() {
  let data = this.props.logs;
   return <div className="event-log">
    <Log logs={data}/>
   </div>
  }
}

export default EventLog;
