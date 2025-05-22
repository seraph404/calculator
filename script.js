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
    button.addEventListener('click', printToScreen);
});

function clearScreen() {
    screen.textContent = '';
    inputArr = [];
    firstNumber = undefined;
    secondNumber = undefined;
}

// triggered with every button press
function printToScreen(text) {
    //console.log(inputArr);
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
    //console.log("Pushing to arr!");
    inputArr.push(value);
    } else if (value === "AC") {
        clearScreen();
    } else if (value === "DEL") {
        inputArr.pop();
        screen.textContent = inputArr.join('');
        //console.log(inputArr.join(''));
    } else if (value === "=") {
        if (isNaN(firstNumber)) {
            firstNumber = parseInt(inputArr.join(''));
        }
        //console.log(inputArr);
        //console.log('(donotprint) First is ' + firstNumber);
        //console.log('(donotprint) Second is ' + secondNumber);
        //console.log('(donotprint) Operator is ' + operator);
        secondNumber = parseInt(inputArr.join(''));
        operate(operator, firstNumber, secondNumber);
        console.log(inputArr);
    }

    handleOperators();



    
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