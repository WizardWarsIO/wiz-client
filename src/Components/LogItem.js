import React, { Component } from 'react';

class LogItem extends Component {
  render() {
    let data = this.props.data;
    let classname = 'log' + this.props.lognum + ' log-item';
    return <div className={classname}>{data}</div>
  }  
}

export default LogItem;