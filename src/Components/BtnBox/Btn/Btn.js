import React from 'react';
import './btn.scss';

const Btn = (props) => {
  const btnClick = () => {
    props.changeDisplay(props.value);
  }

  return (
    <button className={props.className} onClick={btnClick}>
      {props.value}
    </button>
  )
}

export default Btn;