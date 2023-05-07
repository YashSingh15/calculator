const display = document.querySelector('.display');

const ADD = '+';
const SUBTRACT = '−';
const MULTIPLY = '×';
const DIVIDE = '÷';
const EQUALS = '=';
const PLUS_MINUS = '±';

let result = 0;
let operator = '+';
let firstEntry = true;
let newEntry = false;
let gotResult = false;
let allowBackspace = true;
let decimalExists = false;

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
    decimalExists = false;
}

function isOperator(text) {
    const operators = [ADD, SUBTRACT, MULTIPLY, DIVIDE];
    return operators.includes(text);
}

function isUtility(text) {
    const utilities = [PLUS_MINUS, '%'];
    return utilities.includes(text);
}

function isDigit(text) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return digits.includes(text);
}

function handleInput(selectedButtonText) {
    if (selectedButtonText === 'AC') {
        result = 0;
        operator = '+';
        clearDisplay();
        firstEntry = true;
        newEntry = false;
        return;
    }

    if (selectedButtonText === '.') {
        if (decimalExists) {
            return;
        }

        display.textContent += selectedButtonText;
        decimalExists = true;
    }

    if (isDigit(selectedButtonText)) {
        if (firstEntry) {
            display.textContent = selectedButtonText;
            firstEntry = false;
            allowBackspace = true;
        } else if (newEntry) {
            display.textContent = selectedButtonText;
            decimalExists = false;
            newEntry = false;
            allowBackspace = true;
        } else {
            display.textContent += selectedButtonText;
            allowBackspace = true;
        }
    } else if (isOperator(selectedButtonText)) {
        const num = +display.textContent;
        result = operate(result, operator, num);
        display.textContent = result;
        operator = selectedButtonText;
        newEntry = true;
        allowBackspace = false;
    } else if (isUtility(selectedButtonText)) {
        const utility = selectedButtonText;
        if (utility === '%') {
            result = +display.textContent / 100;
            display.textContent = result;
        } else if (utility === PLUS_MINUS) {
            result = -(+display.textContent);
            display.textContent = result;
        }

        allowBackspace = false;
    } else if (selectedButtonText === EQUALS) {
        const num = +display.textContent;
        result = operate(result, operator, num);
        display.textContent = result;
        result = 0;
        operator = '+';
        newEntry = true;
        allowBackspace = false;
    } else if (selectedButtonText === 'Backspace') {
        if (newEntry) {
            return;
        }

        if (!allowBackspace) {
            return;
        }

        if (display.textContent.length === 1) {
            newEntry = true;
            clearDisplay();
            return;
        }

        display.textContent = display.textContent.slice(0, -1);
    }
}

function updateDisplayButton(e) {
    const selectedButtonText = e.target.textContent;
    handleInput(selectedButtonText);
}

function updateDisplayKeyboard(e) {
    const allowedButtons = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace',
        ADD, SUBTRACT, MULTIPLY, DIVIDE, EQUALS, PLUS_MINUS,
    ];

    if (allowedButtons.includes(e.key)) {
        handleInput(e.key);
    }

    if (e.key === 'Enter') {
        handleInput(EQUALS);
    }

    if (e.key === 'Escape') {
        handleInput('AC');
    }
}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
    button.addEventListener('click', updateDisplayButton);
}

document.addEventListener('keydown', updateDisplayKeyboard);