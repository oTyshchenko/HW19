import React from 'react';
import './Display.scss';

const Display = (props) => {
  return (
    <div className="display">
      {props.display}
    </div>
  );
}

export default Display;