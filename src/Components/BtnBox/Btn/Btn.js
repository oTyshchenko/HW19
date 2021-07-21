import React from 'react';
import './Btn.scss';

const Btn = (props) => {
  const btnClick = () => {
    props.changeDisplay(props.value);
    let display = document.querySelector('.display');
    if (props.display) {
      if (props.display.length < 11) {
        display.style.fontSize = '60px'
      } else if (props.display.length >= 11 && this.props.display.length < 15) {
        display.style.fontSize = '50px'
      } else if (this.props.display.length >= 15 && this.props.display.length < 19) {
        display.style.fontSize = '40px'
      } else if (this.props.display.length >= 19) {
        display.style.fontSize = '20px'
      }
    }
  }

  return (
    <button className={props.className} onClick={btnClick}>
      {props.value}
    </button>
  )
}
export default Btn;