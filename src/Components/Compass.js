import React, { Component } from 'react';
//import compass from './compass.svg'

class Compass extends Component {
  render() {
  let data = this.props.data;
  if (!data || data === 5) {
    return <div/>
  }
  let blankchar = 10035;
  let degreechars = {0: blankchar, 5: blankchar, 9:8599, 6:8594, 3:8600, 2:8595, 1:8601, 4: 8592, 7: 8598, 8: 8593};
  let degreechar = degreechars[data];

  return <div className="compass" align = "center">
    {String.fromCharCode(degreechar)}
  </div>
  }
}

export default Compass;
