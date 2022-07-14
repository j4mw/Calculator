class Calculator {
  constructor(bankedNumber, currentNumber) {
    // on new calculator class
    this.bankedNumberText = bankedNumberText;
    this.currentNumberText = currentNumberText;
    this.clear();
  }
  clear() {
    // clear function empties string and sets operator as undefined
    this.currentNumber = "";
    this.bankedNumber = "";
    this.operation = undefined;
  }
  delete() {
    //remove last number from current number string
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }

  appendNumber(number) {
    // append number to string. will only allow once decimal point
    if (number === "." && this.currentNumber.includes(".")) return;
    else if (this.currentNumber.length < 15) {
      {
        this.currentNumber = this.currentNumber.toString() + number.toString();
      }
    } else return;
  }
  operationSelect(operation) {
    // upon operation button select, run compute to get calculated number in banked location
    if (this.currentNumber === "") return;
    if (this.bankedNumber !== "") {
      this.compute();
    }
    this.operation = operation;
    this.bankedNumber = this.currentNumber;
    this.currentNumber = "";
  }
  compute() {
    // calculates number. ensure numbers are numbers
    let calculation;
    const banked = parseFloat(this.bankedNumber);
    const current = parseFloat(this.currentNumber);
    if (isNaN(banked) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        calculation = banked + current;
        break;
      case "-":
        calculation = banked - current;
        break;
      case "*":
        calculation = banked * current;
        break;
      case "/":
        calculation = banked / current;
        break;
      default:
        return;
    }
    // TODO add feature to only allow 15 total digets, how to round with decimal places

    this.currentNumber = calculation;
    this.bankedNumber = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.currentNumberText.innerText = this.currentNumber;
    if (this.operation != null) {
      this.bankedNumberText.innerText = `${this.bankedNumber} ${this.operation}`;
    } else {
      this.bankedNumberText.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-num]");
const operatorButton = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete");
const currentNumberText = document.querySelector("[data-current-number]");
const bankedNumberText = document.querySelector("[data-banked-number]");

// create new calculator class
const calculator = new Calculator(bankedNumberText, currentNumberText);

//event listeners

// event listener for all number buttons and to look for displayed text in button
numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// event listener for all operator buttons and to look for displayed text in button
operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operationSelect(button.innerText);
    calculator.updateDisplay();
  });
});

// event listener for clear button
clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// event listener for equals button
equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// event listener for delete button
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
