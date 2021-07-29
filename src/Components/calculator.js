import React, { useState } from 'react';
import Display from './display/display.js';
import BtnBox from './btnBox/btnBox.js';
import { getCutStr } from '../logic/getCutStr.js';

import './calculator.scss';

const Calculator = () => {
  const [state, setstate] = useState({
    firstNumber: '',
    operator: '',
    secondNumber: '',
    result: '',
    display: ''
  });

  const getRefreshState = (firstNumber, operator, secondNumber, result, onDisplay) => {
    const display = document.getElementById('display');

    if (onDisplay) {
      if (onDisplay.length >= 0 && onDisplay.length < 8) {
        display.style.fontSize = '50px';
      } else if (onDisplay.length >= 8 && onDisplay.length < 10) {
        display.style.fontSize = '40px';
      } else if (onDisplay.length >= 10 && onDisplay.length < 13) {
        display.style.fontSize = '30px';
      } else if (onDisplay.length >= 13) {
        display.style.fontSize = '20px';
      }
    }

    setstate({
      firstNumber: firstNumber,
      operator: operator,
      secondNumber: secondNumber,
      result: result,
      display: onDisplay
    })
  }

  const changeDisplay = (value) => {

    switch (true) {
      case value === 'AC':
        getRefreshState('', '', '', '', '');
        break;

      case ['/', '*', '-', '+'].includes(value):
        if (state.firstNumber !== '') {
          getRefreshState(state.firstNumber, value, '', '', state.firstNumber);
        }
        break;

      case value === '+/-':
        if (state.operator === '') {
          const firstNumber = String(state.firstNumber * -1);
          getRefreshState(firstNumber, '', '', '', firstNumber);
        } else {
          const secondNumber = String(state.secondNumber * -1);
          getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
        }
        break;

      case value === '%':
        if (state.operator === '') {
          if (state.firstNumber !== '') {
            if (state.firstNumber.search('%') === -1) {
              const firstNumber = state.firstNumber + '%';
              getRefreshState(firstNumber, '', '', '', firstNumber);
            }
          }
        } else {
          if (state.secondNumber !== '') {
            if (state.secondNumber.search('%') === -1) {
              const secondNumber = state.secondNumber + '%';
              getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
            }
          }
        }
        break;

      case value === '.':
        if (state.operator === '') {
          if (state.firstNumber.indexOf('.') === -1) {
            const firstNumber = state.firstNumber + value;
            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          if (state.secondNumber.indexOf('.') === -1) {
            const secondNumber = state.secondNumber + value;
            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
          }
        }
        break;

      case value === '=':
        let result;
        if (state.operator === '+') {
          if (state.firstNumber.indexOf('%') !== -1 && state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 + parseFloat(state.secondNumber) / 100 * parseFloat(state.firstNumber) / 100);
          } else if (state.firstNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 + parseFloat(state.secondNumber));
          } else if (state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) + parseFloat(state.secondNumber) / 100 * +state.firstNumber);
          } else {
            result = String(+state.firstNumber + +state.secondNumber);
          }
        } else if (state.operator === '-') {
          if (state.firstNumber.indexOf('%') !== -1 && state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 - parseFloat(state.secondNumber) / 100 * parseFloat(state.firstNumber) / 100);
          } else if (state.firstNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 - parseFloat(state.secondNumber));
          } else if (state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) - parseFloat(state.secondNumber) / 100 * +state.firstNumber);
          } else {
            result = String(+state.firstNumber - +state.secondNumber);
          }
        } else if (state.operator === '*') {
          if (state.firstNumber.indexOf('%') !== -1 && state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 * parseFloat(state.secondNumber) / 100);
          } else if (state.firstNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 * parseFloat(state.secondNumber));
          } else if (state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) * parseFloat(state.secondNumber) / 100);
          } else {
            result = String(+state.firstNumber * +state.secondNumber);
          }
        } else if (state.operator === '/') {
          if (state.firstNumber.indexOf('%') !== -1 && state.secondNumber.indexOf('%') !== -1) {
            result = String((parseFloat(state.firstNumber) / 100) / (parseFloat(state.secondNumber) / 100));
          } else if (state.firstNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / 100 / parseFloat(state.secondNumber));
          } else if (state.secondNumber.indexOf('%') !== -1) {
            result = String(parseFloat(state.firstNumber) / parseFloat(state.secondNumber) / 100);
          } else {
            result = String(+state.firstNumber / +state.secondNumber);
          }
        };

        getRefreshState('', '', '', result, result);
        break;

      case value === '0':
        if (state.operator === '') {
          if (state.firstNumber !== '0' || state.firstNumber === '0.') {
            const firstNumber = state.firstNumber + value;
            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          if (state.secondNumber !== '0' || state.secondNumber === '0.') {
            const secondNumber = state.secondNumber + value;
            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
          }
        }
        break;

      default:
        if (state.operator === '') {
          if (state.firstNumber !== '0') {
            const firstNumber = getCutStr(state.firstNumber + value);
            getRefreshState(firstNumber, '', '', '', firstNumber);
          } else {
            const firstNumber = value;
            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          if (state.secondNumber !== '0') {
            const secondNumber = getCutStr(state.secondNumber + value);
            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
          } else {
            const secondNumber = value;
            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
          }
        }
        break;
    }
  }

  return (
    <div className="calculator">
      <Display display={state.display} />
      <BtnBox changeDisplay={changeDisplay} display={state.display} />
    </div>
  );
};

export default Calculator;