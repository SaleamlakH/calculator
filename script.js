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
equalSign.addEventListener('click', calculate);

function assignNumber(event) {
    const target = event.target;
    if (target.className == 'numbers') return;
    if (target.textContent == '=') return;

    const targetNumber = target.textContent;
    let operand = setOperand(targetNumber);
    displayOperand(operand);
    updateSecondaryDisplay();
}

function setOperator(event) {
    const target = event.target;
    
    if (target.className == 'operators') return;
    if (!operands.leftOperand) return;
    if (operatedByEqualSign) operatedByEqualSign = false;
    if (operands.rightOperand) calculate();

    operator = target.children.length
        ? target.className
        :target.parentNode.className;
    updateSecondaryDisplay();
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

//equal-sign passes an event, operators don't
function calculate(event = false) {
    if (event && !operands.rightOperand) return;
    
    let result = operate();

    if (event && operands.rightOperand) {
        updateSecondaryDisplay(true);
        updateCalculatorState(result, true);
    } else {
        updateCalculatorState(result);
    }
    displayOperand(result);
}

function setOperand(number) {
    let currentOperand = getCurrentOperand();

    if (number == '.' && operands[currentOperand].includes('.')) {
        return operands[currentOperand];
    };
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
    updateSecondaryDisplay();
}

function resetCalc() {
    operands.leftOperand = '';
    operands.rightOperand = '';
    operator = null;
    displayOperand('');
    updateSecondaryDisplay();
}

function displayOperand(operand) {
    input.value = operand;
}

function updateSecondaryDisplay(operated = false) {
    const secondaryDisplay = document.querySelector('.current-operation');
    const operators = {add: '+', subtract: '-', multiply: 'x', divide: '/'};
    let currentOperator = operators[operator] || '';

    secondaryDisplay.textContent = (operated)
        ? `${operands.leftOperand} ${currentOperator} ${operands.rightOperand} =`
        : `${operands.leftOperand} ${currentOperator}`
}