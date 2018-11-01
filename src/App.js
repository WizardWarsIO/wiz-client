import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map';
import Log from './Components/Log';
import Inventory from './Components/Inventory';
import TitleScreen from './Components/TitleScreen';
import LBPanel from './Components/LBPanel';
import Equipment from './Components/Equipment';
import WinCondition from './Components/WinCondition';
import Pubsub from 'pubsub-js';
import io from 'socket.io-client';

class App extends Component {
  componentWillMount() {
    this.setState({input: {type: 'move', dir: 0, num: 1}});
    this.setState({player: {name: '', active: false}});
    this.myMap = [];
    this.intentContext = 0;
    this.installKeymaps();
    this.arrowsDown = {37: false, 39: false, 38: false, 40: false};
  }

  installKeymaps() {
    this.arrowMap = {
      37: 4,
      39: 6,
      38: 8,
      40: 2
    }

    this.dirMap = {
      97: 1,
      98: 2,
      99: 3,
      100: 4,
      101: 5,
      102: 6,
      103: 7,
      104: 8,
      105: 9,
      32: 5,

      // QP's  keyboard
      76:  7,
      85:  8,
      89:  9,
      78:  4,
      69:  5,
      73:  6,
      77:  1,
      188: 2,
      190: 3

    }

    this.actionMap =  {
      65: 'apply',
      83: 'spell',
      68: 'drop',
      70: 'fire'
    }

    this.numMap = {
      48: 0,
      49: 1,
      50: 2,
      51: 3,
      52: 4,
      53: 5,
      54: 6,
      55: 7,
      56: 8,
      57: 9
    }

  }

  //default to movement
  //neutral -> #: ready item
  //with a ready'd item: throw -> direction: throw # in that dir
  //with an item ready'd, you still default to move until you select throw or another action

  joinGame(chosenName){
    console.log("Joining" + this.socket);
    this.socket.emit('joingame', {'wizard': true, 'name':chosenName});
  }

  assignDefaultState() {
    this.setState({'input' : {'type' : 'move', 'dir' : 0, 'num' : this.state.input.num}});
  }

  processData(data) {
    window.data = data;
    let map = data.map;
    let moved = data.moved;
    let events = data.events;
    let logs = data.msgs;
    let hp = data.hp;
    this.setState({'winner': data.winner});
    this.setState({'inventory':{items: data.inventory, eqIndexes: data.eqIndexes}});
    this.setState({'lb':data.lb});
    this.setState({'status':data.status});
    if (data.status === 'killed') {
      this.setState({'killedBy':data.killedBy});
    }
    Pubsub.publish('logs', logs);
    window.map = map;
    Pubsub.publish('map', {map: map, events: events, moved:moved});
    Pubsub.publish('hp', hp);
    let win = data.win;
    Pubsub.publish('win', win);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown.bind(this), true);
    window.addEventListener("keyup", this.onKeyUp.bind(this), true);
    window.serverAddress = 'http://206.189.227.251:8000/';
    window.reloadFn = this.componentDidMount;
    let socket = io.connect(window.serverAddress);
    socket.on('connect', function(m) {
      console.log("my connect");
    });
    socket.on('foo', function(m) {
      this.socket.playerID = m.playerID;
      this.styleGuide = m.styleGuide;
      console.log("Got a player id" + this.socket.playerID);
      this.timeout = undefined;
      this.setState({'player' : {'name':m.playerID, 'active':true}});
    }.bind(this));
    socket.on('gameover', function(res) {
      console.log("game over");
      this.handleGameover();
      socket.playerID = undefined;
    }.bind(this));
    socket.on('playerinfo', function(res) {
      this.assignDefaultState();
      let valid = false;
      if (res) {
        if (res.data) {
          if (!res.data.error) {
              let data = res.data;
              this.processData(data);
              valid = true;
          }
        }
      }

      if (!valid) {
        console.log("No good data");
        this.attemptTimeout();
      }
    }.bind(this));

