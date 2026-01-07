const operands = {
    leftOperand: '',
    rightOperand: ''
} 
let operator = null;
let operatedByEqualSign = false;
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.backspace');
const input = document.querySelector('input');

input.addEventListener('blur', () => input.focus());
numbers.addEventListener('click', assignNumber);
operators.addEventListener('click', setOperator);
clearBtn.addEventListener('click', resetCalc);
deleteBtn.addEventListener('click', deleteNumber);
equalSign.addEventListener('click', () => {
    if (!operands.rightOperand) return;
    
    let result = operate();
    updateCalculatorState(result, true);
    displayOperand(result);
});

function assignNumber(event) {
    const target = event.target;
    if (target.className == 'numbers') return;
    if (target.textContent == '=') return;

    const targetNumber = target.textContent;
    let operand = setOperand(targetNumber);
    displayOperand(operand);
}

function setOperator(event) {
    const target = event.target;
    
    if (target.className == 'operators') return;
    if (!operands.leftOperand) return;
    if (operatedByEqualSign) operatedByEqualSign = false;
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
    let currentOperand = getCurrentOperand();

    if (number == '.' && operands[currentOperand].includes('.')) return;
    if (operands[currentOperand] == '0') operands[currentOperand] = '';
    if (operands[currentOperand]) {
        operands[currentOperand] += number;
    } else if (number == '.') {
        operands[currentOperand] = '0.';
    } else {
        operands[currentOperand] = number;
    }
    
    return operands[currentOperand];
}

function getCurrentOperand() {
    if (operatedByEqualSign) {
        operands.leftOperand = '';
        operatedByEqualSign = false;
        return 'leftOperand';
    }

    return operator ? 'rightOperand' : 'leftOperand';
}

function updateCalculatorState(result, isEqualSign = false) {
    operands.leftOperand = result;
    operands.rightOperand = '';
    if (isEqualSign) {
        operatedByEqualSign = true;
        operator = null;
    } else {
        operatedByEqualSign = false;
    }
}

function deleteNumber() {
    const currentOperand = getCurrentOperand();

    updatedOperand = operands[currentOperand].slice(0, -1);
    operands[currentOperand] = updatedOperand;
    displayOperand(updatedOperand);
}

function resetCalc() {
    operands.leftOperand = '';
    operands.rightOperand = '';
    operator = null;
    displayOperand('');
}

function displayOperand(operand) {
    const display = document.querySelector('input');
    display.value = operand;
}