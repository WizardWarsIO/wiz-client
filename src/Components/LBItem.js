import React from 'react';
import PropTypes from 'prop-types'

const LBItem = ({ num, name = '', score = null }) => (
  <tr className='lb-item'>
    <td></td>
    <td>{num + ')' + name}</td>
    <td align='right'>
      {'<'}
      {score}
      {'>'}
    </td>
  </tr>
)

LBItem.propTypes = {
  num: PropTypes.number.isRequired,
  name: PropTypes.string,
  score: PropTypes.number
}

export default LBItem;
