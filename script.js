let leftOperand = '';
let rightOperand = '';
let operator;
const numbers = document.querySelector('.numbers');

numbers.addEventListener('click', assignNumber);

function assignNumber(event) {
    const target = event.target;
    if (target.className == 'numbers') return;
    if (target.textContent == '=') return;

    const targetNumber = target.textContent;
    assignLeftOperand(targetNumber);
}

function assignLeftOperand(targetNumber) {
    if (targetNumber == '.' && leftOperand.includes('.')) return;
    
    if (leftOperand) {
        leftOperand += targetNumber;
    } else if (targetNumber == '.') {
        leftOperand = '0.';
    } else {
        leftOperand = targetNumber;
    }
    
    displayOperand(leftOperand);
}

function displayOperand(operand) {
    const display = document.querySelector('input');
    display.value = operand;
}

function add(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
}

function subtract(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
}

function multiply(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

function divide(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
}