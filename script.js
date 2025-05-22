let firstNumber;
let secondNumber;
let operator;
let inputArr = [];
const screen = document.querySelector("#screen");
const operators = ["+", "-", "*", "/"];

function add(x, y) {
  const sum = x + y;
  screen.textContent = sum;
  firstNumber = sum;
}

function subtract(x, y) {
  const difference = x - y;
  screen.textContent = difference;
  firstNumber = difference;
}

function multiply(x, y) {
  const product = x * y;
  screen.textContent = product;
  firstNumber = product;
}

function divide(x, y) {
  let quotient = x / y;
  quotient = Number.parseFloat(quotient).toFixed(10); // round to 10 decimals
  screen.textContent = quotient;
  firstNumber = quotient;
}

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      add(x, y);
      break;
    case "-":
      subtract(x, y);
      break;
    case "*":
      multiply(x, y);
      break;
    case "/":
      divide(x, y);
      break;
  }
}

function printToScreen(text) {
  // if coming from an event
  if (text.target) {
    text = text.target.textContent;
  }

  // check for double operators
  const currentScreenText = screen.textContent;
  const lastChar = currentScreenText.slice(-1);

  const doNotPrint = ["AC", "DEL", "="];
  if (doNotPrint.includes(text)) return;

  if (operators.includes(text)) {
    // if the last character is an operator, replace it with the newest one
    if (operators.includes(lastChar)) {
      screen.textContent = currentScreenText.slice(0, -1) + text;
    } else {
      // otherwise, append the operator normally
      screen.textContent += text;
    }
  } else {
    // for numbers, append normally
    screen.textContent += text;
  }
}

function clearScreen() {
  screen.textContent = "";
  firstNumber = undefined;
  secondNumber = undefined;
}

function handleButtonClick(event) {
  const value = event.target.textContent;

  if (value === "AC") {
    clearScreen();
    inputArr = [];
  } else if (value === "DEL") {
    inputArr.pop();
    screen.textContent = inputArr.join("");
  } else if (value === "%") {
    // logic
  } else if (value === "=") {
    if (operator && firstNumber !== undefined) {
      secondNumber = parseInt(inputArr.join(""));
      operate(operator, firstNumber, secondNumber);
    }
  } else {
    // only add to inputArr if it's a number
    if (!operators.includes(value)) {
      inputArr.push(value);
    }
    printToScreen(value);

    if (operators.includes(value)) {
      handleOperators(value); // pass the operator
    }
  }
}

function handleOperators(newOperator) {
  // error handling
  if (operator && inputArr.length === 0) {
    operator = newOperator;
    return;
  }
  if (firstNumber === undefined) {
    // first operator case
    operator = newOperator;
    firstNumber = parseFloat(inputArr.join(""));
    inputArr = [];
  } else {
    // subsequent operator - calculate first
    const nextNumber = parseFloat(inputArr.join(""));
    operate(operator, firstNumber, nextNumber);

    // update state without clearing screen
    firstNumber = parseFloat(screen.textContent);
    operator = newOperator;
    inputArr = [];
    printToScreen(operator);
  }
}

const buttons = document.querySelectorAll("#buttons button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => handleButtonClick(e));
});
