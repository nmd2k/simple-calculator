import logo from './logo.svg';
import './App.css';
import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  CLEAR: "clear"
}

function evaluate({currentOperand, previousOperand, operation }) {
  const prev = parseFloat(currentOperand)
  const current = parseFloat(previousOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
  }

  return computation.toString()
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.operation != null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null,
      }

    case ACTIONS.CLEAR:
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: null,
      }

    case ACTIONS.EVALUATE:
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      }
  }
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-four"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
