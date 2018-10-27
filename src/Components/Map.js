import React, { Component } from 'react';
import Tile from './Tile';
import Pubsub from 'pubsub-js';

class Map extends Component {
  componentWillMount() {
    this.styleGuide = this.props.styleGuide;
    Pubsub.subscribe('map', this.updateMap.bind(this));
    Pubsub.subscribe('hp', this.updateHP.bind(this));
  }

  styleSymbol(symbol) {
    if (this.styleGuide[symbol]) {
      return  String.fromCharCode(this.styleGuide[symbol].symbol);
    }
    return String.fromCharCode(symbol);
  }

  styleColor(symbol) {
    if (this.styleGuide[symbol]) {
      return this.styleGuide[symbol].color;
    }
    return 'white';
  }

  styleBG(symbol) {
    if (this.styleGuide[symbol]){
      return this.styleGuide[symbol].bgcolor;
    }
    return 'black';
  }

  updateMap(t, b) {
    this.setState({'newmap':b}, function() {
      this.throwTimestep = 0;
      this.drawEvents();
      setTimeout(this.generateTilesFromMap.bind(this), 100);
      setTimeout(this.drawMapWithoutEvents.bind(this), 400);
    }.bind(this));
  }

  offsetTile(space, offset, tiles) {
    let dx = offset[0];
    let dy = offset[1];
    let adjx = space.x + dx;
    let adjy = space.y + dy;
    let index = (adjy*21) + (adjx);
    return tiles[index];
  }

  validSpace(space, offset) {
    let dx = offset[0];
    let dy = offset[1];
    let adjx = space.x + dx;
    let adjy = space.y + dy;
    return (adjx > 0 && adjy > 0 && adjx < 21 && adjy < 20);
  }

  drawEvents() {
    let map = this.state.newmap;
    let tiles = this.state.tiles;
    if (!tiles) {
      return
    }
    let offset = map.moved;
    let dx = offset[0];
    let dy = offset[1];
    var ii = 0;
    var j = 0;
    for (ii = 0; ii < map.events.zaps.length; ii++) {
      let zap = map.events.zaps[ii];
      let type = zap.name;
      for (j = 0; j < zap.affectedSpaces.length; j++) {
        let space = zap.affectedSpaces[j];
        let adjx = space.x + dx;
        let adjy = space.y + dy;
        if (adjx > 0 && adjy > 0 && adjx < 21 && adjy < 20) {
          let index = (adjy*21) + (adjx);
          let tile = tiles[index];
          tile.symbol = this.styleSymbol(type);
          tile.color = this.styleColor(type);
          tiles[index] = tile;
        }
      }
    }

     for (ii = 0; ii < map.events.throws.length; ii++) {
      let t = map.events.throws[ii];
      for (j = 1; j < t.affectedSpaces.length; j++) {
        let space = t.affectedSpaces[j];
        let adjx = space.x + dx;
        let adjy = space.y + dy;
        if (adjx > 0 && adjy > 0 && adjx < 21 && adjy < 20) {
          let index = (adjy*21) + (adjx);
          let tile = tiles[index];
          tile.symbol = String.fromCharCode(8727);
          tile.color = 'white'
          tiles[index] = tile;
        }
      }
    }

    for (ii = 0; ii < map.events.hurts.length; ii++) {
      let t = map.events.hurts[ii];
        let space = t.affectedSpaces[0];
        let adjx = space.x + dx;
        let adjy = space.y + dy;
        if (adjx > 0 && adjy > 0 && adjx < 21 && adjy < 20) {
          let index = (adjy*21) + (adjx);
          let tile = tiles[index];
          //tile.symbol = String.fromCharCode(8728);
          tile.bgColor = 'red'
          tiles[index] = tile;
      }
    }

    for (ii = 0; ii < map.events.collisions.length; ii++) {
      let t = map.events.collisions[ii];
        let space = t.affectedSpaces[0];
        let adjx = space.x + dx;
        let adjy = space.y + dy;
        if (adjx > 0 && adjy > 0 && adjx < 21 && adjy < 20) {
          let index = (adjy*21) + (adjx);
          let tile = tiles[index];
          tile.symbol = String.fromCharCode(9733);
          tiles[index] = tile;
      }
    }

    this.setState({tiles:tiles});
  }

  updateHP(t, b) {
    this.setState({'hp':b});
  }

  drawTileMap() {
    let tiles = []
    let tilemap = this.state.newmap.map;
    // let map = this.state.newmap;

    for (var i = 0; i < 21; i++) {
      for (let row of tilemap) {
        let tile = {};
        let renderCode = row[i][0];
        tile.symbol = this.styleSymbol(renderCode );
        tile.bgColor = this.styleBG(renderCode);
        tile.color = this.styleColor(renderCode);
        renderCode = row[i][1];
        if (renderCode !== 0) {
          tile.symbol = this.styleSymbol(renderCode );
          let bg = this.styleBG(renderCode);
          if (bg) {
            tile.bgColor = bg;
          }
          tile.color = this.styleColor(renderCode);
        }
        tiles.push(tile);
      }
    }

    if (this.state && this.state.hp){
      let numHearts = Math.floor(this.state.hp.max / 7);
      if (numHearts > 21) {
        numHearts = 21;
      }
      for (i = 0; i < numHearts; i++) {
        let hp = this.state.hp.hp;

      let tile = {};
      let symbol = String.fromCharCode(0x2665);
      tile.symbol = symbol;
      tile.bgColor = 'black';
      if (hp > i * 7){
        tile.color = 'red';
      } else {
        tile.color = 'white';
      }

      tiles.push(tile);
      }
    }
    return tiles
  }

  drawMapWithoutEvents() {
    this.setState({tiles: this.drawTileMap()});
  }

  generateTilesFromMap() {
    let map = this.state.newmap;
    let tiles = this.drawTileMap();

    for (var ii = 0; ii < map.events.zaps.length; ii++) {
      let zap = map.events.zaps[ii];
      let type = zap.name;
      for (var j = 0; j < zap.affectedSpaces.length; j++) {
        let space = zap.affectedSpaces[j];
        if (space.x > 0 && space.y > 0 && space.x < 21 && space.y < 20) {
          let index = (space.y*21) + (space.x);
          let tile = tiles[index];
          tile.symbol = this.styleSymbol(type);
          tile.color = this.styleColor(type);
          //tile.bgColor = this.styleBG(type);
          tiles[index] = tile;
        }
      }
    }

    this.setState({tiles: tiles});
  }


  render() {
    if (!this.state || !this.state.tiles) {
      return (<div></div>);
    }

    let tiles = this.state.tiles;
    let tileElems;

    if (tiles) {
      tileElems = tiles.map((data, index) => {
        return (
          <center key={index}><Tile data={data}/></center>
        );
      });
    }

    return <div className="map">
      {tileElems}
    </div>
  }
}

export default Map;
