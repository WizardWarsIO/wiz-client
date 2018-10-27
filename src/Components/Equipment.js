import React, { Component } from 'react';
import EqItem from './EqItem';

class Equipment extends Component {
  render() {
    if (!this.props.items) {
        return <div/>
    }
    let face  = null;
    let armor = null;
    let boots = null;

    let weapon = null;

    if (this.props.eqIndexes.face) {
        face = this.props.items[this.props.eqIndexes.face - 1];
    }

    if (this.props.eqIndexes.armor) {
        armor = this.props.items[this.props.eqIndexes.armor - 1];
    }

    if (this.props.eqIndexes.boots) {
        boots = this.props.items[this.props.eqIndexes.boots - 1];
    }

    if (this.props.eqIndexes.weapon) {
        weapon = this.props.items[this.props.eqIndexes.weapon - 1];
    }

    //Left Half
    let faceNum = face ? (face.index + 1) : "";
    let armorNum = armor ? (armor.index + 1) : "";
    let bootsNum = boots ? (boots.index + 1) : "";
    let weaponNum = weapon ? (weapon.index + 1) : "";

    let faceClass = "eq-left";
    let armorClass = "eq-left";
    let bootsClass = "eq-left";
    let weaponClass = "eq-left";

    if (face && face.selected) {
        faceClass = "highlight eq-left";
    } else if (armor && armor.selected) {
        armorClass = "highlight eq-left";
    } else if (boots && boots.selected) {
        bootsClass = "highlight eq-left";
    } else if (weapon && weapon.selected) {
        weaponClass = "highlight eq-left";
    }

    return (
        <div id="equipment-container">
        <div id="equipment-title"></div>
        <div id="equipment">
        <div id="eq-col"></div>
                <div id="eq-col-1">
                    <div className={faceClass}>
                        <div>{face ? "(" + faceNum + ") " + face.name : ""}</div>
                    </div>
                    <div className={weaponClass}>
                        <div>{weapon ? "(" + weaponNum + ") " + weapon.name : ""}</div>
                    </div>
                    <div className={armorClass}>
                        <div>{armor ? "(" + armorNum + ") " + armor.name : ""}</div>
                    </div>
                    <div className={bootsClass}>
                        <div>{boots ? "(" + bootsNum + ") " + boots.name : ""}</div>
                    </div>
                </div>
                <div id="eq-col-2">
                    <div className="eq-right">
                        <EqItem data={face} styleGuide={this.props.styleGuide}/>
                    </div>
                    <div className="eq-right">
                        <EqItem data={weapon} styleGuide={this.props.styleGuide}/>
                    </div>
                    <div className="eq-right">
                        <EqItem data={armor} styleGuide={this.props.styleGuide}/>
                    </div>
                    <div className="eq-right">
                        <EqItem data={boots} styleGuide={this.props.styleGuide}/>
                    </div>
                </div>
        <div id="eq-col"></div>
        </div>
        </div>
    )
  }
}

export default Equipment;
