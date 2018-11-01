import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TitleScreen extends Component {
  static propTypes = {
    startgame: PropTypes.func.isRequired,
    winner: PropTypes.string,
    killedBy: PropTypes.string
  }

  startgame(e){
    e.preventDefault();
    let div = document.getElementById('name');
    let chosenName = div.value;
    if (chosenName && chosenName.length > 0) {
      this.props.startgame(chosenName);
    } else {
      alert("Pick a name, Dingus.");
      div.value = "Dingus";
    }

    return false;
  }

  componentDidMount() {
    let nameField = document.getElementById('name');
    nameField.focus();
  }

  render() {
    const { killedBy, winner } = this.props
    let message = null
    if (killedBy) {
      message = "Killed by: " + killedBy;
    } else if (winner) {
      message = winner + " is the Winning Wizard!";
    }
    return (
      <div className = 'title-screen' style={{backgroundColor: "#000000", color:"#FFFFFF"}}>
        <h1>WizardWars.io</h1>
        <h3>A Roguelike Deathmatch</h3>
        <div>{message}</div>
        <form onSubmit={this.startgame.bind(this)}> <br/>
          <input id='name'></input>
          <br/>
          <input type="submit" value="Join Game"/>
        </form>
        <p/>
          Choose a name. <br/>
          MOVE with numpad or arrow keys. <br/>
          STOP with space or numpad5.<br/>
          READY item in inventory with 1-9.<p/>
          &nbsp;A - APPLY/EQUIP &nbsp; --> potions/weapons/armor/tools<br/>
          &nbsp;S - SWITCH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  a switch/turret<br/>
          &nbsp;D - DROP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--> item<br/>
          &nbsp;F - FLING/FIRE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; --> item/zap wand
        <p/>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/WizardWarsIO/wiz-server">Tutorial + Source Code</a>
        <br/>
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/7nJNw2T">Discord Player Chat</a>
        <br/>
        <a target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/WizardWars">Patreon Support</a>
        <br/>
      </div>
    )
  }
}
export default TitleScreen;
