const operands = {
    leftOperand: '',
    rightOperand: ''
} 
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
    setOperand(targetNumber);
}

function setOperator(event) {
    const target = event.target;
    if (target.className == 'operators') return;
    if (!operands.leftOperand) return;

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

function setOperand(number) {
    let currentOperand = (operator) ? 'rightOperand' : 'leftOperand';
    
    if (number == '.' && operands[currentOperand].includes('.')) return;
    if (operands[currentOperand]) {
        operands[currentOperand] += number;
    } else if (number == '.') {
        operands[currentOperand] = '0.';
    } else {
        operands[currentOperand] = number;
    }
    
    displayOperand(operands[currentOperand]);
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