let leftOperand = '';
let rightOperand = '';
let operator;
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');

numbers.addEventListener('click', assignNumber);
operators.addEventListener('click', setOperator);

function assignNumber(event) {
    const target = event.target;
    if (target.className == 'numbers') return;
    if (target.textContent == '=') return;

    const targetNumber = target.textContent;
    assignLeftOperand(targetNumber);
}

function setOperator(event) {
    const target = event.target;
    if (target.className == 'operators') return;
    if (!leftOperand) return;

    let targetOperator = '';
    if (target.children.length) targetOperator = target.className;
    else targetOperator = target.parentNode.className;

    switch (targetOperator) {
        case 'addition':
            operator = 'add';
            break;
        case 'subtraction':
            operator = 'subtract';
            break;
        case 'multiplication':
            operator = 'multiply'
            break;
        case 'division':
            operator = 'divide';
    }
    console.log(operator);
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