import React, { Component } from 'react';
import LogItem from './LogItem';
import Pubsub from 'pubsub-js';

class Log extends Component {

  state = {
    logs: null
  }

  componentDidMount(){
    Pubsub.subscribe('logs', this.addLog);
    this.setState({logs: [' ', ' ', ' ', 'Welcome to Wizard Wars']});
  }

  addLog = (t, logs) => {
    this.setState(previous => {
      let newlogs = previous.logs.concat(logs);
      let total = newlogs.length;
      if (total > 10) {
        newlogs = newlogs.splice(total - 10, 10);
      } else {
        while (newlogs.length < 10) {
          newlogs.push(' ');
        }
      }
      return { logs: newlogs }
    })
  }

  render() {
    const { logs } = this.state

    return logs && (
      <div className='logs'>
        {logs.slice().reverse().map((message, i) =>
          <LogItem key={i} lognum={i+1} data={'> ' + message} />
        )}
      </div>
    )

  }
}

export default Log;
