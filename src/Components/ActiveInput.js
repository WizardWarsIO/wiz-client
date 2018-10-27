import React, { Component } from 'react';

import Compass from './Compass';

class ActiveInput extends Component {
  render() {
    if (!this.props.input) {
        return <div/>
    }
    
    let inputDir = this.props.input.dir;
    let inputType = this.props.input.type;

    if (inputDir === 5 || inputDir === 0) {
        inputType = 'stand';
        inputType = "";
    }

    if (inputType === 'move') {
        inputType = "";
    }

    return (
        <div id="input-panel">
            <Compass data={inputDir}/>
            <div>{inputType}</div>
            <div>INPUT</div>
        </div>
    )
  }
}

export default ActiveInput;
