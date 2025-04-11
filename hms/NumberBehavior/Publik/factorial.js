// // Factorial calculation and analysis

// // Calculate factorial of a number
// function calculateFactorial(n) {
//   let result = BigInt(1);
//   for (let i = BigInt(2); i <= n; i++) {
//     result *= i;
//   }
//   return result;
// }

// // Sum all digits in a number
// function calculateDigitSum(numStr) {
//   let sum = 0;
//   for (const digit of numStr) {
//     sum += parseInt(digit, 10);
//   }
//   return sum;
// }

// // Compute digital root (iterated digit sum)
// function calculateDigitalRoot(n) {
//   while (n >= 10) {
//     n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
//   }
//   return n;
// }

// // Perform factorial analysis
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
  
//   // Return results as HTML
//   return `
//     <h4>Results for ${num}!</h4>
//     <pre>Factorial: ${factorialStr}</pre>
//     <pre>Sum of digits: ${digitSum}</pre>
//     <pre>Digital root: ${digitalRoot}</pre>
//   `;
// }

// // Function to add visualization for factorial results
// function addFactorialVisualization(num, digitalRoot) {
//   // Create visualization container if it doesn't exist
//   if (!document.getElementById('factorial-visualization')) {
//     const vizContainer = document.createElement('div');
//     vizContainer.id = 'factorial-visualization';
//     vizContainer.className = 'visualization-section';
//     vizContainer.innerHTML = `
//       <h4>Digital Root Visualization</h4>
//       <div class="digital-root-display"></div>
//     `;
//     document.getElementById('factorial-results').appendChild(vizContainer);
//   }
  
//   // Generate visualization for the digital root
//   const rootDisplay = document.querySelector('.digital-root-display');
//   rootDisplay.innerHTML = '';
  
//   // Create a circular representation of the digital root
//   const circle = document.createElement('div');
//   circle.className = 'digital-root-circle';
//   circle.innerHTML = `<span>${digitalRoot}</span>`;
//   circle.style.backgroundColor = `hsl(${digitalRoot * 40}, 70%, 60%)`;
//   rootDisplay.appendChild(circle);
  
//   // Add some descriptive text
//   const description = document.createElement('p');
//   description.textContent = `Digital root ${digitalRoot} represents the cyclical nature of the number ${num}!`;
//   rootDisplay.appendChild(description);
  
//   // Add CSS for visualization
//   const style = document.createElement('style');
//   style.textContent = `
//     .visualization-section {
//       margin-top: 30px;
//       padding: 15px;
//       border: 1px solid var(--border-color, #ddd);
//       border-radius: 5px;
//       background-color: var(--sidebar-bg, #f9f9ff);
//     }
    
//     .digital-root-display {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       margin: 20px 0;
//     }
    
//     .digital-root-circle {
//       width: 100px;
//       height: 100px;
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin-bottom: 20px;
//       box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//       animation: pulse 2s infinite;
//     }
    
//     .digital-root-circle span {
//       font-size: 36px;
//       font-weight: bold;
//       color: white;
//     }
    
//     @keyframes pulse {
//       0% { transform: scale(1); }
//       50% { transform: scale(1.05); }
//       100% { transform: scale(1); }
//     }
//   `;
//   document.head.appendChild(style);
// }

// // Set up event listeners when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//   const calculateBtn = document.getElementById('calculate-btn');
//   const factorialInput = document.getElementById('factorial-input');
//   const factorialResults = document.getElementById('factorial-results');

//   calculateBtn.addEventListener('click', () => {
//     const num = parseInt(factorialInput.value, 10);
//     if (isNaN(num) || num < 0 || num > 1000) {
//       factorialResults.innerHTML = '<p class="error">Please enter a valid number between 0 and 1000.</p>';
//       return;
//     }

//     factorialResults.innerHTML = '<p>Calculating...</p>';
    
//     // Use setTimeout to prevent UI freezing for large calculations
//     setTimeout(() => {
//       try {
//         const result = performFactorialAnalysis(num);
//         factorialResults.innerHTML = result;
        