    this.socket = socket;
    setInterval(this.heartbeat.bind(this), 100);
  }

  handleGameover() {
    if (!this.timeout) {
      this.timeout = 60;
      Pubsub.publish('logs', ["GAME OVER"]);
      Pubsub.publish('hp', 0);
    } else {
      console.warn("game over was called, but a timeout already exists");
    }
  }

  attemptTimeout() {
    if (this.timeout) {
      this.timeout--;
      if (this.timeout <= 0) {
        this.setState({status: 'finished', player: {active: false}});
      }
    } else {
      this.socket.emit('heartbeat', 'true');
    }
  }

  sendIntent() {
    console.log("Sending intent");
    console.log(JSON.stringify(this.state.input));
    if (!this.state || !this.state.input) {
      this.attemptTimeout();
      return;
    }
    if (!this.socket.playerID) {
      this.attemptTimeout();
      return;
    }
    let iType = this.state.input.type;
    let iDir = this.state.input.dir;
    let iNum = this.state.input.num;
    this.socket.emit('input', {'playerID' : this.socket.playerID, 'type' : iType, 'dir' : iDir, 'num' : iNum});
  }

  heartbeat() {
    this.attemptTimeout();
  }

  onKeyUp(event) {
    let keys = Object.keys(this.arrowMap);
    if (keys.indexOf(event.keyCode >= 0)) {
      this.arrowsDown[event.keyCode] = false;
      // let dir = this.updateArrowInput();
      // let newInput = {dir: dir, type: this.state.input.type, num: this.state.input.num};
      // // console.log("new input" + JSON.stringify(newInput));
      // this.setState({input: newInput});
      // this.sendIntent();
    }
  }

  updateArrowInput() {
    let dir = 5;
    if (this.arrowsDown[37]) {
      dir = 4;
      if (this.arrowsDown[38]) {
        dir = 7;
      } else if (this.arrowsDown[40]) {
        dir = 1;
      }
    } else if (this.arrowsDown[38]) {
      dir = 8;
      if (this.arrowsDown[39]) {
        dir = 9;
      }
    } else if (this.arrowsDown[39]) {
      dir = 6;
      if (this.arrowsDown[40]) {
        dir = 3;
      }
    } else if (this.arrowsDown[40]) {
      dir = 2;
    }

    return dir;
  }

  isMoving() {
    return this.intentContext === 0;
  }

  assignNewInput(keyCode, newInput) {
    let dir = this.dirMap[keyCode];
    let shouldSend = true;

    if (dir || dir ===  0) {
        newInput = {dir: dir, type: this.state.input.type, num: this.state.input.num};
    } else {
      let action = this.actionMap[keyCode];
      if (action) {
          newInput = {dir: this.state.input.dir, type: action, num: this.state.input.num};
      } else {
        let num = this.numMap[keyCode];
        if (num) {
          newInput = {dir: this.state.input.dir, type: this.state.input.type, num: num};
          shouldSend = false;
        } else {
          let v = this.arrowMap[keyCode];
          if (v) {
            let prev = this.arrowsDown[keyCode];
            this.arrowsDown[keyCode] = true;
            if (prev === false) {
              let dir = this.updateArrowInput();
              newInput = {dir: dir, type: this.state.input.type, num: this.state.input.num};
              this.setState({input: newInput});
              this.sendIntent();
              return false;
            }
          }
        }
      }
    }

    return [newInput, shouldSend];
  }

  onKeyDown(event) {
    if (this.state && this.state.player) {
      if (this.state.player.active) {
        // event.preventDefault();
      } else {
        return;
      }
    }

    let oldInput = this.state.input;
    let newInput = oldInput;
    let ri = this.assignNewInput(event.keyCode, newInput);
    if (ri === false) {
      return;
    }

    newInput = ri[0];
    let shouldSend = ri[1]

    if (!shouldSend) {
      this.setState({'input': newInput});
      return;
    }

    if (oldInput.dir !== newInput.dir || oldInput.type !== newInput.type) {
      if (newInput.dir === 5){
        Pubsub.publish('logs', ["You grind to a halt."]);
      }
      this.setState({'input': newInput});
      this.sendIntent();
    }
  }

  mySymbol() {
    let r = Math.floor(Math.random() * 3);
    return ["_", "|", "|"][r];
  }

  render() {
    const { player, status, winner, killedBy } = this.state
    if (!player.active) {
      return (
        <TitleScreen
          winner={winner}
          killedBy={killedBy}
          startgame={this.joinGame.bind(this)}
        />
      )
    }

    let inv = [];
    let eqIndexes = {};

    if (this.state && this.state.inventory){
      inv = this.state.inventory.items;
      eqIndexes = this.state.inventory.eqIndexes;
    }


    let selectedNum = 0;
    inv = inv.map((data, i) => {
      let selected = (this.state.input.num === (i + 1));
      if (selected) {
        selectedNum = i + 1;
      }
      return ({name: data[0], equipped: data[1], index: i, selected: selected, rendercode:data[2]});
    });

    return (
      <div className="App" style={{backgroundColor: "#000000", color:"#FFFFFF"}}>
        <div id="container">
          <div id="invcontainer">
            <Inventory items={inv} eqIndexes={eqIndexes} styleGuide={this.styleGuide}/>
          </div>
          <div id="main">
            <div id="leftpanel">
              <Equipment items={inv} eqIndexes={eqIndexes} readyNum={selectedNum} styleGuide={this.styleGuide}/>
              <LBPanel items={this.state.lb}/>
            </div>
            <div id="centerpanel">
              <Map styleGuide={this.styleGuide}/>
            </div>
            <div id="rightpanel">
              <Log/>
            </div>
          </div>
          <WinCondition/>
        </div>
      </div>
    );
  }
}

export default App;
