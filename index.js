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
let gotResult = false;

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

function isUtility(text) {
    const utilities = [PLUS_MINUS, '%'];
    return utilities.includes(text);
}

function updateDisplay(selectedButtonText) {
    if (selectedButtonText === 'AC') {
        result = 0;
        operator = '';
        clearDisplay();
        return;
    }

    if (isOperator(selectedButtonText)) {
        result += +display.textContent;
        operator = selectedButtonText;
        newEntry = true;
        return;
    }

    if (isUtility(selectedButtonText)) {
        const utility = selectedButtonText;
        if (utility === '%') {
            result = +display.textContent / 100;
            display.textContent = result;
        } else if (utility === PLUS_MINUS) {
            result = -(+display.textContent);
            display.textContent = result;
        }

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
        gotResult = true;
        return;
    }

    if (display.textContent === '0') {
        if (selectedButtonText === 'Backspace') {
            return;
        }

        display.textContent = selectedButtonText;
    } else {
        if (newEntry) {
            clearDisplay();
            display.textContent = selectedButtonText;
            newEntry = false;
        } else if (gotResult) {
            clearDisplay();
            display.textContent = selectedButtonText;
            gotResult = false;
        }
        else {
            if (selectedButtonText === 'Backspace') {
                if (display.textContent.length === 1) {
                    display.textContent = '0';
                    return;
                }

                display.textContent = display.textContent.slice(0, -1);
                return;
            }
            display.textContent += selectedButtonText;
        }
    }
}

function updateDisplayButton(e) {
    const selectedButtonText = e.target.textContent;
    updateDisplay(selectedButtonText);
}

function updateDisplayKeyboard(e) {
    const allowedButtons = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace',
        ADD, SUBTRACT, MULTIPLY, DIVIDE, EQUALS, PLUS_MINUS,
    ];

    if (allowedButtons.includes(e.key)) {
        updateDisplay(e.key);
    }

    if (e.key === 'Enter') {
        updateDisplay(EQUALS);
    }

    if (e.key === 'Escape') {
        updateDisplay('AC');
    }
}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
    button.addEventListener('click', updateDisplayButton);
}

document.addEventListener('keydown', updateDisplayKeyboard);