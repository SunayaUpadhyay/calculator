//Constants
const upperText = document.querySelector("#upper-text");
const lowerText = document.querySelector("#lower-text");

//Varaibles

let dotPressed = false;
let operatorPressed = false;
let numberStr1 = "0";
let numberStr2 = "0";
let operatorStr = "";
let temp = "0";


//Functions

function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}


function operate(operator, x, y) {
    switch(operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y)
        default:
            return 0;
    }
}

function canAdd(num, str) {
    if (num == ".") {
        return !str.includes(".");
    }
    return true;
}


// EventListeners

let numberList = document.querySelectorAll(".number");
numberList.forEach(number => {
    number.addEventListener("click", e => {
        if (!operatorPressed) {
            if (canAdd(number.dataset.value, numberStr1)) {
                numberStr1 += number.dataset.value;
            }
            lowerText.textContent = Number(numberStr1);
            upperText.textContent = Number(numberStr1);
        } else {
            if (canAdd(number.dataset.value, numberStr2)) {
                numberStr2 += number.dataset.value;
            }
            lowerText.textContent = Number(numberStr2);
            upperText.textContent = `${Number(numberStr1)} ${operatorStr} ${Number(numberStr2)}`
        }
    })
})


let operatorList = document.querySelectorAll(".operator");
operatorList.forEach(operator => {
    operator.addEventListener("click", e => {
        numberStr1 = numberStr1 == "0" ? temp : numberStr1;
        temp = "0";
        if (operatorPressed && numberStr2 > 0) {
            let calculatedNum = operate(operatorStr, numberStr1, numberStr2);
            lowerText.textContent = calculatedNum;
            numberStr1 = `${calculatedNum}`;
            numberStr2 = "0";
        }
        operatorStr = operator.dataset.value;
        if (operatorStr == "=") {
            operatorPressed = false;
            temp = numberStr1;
            numberStr1 = "0";
        } else {
            operatorPressed = true;
            upperText.textContent = `${Number(numberStr1)} ${operatorStr}`
        }
    })
})


let clearAll = document.getElementById("ac");
clearAll.addEventListener("click", () => {
    operatorPressed = false;
    numberStr1 = "0";
    temp = "0";
    numberStr2 = "0";
    operatorStr = "";
    operatorCounter = 0;
    lowerText.textContent = Number(numberStr1);
    upperText.textContent = Number(numberStr1);
})



let deleteSingle = document.getElementById("c");
deleteSingle.addEventListener("click", () => {
    if (!operatorPressed) {
        if (!(numberStr1.length == 1)) {
            numberStr1 = numberStr1.slice(0, numberStr1.length - 1);
        } else {
            numberStr1 = "0";
        }
        numberStr1 = numberStr1 == "-" ? "0" : numberStr1;
        lowerText.textContent = Number(numberStr1);
        upperText.textContent = Number(numberStr1);
    } else {
        if (!(numberStr2.length == 1)) {
            numberStr2 = numberStr2.slice(0, numberStr2.length - 1);
        } else {
            numberStr2 = "0";
        }
        numberStr2 = numberStr2 == "-" ? "0" : numberStr2;
        lowerText.textContent = Number(numberStr2);
        upperText.textContent = `${Number(numberStr1)} ${operatorStr} ${Number(numberStr2)}`
    }
})



