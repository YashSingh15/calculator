const display = document.querySelector('.display');

const ADD = '+';
const SUBTRACT = '−';
const MULTIPLY = '×';
const DIVIDE = '÷';
const EQUALS = '=';
const PLUS_MINUS = '±';

let result = 0;
let operator = '';
let newEntry = false;

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case ADD:
            return add(num1, num2);
        case SUBTRACT:
            return subtract(num1, num2);
        case MULTIPLY:
            return multiply(num1, num2);
        case DIVIDE:
            return divide(num1, num2)
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function isOperator(text) {
    const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];
    return operators.includes(text);
}


function updateDisplay(e) {
    const selectedButtonText = e.target.textContent;

    if (selectedButtonText === 'AC') {
        result = 0;
        operator = '';
        clearDisplay();
        return;
    }

    if (isOperator(selectedButtonText)) {
        result = +display.textContent;
        operator = selectedButtonText;
        newEntry = true;
        return;
    }

    if (selectedButtonText === EQUALS) {
        if (operator === '') {
            return;
        }

        const num1 = result;
        const num2 = +display.textContent;

        result = operate(num1, operator, num2);
        display.textContent = result;

        operator = '';
        return;
    }

    if (display.textContent === '0') {
        display.textContent = selectedButtonText;
    } else {
        if (newEntry) {
            clearDisplay();
            display.textContent = selectedButtonText;
            newEntry = false;
        } else {
            display.textContent += selectedButtonText;
        }
    }
}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
    button.addEventListener('click', updateDisplay);
}
