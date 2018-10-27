import React, { Component } from 'react';
import LogItem from './LogItem';
import Pubsub from 'pubsub-js';

class Log extends Component {
  componentDidMount(){
    Pubsub.subscribe('logs', this.addLog.bind(this));
    this.setState({logs: [' ', ' ', ' ', 'Welcome to Wizard Wars']});
  }
  addLog(t, logs) {
    let newlogs = this.state.logs.concat(logs);
    let total = newlogs.length;
    if (total > 10) {
      newlogs = newlogs.splice(total - 10, 10);
    } else {
      while (newlogs.length < 10) {
        newlogs.push(' ');
      }
    }
    this.setState({logs: newlogs});
  }
  render() {
    let msgs = this.state ? this.state.logs : null;
    if (!msgs) {
      return <div></div>
    }

    let rev = msgs.reduce((ary, ele) => {ary.unshift(ele); return ary}, []);
    let elems = rev.map((data, i) => {
        return (
          <LogItem key={i} lognum={i + 1} data={"> " + data}/>
        );
      });

    return <div className="logs">
      {elems}
    </div>
  }
}

export default Log;
