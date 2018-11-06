import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types'

class TitleScreen extends Component {
  static propTypes = {
    startgame: PropTypes.func.isRequired,
    winner: PropTypes.string,
    killedBy: PropTypes.string
  }

  inputRef = createRef()
  state = {
    playerName: ''
  }

  handleChange = e => this.setState({ playerName: e.currentTarget.value })

  startgame = e => {
    e.preventDefault();
    const { playerName } = this.state
    if (playerName && playerName.length > 0) {
      this.props.startgame(playerName);
    } else {
      alert("Pick a name, Dingus.");
      this.setState({ playerName: 'Dingus' })
    }
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { killedBy, winner } = this.props
    const { playerName } = this.state

    // gameover message
    let message = null
    if (winner) {
      message = winner + " is the Winning Wizard!";
    } else if (killedBy) {
      message = "Killed by: " + killedBy;
    }

    return (
      <div className = 'title-screen' style={{backgroundColor: "#000000", color:"#FFFFFF"}}>
        <h1>WizardWars.io</h1>
        <h3>A Roguelike Deathmatch</h3>
        <div>{message}</div>
        <form onSubmit={this.startgame}> <br/>
          <input value={playerName} onChange={this.handleChange} ref={this.inputRef} />
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
