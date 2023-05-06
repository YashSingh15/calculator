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

function operate(operand1, operator, operand2) {
    switch (operator) {
        case 'add':
            return add(num1, num2);
        case 'subtract':
            return subtract(num1, num2);
        case 'multiply':
            return multiply(num1, num2);
        case 'divide':
            return divide(num1, num2)
    }
}

function updateDisplay(e) {
    const display = document.querySelector('.display');
    const selectedButtonText = e.target.textContent;
    
    if (selectedButtonText.match(/\d/)) {
        display.textContent = selectedButtonText;
    }
}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
    button.addEventListener('click', updateDisplay);
}
