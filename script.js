let leftOperand, rightOperand, operator;
const numbers = document.querySelector('.numbers');

numbers.addEventListener('click', assignNumber);

function assignNumber(event) {
    const target = event.target;
    if (target.className == 'numbers') return;
    if (target.textContent == '=') return;

    const targetNumber = target.textContent;
    assignLeftOperand(targetNumber);
    console.log(leftOperand);
}

function assignLeftOperand(targetNumber) {
    if (leftOperand) leftOperand += targetNumber;
    else leftOperand = targetNumber;
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