// Factorial calculation and analysis

// Calculate factorial of a number
function calculateFactorial(n) {
  let result = BigInt(1);
  for (let i = BigInt(2); i <= n; i++) {
    result *= i;
  }
  return result;
}

// Sum all digits in a number
function calculateDigitSum(numStr) {
  let sum = 0;
  for (const digit of numStr) {
    sum += parseInt(digit, 10);
  }
  return sum;
}

// Compute digital root (iterated digit sum)
function calculateDigitalRoot(n) {
  while (n >= 10) {
    n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return n;
}

// Perform factorial analysis
function performFactorialAnalysis(num) {
  // Convert to BigInt for calculation
  const n = BigInt(num);
  
  // Calculate factorial
  const factorialValue = calculateFactorial(n);
  
  // Convert to string for digit processing
  const factorialStr = factorialValue.toString();
  
  // Calculate sum of digits
  const digitSum = calculateDigitSum(factorialStr);
  
  // Calculate digital root
  const digitalRoot = calculateDigitalRoot(digitSum);
  
  // Return results as HTML
  return `
    <h3>Results for ${num}!</h3>
    <pre>Factorial: ${factorialStr}</pre>
    <pre>Sum of digits: ${digitSum}</pre>
    <pre>Digital root: ${digitalRoot}</pre>
  `;
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculate-btn');
  const factorialInput = document.getElementById('factorial-input');
  const factorialResults = document.getElementById('factorial-results');

  calculateBtn.addEventListener('click', () => {
    const num = parseInt(factorialInput.value, 10);
    if (isNaN(num) || num < 0 || num > 1000) {
      factorialResults.innerHTML = '<p class="error">Please enter a valid number between 0 and 1000.</p>';
      return;
    }

    factorialResults.innerHTML = '<p>Calculating...</p>';


    chromaticResults.innerHTML = performChromaticAnalysis();
  
  // Initialize visualization (call after the HTML is inserted)
  addVisualization();
  
  // Show the comparison results area when clicking the button
  document.getElementById('compare-numbers').addEventListener('click', function() {
    document.querySelector('.comparison-results').style.display = 'block';
  });
  
    
    // Use setTimeout to prevent UI freezing for large calculations
    setTimeout(() => {
      try {
        const result = performFactorialAnalysis(num);
        factorialResults.innerHTML = result;
      } catch (error) {
        factorialResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    }, 10);
  });
});