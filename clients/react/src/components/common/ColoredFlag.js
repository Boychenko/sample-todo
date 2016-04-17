import React, {PropTypes} from 'react';

const ColoredFlag = (prop) => {
  return (
    <span className={`label ${prop.value ? 'label-success' : 'label-danger'}`}>&nbsp;</span>
  );
};

ColoredFlag.PropTypes = {
  value: PropTypes.bool.isRequired
};

export default ColoredFlag;
