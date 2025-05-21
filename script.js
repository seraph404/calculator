let firstNumber;
let secondNumber;
let operator;
let inputArr = [];
const screen = document.querySelector('#screen');

function add(x, y) {
    sum = x + y;
    clearScreen();
    printToScreen(sum);
}

function subtract(x, y) {
    difference = x - y;
    clearScreen();
    printToScreen(difference);
}

function multiply(x, y) {
    product = x * y;
    clearScreen();
    printToScreen(product);
}

function divide(x, y) {
    quotient = x / y;
    clearScreen();
    printToScreen(quotient);
}

// executes function based on operator
function operate(operator, x, y) {
    switch(operator) {
        case "+":
            add(firstNumber, secondNumber);
            break;
        case "-":
            subtract(firstNumber, secondNumber);
            break;
        case "*":
            multiply(firstNumber, secondNumber);
            break;
        case "/":
            divide(firstNumber, secondNumber);
            break;
    }
}

const buttons = document.querySelectorAll('#buttons button');
buttons.forEach((button) => {
        button.addEventListener('click', printToScreen);
});

function clearScreen() {
    screen.textContent = '';
    inputArr = [];
    firstNumber;
    secondNumber;
}

// triggered with every button press
function printToScreen(text) {
    // this bit here is to allow me to use the function for an event listener, or on its own
    let value;
    // check if the argument is an event object
    if (text && text.target) {
        value = text.target.textContent;
    } else {
        value = text;
    }



    // don't print
    const doNotPrint = ["AC", "DEL", "="]

    if (!doNotPrint.includes(value)) {
    screen.textContent += value; 
    inputArr.push(value);
    } else if (value === "AC") {
        clearScreen();
    } else if (value === "DEL") {
        inputArr.pop();
        screen.textContent = inputArr.join('');
        console.log(inputArr.join(''));
    } else if (value === "=") {
        secondNumber = parseInt(inputArr.join(''));
        operate(operator, firstNumber, secondNumber);
    }



    //console.log(inputArr);
    // e.target.textContent contains an operator
    // aka check for +, -, x, /
    const operators = ["+", "-", "*", "/"];
    const hasOperator = inputArr.some(item => operators.includes(item));
    // check inputArr for an operator
    if (hasOperator) {
        console.log("Operator discovered!");
        // remove operator from array, store it
        operator = inputArr.pop();
        // join array, store it as firstNumber
        firstNumber = parseInt(inputArr.join(''));
        // clear array
        inputArr = [];
        //console.log(firstNumber + " " + operator + " ...tbd");
    }


    }
    