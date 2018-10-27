import React, { Component } from 'react';

import ActiveItem from './ActiveItem';
import ActiveWeapon from './ActiveWeapon';
import ActiveInput from './ActiveInput';

class ActivePanel extends Component {
  render() {
    if (!this.props.items) {
        return <div/>
    }
    
    return (
        <div id="active-container">
        <div className="active-section">
            <ActiveItem items={this.props.items} styleGuide={this.props.styleGuide}/>
        </div>
        <div className="active-section">
            <ActiveInput input={this.props.input}/>
        </div>
        <div className="active-section">
            <ActiveWeapon items={this.props.items} eqIndexes={this.props.eqIndexes} styleGuide={this.props.styleGuide}/>
        </div>
        </div>
    )
  }
}

export default ActivePanel;