//         // Calculate digital root for visualization
//         const n = BigInt(num);
//         const factorialValue = calculateFactorial(n);
//         const factorialStr = factorialValue.toString();
//         const digitSum = calculateDigitSum(factorialStr);
//         const digitalRoot = calculateDigitalRoot(digitSum);
        
//         // Add visualization for the results
//         addFactorialVisualization(num, digitalRoot);
        
//       } catch (error) {
//         factorialResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
//       }
//     }, 10);
//   });
// });





// Factorial calculation and analysis

// Calculate factorial of a number


function calculateFactorialindependent(n) {
  let result = BigInt(1);
  for (let i = BigInt(2); i <= n; i++) {
    result *= i;
  }
  return result;
}

// Sum all digits in a number
function calculateDigitSumindependent(numStr) {
  let sum = 0;
  for (const digit of numStr) {
    sum += parseInt(digit, 10);
  }
  return sum;
}

// Compute digital root (iterated digit sum)
function calculateDigitalRootindependent(n) {
  while (n >= 10) {
    n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return n;
}

// Perform factorial analysis
function performFactorialAnalysisindependent(num) {
  // Convert to BigInt for calculation
  const n = BigInt(num);
  
  // Calculate factorial
  const factorialValue = calculateFactorialindependent(n);
  
  // Convert to string for digit processing
  const factorialStr = factorialValue.toString();
  
  // Calculate sum of digits
  const digitSum = calculateDigitSumindependent(factorialStr);
  
  // Calculate digital root
  const digitalRoot = calculateDigitalRootindependent(digitSum);
  
  // Return results as HTML
  return `
    <h4>Results for ${num}!</h4>
    <pre>Factorial: ${factorialStr}</pre>
    <pre>Sum of digits: ${digitSum}</pre>
    <pre>Digital root: ${digitalRoot}</pre>
  `;
}

// Function to add visualization for factorial results
function addFactorialVisualizationtoindependent(num, digitalRoot) {
  // Create visualization container if it doesn't exist
  if (!document.getElementById('factorial-visualization')) {
    const vizContainer = document.createElement('div');
    vizContainer.id = 'factorial-visualization';
    vizContainer.className = 'visualization-section';
    vizContainer.innerHTML = `
      <h4>Digital Root Visualization</h4>
      <div class="digital-root-display"></div>
    `;
    document.getElementById('factorial-results').appendChild(vizContainer);
  }
  
  // Generate visualization for the digital root
  const rootDisplay = document.querySelector('.digital-root-display');
  rootDisplay.innerHTML = '';
  
  // Create a circular representation of the digital root
  const circle = document.createElement('div');
  circle.className = 'digital-root-circle';
  circle.innerHTML = `<span>${digitalRoot}</span>`;
  circle.style.backgroundColor = `hsl(${digitalRoot * 40}, 70%, 60%)`;
  rootDisplay.appendChild(circle);
  
  // Add some descriptive text
  const description = document.createElement('p');
  description.textContent = `Digital root ${digitalRoot} represents the cyclical nature of the number ${num}!`;
  rootDisplay.appendChild(description);
  
  // Add CSS for visualization
  const style = document.createElement('style');
  style.textContent = `
    .visualization-section {
      margin-top: 30px;
      padding: 15px;
      border: 1px solid var(--border-color, #ddd);
      border-radius: 5px;
      background-color: var(--sidebar-bg, #f9f9ff);
    }
    
    .digital-root-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;
    }
    
    .digital-root-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      animation: pulse 2s infinite;
    }
    
    .digital-root-circle span {
      font-size: 36px;
      font-weight: bold;
      color: white;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
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
    
    // Use setTimeout to prevent UI freezing for large calculations
    setTimeout(() => {
      try {
        const result = performFactorialAnalysisindependent(num);
        factorialResults.innerHTML = result;
        
        // Calculate digital root for visualization
        const n = BigInt(num);
        const factorialValue = calculateFactorialindependent(n);
        const factorialStr = factorialValue.toString();
        const digitSum = calculateDigitSumindependent(factorialStr);
        const digitalRoot = calculateDigitalRootindependent(digitSum);
        
        // Add visualization for the results
        addFactorialVisualizationtoindependent(num, digitalRoot);
        
      } catch (error) {
        factorialResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    }, 10);
  });
});

