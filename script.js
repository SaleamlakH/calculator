const dialog = document.querySelector('dialog');
const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.backspace');
const input = document.querySelector('input');
let operatedByEqualSign = false;
let operator = null;
const operands = {
    leftOperand: '',
    rightOperand: ''
}

input.addEventListener('blur', () => input.focus());
input.addEventListener('keydown', handleKeydown);
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
    if (isZeroDivision()) return;
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
    if (event && isZeroDivision()) return;
    
    let result = roundResult(operate());

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
    
    toggleErrorDialog();
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

function roundResult(result) {
    let resultAsStr = String(result);
    let numOfDecimalPlaces = resultAsStr.slice(resultAsStr.indexOf('.')).length;

    if (numOfDecimalPlaces >= 5) return result.toFixed(5);
    return result;
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
    toggleErrorDialog();
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

function toggleErrorDialog() {
    if (isZeroDivision()) {
        dialog.show();
    } else {
        dialog.close();
    }
}

function isZeroDivision() {
    let rightOperand = parseFloat(operands.rightOperand);
    
    if (rightOperand === 0 && operator === 'divide') return true;
    return false;
}

function handleKeydown(event) {
    const pressedKey = event.key.toLowerCase();
    const operatorKeys = {'+': 'add',
        '-': 'subtract', 
        '*': 'multiply', 
        '/': 'divide',
    }

    //The key is only displayed by `displayOperand` function
    event.preventDefault();

    if (Number(pressedKey) || pressedKey == '0' || pressedKey == '.') {
        let currentOperand = setOperand(pressedKey);
        displayOperand(currentOperand);
        updateSecondaryDisplay();
    } else if (pressedKey == 'backspace') {
        deleteNumber();
        return;
    }
    
    let tempOperator = operatorKeys[pressedKey];
    if (tempOperator) {
        if (!operands.leftOperand) return;
        if (operatedByEqualSign) operatedByEqualSign = false;
        if (operands.rightOperand) calculate();
        operator = tempOperator;
        updateSecondaryDisplay();
    }

    if (pressedKey == '=') {
        calculate(true);
    }
}