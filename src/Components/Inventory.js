import React, { Component } from 'react';
import PropTypes from 'prop-types'

import InvItem from './InvItem';

const Inventory = ({ items = [], styleGuide }) => {
  let itemList = [];
  for (let j = 0; j < 9; j++) {
    if (items.length >= j + 1) {
      itemList.push(items[j]);
    } else {
      if (j === 0 && items.length < 1) {
        //itemList.push({name: "", equipped: false, selected: true});
      } else {
        itemList.push(null);
      }
    }
  }

  return (
    <div className="inv" align="center">
      {itemList.map((item, index) =>
        <InvItem key={index} styleGuide={styleGuide} data={item}/>
      )}
    </div>
  )
}

Inventory.propTypes = {
  items: PropTypes.array,
  styleGuide: PropTypes.object.isRequired
  // TODO: use more specific types (e.g.: PropTypes.arrayOf(PropTypes.shape({...})) )
}

export default Inventory;
