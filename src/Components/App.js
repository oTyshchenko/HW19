import React, { useState } from 'react';
import Display from './Display/Display';
import './App.scss';
import BtnBox from './BtnBox/BtnBox';

const App = () => {
  const [state, setstate] = useState({
    firstNumber: '',
    operator: '',
    secondNumber: '',
    result: '',
    display: ''
  });
  
  const getRefreshState = (firstNumber, operator, secondNumber, result, display) => {
    setstate({
      firstNumber: firstNumber,
      operator: operator,
      secondNumber: secondNumber,
      result: result,
      display: display
    })
  }

  const changeDisplay = (value) => {
    switch (true) {
      case value === 'AC':
        getRefreshState('', '', '', '', '');
        break;

      case ['/', '*', '-', '+'].includes(value):
        const firstNumber = state.firstNumber;

        if (firstNumber !== '') {
          getRefreshState(firstNumber, value, '', '', firstNumber);
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
            const firstNumber = state.firstNumber + '%';

            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          if (state.secondNumber !== '') {
            const secondNumber = state.secondNumber + '%';

            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
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
          const firstNumber = state.firstNumber + value;

          if (state.firstNumber !== '0' || state.firstNumber === '0.') {
            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          const secondNumber = state.secondNumber + value;

          if (state.secondNumber !== '0' || state.secondNumber === '0.') {
            getRefreshState(state.firstNumber, state.operator, secondNumber, '', secondNumber);
          }
        }
        break;

      default:
        if (state.operator === '') {
          if (state.firstNumber !== '0') {
            const firstNumber = state.firstNumber + value;

            getRefreshState(firstNumber, '', '', '', firstNumber);
          } else {
            const firstNumber = value;

            getRefreshState(firstNumber, '', '', '', firstNumber);
          }
        } else {
          if (state.secondNumber !== '0') {
            const secondNumber = state.secondNumber + value;

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
}

export default App;