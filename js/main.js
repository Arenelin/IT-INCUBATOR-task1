"use strict";

let outputResult = document.querySelector('.calculate__result');
let showResult = document.querySelector('.showing__result');
let buttonsOperation = document.querySelectorAll('.calculate__symbols > .symbols')
let input = document.querySelector('.input');
let equalityBtn = document.querySelector('.equality');
let clearBtn = document.querySelector('.clear');
let btnNumbers = document.querySelectorAll('.calculate__numbers > button');
let btnPower = document.querySelector('.power');
let btnFactorial = document.querySelector('.factorial');
let btnRadical = document.querySelector('.radical');
let btnPlusOrMinus = document.querySelector('.plus-or-minus');
let btnPi = document.querySelector('.pi');
let btnProcent = document.querySelector('.procent');


input.addEventListener('keydown', (e) => {
   if (isNaN(e.key) && e.key !== 'Backspace' && e.key !== '+' && e.key !== '.' && e.key !== '-' && e.key !== '*' && e.key !== '/') {
      e.preventDefault();
   }
   if (outputResult.textContent === 'Вы ввели неверное значение' || outputResult.textContent === 'На ноль делить нельзя') {
      outputResult.textContent = '';
      showResult.textContent = '';
   }
   if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      e.preventDefault();
      makeOperation(e.key);
   }
   if (e.key === 'Enter') {
      result();
   }
});

input.addEventListener('keyup', (e) => {
   if (e.key === 'Backspace') {
      showResult.textContent = input.value;
   }
});

for (let i = 0; i < btnNumbers.length; i++) {
   btnNumbers[i].addEventListener('click', () => {
      input.value += +event.currentTarget.innerHTML;
      input.focus();
   })
}

for (let i = 0; i < buttonsOperation.length; i++) {
   buttonsOperation[i].addEventListener('click', () => {
      makeOperation(event.currentTarget.innerHTML);
   })
}

btnPower.addEventListener('click', () => {
   makeOperation(event.currentTarget.innerHTML);
});
btnFactorial.addEventListener('click', () => {
   makeOperation(event.currentTarget.innerHTML);
});
btnRadical.addEventListener('click', () => {
   makeOperation(event.currentTarget.innerHTML);
});
btnPlusOrMinus.addEventListener('click', () => {
   makeOperation(event.currentTarget.innerHTML);
});
btnProcent.addEventListener('click', () => {
   btnProcent.setAttribute('boolean', 'true');
   result();
   }
 );
btnPi.addEventListener('click', () => {
   input.value += 3.14159265359;
   numberTwo = 3.14159265359;
   input.focus();
});


let numberOne;
let operationSymbol;

function makeOperation(operation) {
   numberOne = +input.value;
   operationSymbol = operation;
   input.value = `${numberOne}${operationSymbol}`;
   input.focus();
   if (input.value === 'NaN') {
      outputResult.textContent = 'Вы ввели неверное значение';
      input.value = '';
   }
   switch (operation) {
      case 'xʸ':
         input.value = `${numberOne}^`;
         operationSymbol = '^';
         break;
      case 'x!':
         input.value = `${numberOne}!`;
         operationSymbol = '!';
         break;
      case '√':
         input.value = `√(${numberOne})`;
         operationSymbol = '√';
         break;
      case '±':
         if (numberOne > 0) {
            input.value = -(input.value);
         } else if (numberOne < 0) {
            input.value = input.value * -1;
         }
         break;
   }
}

equalityBtn.addEventListener('click', result);

function result() {
   input.focus();
   let position = input.value.indexOf(operationSymbol);
   let numberTwo = +input.value.substring(position + 1, input.value.length);
   switch (operationSymbol) {
      case '+':
         input.value = `${numberOne + numberTwo}`;
         if (btnProcent.hasAttribute('boolean')) {
            input.value = `${numberOne + (numberOne * numberTwo / 100)}`;
            btnProcent.removeAttribute('boolean');
         }
         break;
      case '-':
         
         input.value = `${numberOne - numberTwo}`;
         if (btnProcent.hasAttribute('boolean')) {
            input.value = `${numberOne - (numberOne * numberTwo / 100)}`;
            btnProcent.removeAttribute('boolean');
         }
         break;
      case '*':
         input.value = `${numberOne * numberTwo}`;
         if (btnProcent.hasAttribute('boolean')) {
            input.value = `${numberOne * numberTwo / 100}`;
            btnProcent.removeAttribute('boolean');
         }
         break;
      case '/':
         input.value = `${numberOne / numberTwo}`;
         if (btnProcent.hasAttribute('boolean')) {
            input.value = `${numberOne / (numberOne * numberTwo / 100)}`;
            btnProcent.removeAttribute('boolean');
         }
         break;
      case '^':
         input.value = `${Math.pow(numberOne, numberTwo)}`;
         break;
      case '!':
         let result = 1;
         for (let i = 1; i <= numberOne; i++) {
            result *= i;
         }
         input.value = result;
         break;
      case '√':
         let n = 1;
         let m;
         for (let i = 0; i < 10; i++) {
            m = (n + numberOne / n) / 2;
            n = m;
         }
         input.value = n;
         break;
   }


   if (input.value % 1 !== 0) {
      input.value = Number(input.value).toFixed(2);
   }

   showResult.textContent = `${numberOne} ${operationSymbol} ${numberTwo} = ${input.value}`;
   if (operationSymbol === '!') {
      showResult.textContent = `${numberOne} ${operationSymbol} = ${input.value}`;
   } else if (operationSymbol === '√') {
      showResult.textContent = `${operationSymbol}(${numberOne}) = ${input.value}`;
   } else if (operationSymbol === '*' && btnProcent.onclick) {
      showResult.textContent = `${numberOne} ${operationSymbol} ${numberTwo}% = ${input.value}`;
   }
   input.focus();

   if (input.value === 'Infinity') {
      outputResult.textContent = 'На ноль делить нельзя';
      input.value = '';
   }
}


clearBtn.addEventListener('click', () => {
   showResult.textContent = '';
   input.value = '';
   input.focus();
});

console.log('Hello world');
console.log('This course is cool');
console.log('I am great');