let firstNumber;
let secondNumber;
let operator;
let inputArr = [];
const screen = document.querySelector('#screen');

function add(x, y) {
    const sum = x + y;
    clearScreen();
    printToScreen(sum);
}

function subtract(x, y) {
    const difference = x - y;
    clearScreen();
    printToScreen(difference);
}

function multiply(x, y) {
    const product = x * y;
    clearScreen();
    printToScreen(product);
}

function divide(x, y) {
    const quotient = x / y;
    clearScreen();
    printToScreen(quotient);
}

// executes function based on operator
function operate(operator, x, y) {
    switch(operator) {
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

const buttons = document.querySelectorAll('#buttons button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => handleButtonClick(e));
});

function clearScreen() {
    screen.textContent = '';
    inputArr = [];
    firstNumber = undefined;
    secondNumber = undefined;
}


function handleButtonClick(event) {
    const value = event.target.textContent;

    if (value === "AC") {
        clearScreen();
    } else if (value === "DEL") {
        inputArr.pop();
        screen.textContent = inputArr.join('');
    } else if (value === "=") {
        secondNumber = parseInt(inputArr.join(''));
        operate(operator, firstNumber, secondNumber);
    } else {
        printToScreen(value);
        handleOperators();
    }

}

// triggered with every button press
function printToScreen(text) {
    // if coming from an event
    if (text.target) {
        text = text.target.textContent;
    }
    // don't print
    const doNotPrint = ["AC", "DEL", "="]

    if (doNotPrint.includes(text)) return;

    screen.textContent += text;
    inputArr.push(text);
    }
    
    function handleOperators() {
    // check for operators
    const operators = ["+", "-", "*", "/"];
    const hasOperator = inputArr.some(item => operators.includes(item));

    if (hasOperator) {

        // if we don't have a firstNumber, remove the
        // operator and assign what's left to the variable
        if (firstNumber === undefined) {
            operator = inputArr.pop();
            firstNumber = parseInt(inputArr.join(''));
        } else {
        // if we already have a firstNumber, just remove the operator
            operator = inputArr.pop();
        }

        inputArr = [];
        //console.log(firstNumber + " " + operator + " ...tbd");
        }
    }