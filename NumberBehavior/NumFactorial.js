
// function calculateFactorial(n) {
//   let result = BigInt(1);
//   for (let i = BigInt(2); i <= n; i++) {
//     result *= i;
//   }
//   return result;
// }

// // Function to sum all digits in a number
// function calculateDigitSum(numStr) {
//   let sum = 0;
//   for (const digit of numStr) {
//     sum += parseInt(digit, 10);
//   }
//   return sum;
// }

// // Function to compute digital root (iterated digit sum)
// function calculateDigitalRoot(n) {
//   while (n >= 10) {
//     n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
//   }
//   return n;
// }

// // Function to perform factorial analysis
// function performFactorialAnalysis(num) {
//   // Convert to BigInt for calculation
//   const n = BigInt(num);
  
//   // Calculate factorial
//   const factorialValue = calculateFactorial(n);
  
//   // Convert to string for digit processing
//   const factorialStr = factorialValue.toString();
  
//   // Calculate sum of digits
//   const digitSum = calculateDigitSum(factorialStr);
  
//   // Calculate digital root
//   const digitalRoot = calculateDigitalRoot(digitSum);
  
//   // Output results
//   console.log(`${num}! = ${factorialStr}\n`);
//   console.log(`Sum of digits of ${num}! = ${digitSum}`);
//   console.log(`Iterated digit sum (digital root) of ${num}! = ${digitalRoot}`);
// }

// // Get user input - add these lines
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// readline.question('Enter a number to calculate its factorial properties: ', (number) => {
//   const num = parseInt(number, 10);
//   if (isNaN(num) || num < 0) {
//     console.log('Please enter a valid non-negative number.');
//   } else {
//     console.log(`Calculating properties for ${num}!...`);
//     performFactorialAnalysis(num);
//   }
//   readline.close();
// });