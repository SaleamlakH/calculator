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
    if (operands.rightOperand) {
        let result = operate();
        updateCalculatorState(result);
        displayOperand(result);
    }

    operator = target.children.length
        ? target.className
        :target.parentNode.className;
}

function operate() {
    const leftOperand = parseFloat(operands.leftOperand);
    const rightOperand = parseFloat(operands.rightOperand);

    const operations = {
        add: () => leftOperand + rightOperand,
        subtract: () => leftOperand - rightOperand,
        multiply: () => leftOperand * rightOperand,
        divide: () => leftOperand / rightOperand
    }

    return operations[operator]();
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

function updateCalculatorState(result) {
    operands.leftOperand = result;
    operands.rightOperand = '';
}

function displayOperand(operand) {
    const display = document.querySelector('input');
    display.value = operand;
}