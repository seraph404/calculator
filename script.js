let firstNumber;
let secondNumber;
let operator;
let inputArr = [];
const operators = ["+", "-", "*", "/"];

function add(x, y) {
    sum = x + y;
    printToScreen(sum);
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    console.log("operating...");
    console.log(x + operator + y);
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
    // define the screen selector
    const screen = document.querySelector('#screen');
    screen.textContent += value; 
    if (value !== "=") {
    inputArr.push(value);
    }
    console.log(inputArr);
    // e.target.textContent contains an operator
    // aka check for +, -, x, /
    const hasOperator = inputArr.some(item => operators.includes(item));
    // check inputArr for an operator
    if (hasOperator) {
        console.log("Operator discovered!");
        // remove operator from array, store it
        operator = inputArr.pop();
        // join array, store it as firstNumber
        firstNumber = parseInt(inputArr.join());
        // clear array
        inputArr = [];
        //console.log(firstNumber + " " + operator + " ...tbd");
    }
    // when = is pressed...
    if (value === "=") {
        // join the second number, store it
        secondNumber = parseInt(inputArr.join());
        operate(operator, firstNumber, secondNumber);
    }

    }
    