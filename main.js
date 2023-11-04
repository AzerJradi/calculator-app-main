// Define variables to keep track of the calculator's state.
let currentInput = '';
let currentOperator = '';
let previousInput = '';
let resultDisplayed = false;

// Select all the calculator buttons.
const buttons = document.querySelectorAll('button');

// Add a click event listener to each button.
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Function to handle button clicks.
function handleButtonClick(event) {
  const value = event.target.textContent;

  if (isNumber(value) || value === '.') {
    if (resultDisplayed) {
      currentInput = value;
      resultDisplayed = false;
    } else {
      currentInput += value;
    }
    updateDisplay(currentInput);
  } else if (isOperator(value)) {
    if (currentOperator && currentInput) {
      calculate();
    }
    currentOperator = value;
    previousInput = currentInput;
    currentInput = '';
  } else if (value === '=') {
    if (currentOperator && currentInput) {
      calculate();
      currentOperator = '';
    }
    resultDisplayed = true;
  } else if (value === 'DEL') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (value === 'RESTART') {
    clearCalculator();
  }
}

// Function to update the calculator display.
function updateDisplay(value) {
  document.querySelector('.resultat').textContent = value;
}

// Function to check if a value is a number.
function isNumber(value) {
  return !isNaN(parseFloat(value));
}

// Function to check if a value is an operator.
function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

// Function to calculate the result.
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (currentOperator) {
    case '+':
      currentInput = (num1 + num2).toString();
      break;
    case '-':
      currentInput = (num1 - num2).toString();
      break;
    case '*':
      currentInput = (num1 * num2).toString();
      break;
    case '/':
      if (num2 !== 0) {
        currentInput = (num1 / num2).toString();
      } else {
        currentInput = 'Error';
      }
      break;
  }

  updateDisplay(currentInput);
}

// Function to clear the calculator.
function clearCalculator() {
  currentInput = '';
  currentOperator = '';
  previousInput = '';
  resultDisplayed = false;
  updateDisplay('RESULTAT');
}
