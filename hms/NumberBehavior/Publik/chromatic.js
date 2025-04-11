// function digitalRoot(n) {
//   if (n === 0) return 0;
  
//   // Show the process
//   let steps = [n];
//   let current = n;
  
//   while (current > 9) {
//     current = current.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
//     steps.push(current);
//   }
  
//   return { result: ((n - 1) % 9) + 1, steps };
// }

// // Factorial calculation for larger numbers
// function factorial(n) {
//   if (n === 0 || n === 1) return BigInt(1);
//   let result = BigInt(1);
  
//   // Store intermediate steps for display
//   const steps = [];
  
//   for (let i = 2; i <= n; i++) {
//     result *= BigInt(i);
//     if (i <= 5 || i === n) { // Show first few steps and final result
//       steps.push(`${i}! = ${result}`);
//     } else if (i === 6) {
//       steps.push("...");
//     }
//   }
  
//   return { result, steps };
// }

// // Sum digits of a very large number
// function digitSum(n) {
//   const digits = n.toString().split('');
//   const sum = digits.reduce((sum, d) => sum + parseInt(d), 0);
  
//   // For extremely large numbers, show only length and first/last few digits
//   const digitDisplay = digits.length > 20 ? 
//     `${digits.slice(0, 5).join('')}...${digits.slice(-5).join('')} (${digits.length} digits)` : 
//     digits.join('');
  
//   return { sum, digitDisplay };
// }

// // Function to perform scale analysis and return HTML
// function analyzeScale(scale, chromaticRoots) {
//   const scaled = chromaticRoots.map(n => n * scale);
//   const sum = scaled.reduce((a, b) => a + b, 0);
//   const dr = digitalRoot(sum);
  
//   return `
//     <div class="scale">
//       <h4>Scale ${scale}×</h4>
//       <div class="scaled-numbers">
//         ${scaled.map((n, i) => `<div class="calculation">${scale} × ${chromaticRoots[i]} = ${n}</div>`).join('')}
//       </div>
//       <p>Sum: ${scaled.join(' + ')} = ${sum}</p>
//       <p>Digital Root: ${dr.steps.join(' → ')} = ${dr.result}</p>
//     </div>
//   `;
// }

// // Function to find prime factors
// function primeFactors(n) {
//   const factors = [];
//   let divisor = 2;
  
//   while (n > 1) {
//     while (n % divisor === 0) {
//       factors.push(divisor);
//       n /= divisor;
//     }
//     divisor++;
    
//     // Optimization for large prime numbers
//     if (divisor * divisor > n && n > 1) {
//       factors.push(n);
//       break;
//     }
//   }
  
//   return factors;
// }

// // Pattern Analysis
// function analyzePatternCycles() {
//   const resultHTML = [];
  
//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 7: Digital Root Pattern Detection</h3>
//       <p>We analyze how digital roots cycle over larger scale factors.</p>
      
//       <div class="cycle-analysis">
//   `);
  
//   // Generate data for a larger range (e.g., scales 1-100)
//   const scaleRange = 100;
//   const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const digitalRootValues = [];
  
//   for (let scale = 1; scale <= scaleRange; scale++) {
//     const scaled = chromaticRoots.map(n => n * scale);
//     const sum = scaled.reduce((a, b) => a + b, 0);
//     const dr = digitalRoot(sum).result;
//     digitalRootValues.push(dr);
//   }
  
//   // Find the cycle length
//   let cycleLength = 0;
//   for (let len = 1; len <= digitalRootValues.length / 2; len++) {
//     let isCycle = true;
//     for (let i = 0; i < len; i++) {
//       if (digitalRootValues[i] !== digitalRootValues[i + len]) {
//         isCycle = false;
//         break;
//       }
//     }
//     if (isCycle) {
//       cycleLength = len;
//       break;
//     }
//   }
  
//   resultHTML.push(`
//         <h4>Digital Root Cycle Analysis</h4>
//         <p>After analyzing the first ${scaleRange} scale factors, we found that the digital roots repeat in a cycle of length ${cycleLength}.</p>
//         <div class="cycle-pattern">
//           <p>Pattern: ${digitalRootValues.slice(0, cycleLength).join(' → ')} → (repeats)</p>
//         </div>
        
//         <table class="pattern-table">
//           <tr>
//             <th>Scale</th>
//             <th>Digital Root</th>
//             <th>Position in Cycle</th>
//           </tr>
//   `);
  
//   for (let i = 0; i < 20; i++) {
//     resultHTML.push(`
//           <tr>
//             <td>${i + 1}</td>
//             <td>${digitalRootValues[i]}</td>
//             <td>${(i % cycleLength) + 1} of ${cycleLength}</td>
//           </tr>
//     `);
//   }
  
//   resultHTML.push(`
//         </table>
//       </div>
//     </div>
//   `);
  
//   return resultHTML.join('');
// }

// // Add interactive comparison tool between different numbers
// function addComparisonTool() {
//   return `
//     <div class="analysis-step">
//       <h3>Step 8: Number Comparison Tool</h3>
//       <p>Compare the properties of any two numbers.</p>
      
//       <div class="comparison-tool">
//         <div class="input-group">
//           <label for="number1">First Number:</label>
//           <input type="number" id="number1" min="1" value="45" class="comparison-input">
//         </div>
        
//         <div class="input-group">
//           <label for="number2">Second Number:</label>
//           <input type="number" id="number2" min="1" value="54" class="comparison-input">
//         </div>
        
//         <button id="compare-numbers" class="comparison-button">Compare</button>
        
//         <div id="comparison-results" class="comparison-results">
//           <!-- Results will be shown here -->
//         </div>
//       </div>
//     </div>
//   `;
// }

// function addPrimeFactorAnalysis() {
//   return `
//     <div class="analysis-step">
//       <h3>Step 9: Prime Factor Analysis</h3>
//       <p>This section analyzes the prime factors of our important sums.</p>
      
//       <div class="prime-factors">
//         <h4>Prime Factorization of Key Numbers</h4>
//         <table class="factors-table">
//           <tr>
//             <th>Number</th>
//             <th>Prime Factors</th>
//             <th>Factor Visualization</th>
//           </tr>
//           ${[45, 18, 27].map(num => {
//             const factors = primeFactors(num);
//             return `
//               <tr>
//                 <td>${num}</td>
//                 <td>${factors.join(' × ')}</td>
//                 <td>
//                   <div class="factor-bars">
//                     ${factors.map(factor => 
//                       `<span class="factor-unit factor-${factor}" 
//                              title="Factor: ${factor}"
//                              style="width: ${factor * 5}px; background-color: hsl(${(factor * 30) % 360}, 70%, 60%);">
//                          ${factor}
//                        </span>`
//                     ).join('')}
//                   </div>
//                 </td>
//               </tr>
//             `;
//           }).join('')}
//         </table>
//       </div>
//     </div>
//   `;
// }

// // Remove the addExtraStyles function since we're moving styles to a separate CSS file
// function performChromaticAnalysis(customScale = null) {
//   const resultHTML = [];
  
//   resultHTML.push(`<div class="intro">
//     <h2>Chromatic Number Analysis</h2>
//     <p>This analysis explores number patterns based on digital roots and the relationships between parent and child nodes.</p>
//   </div>`);

//   // Step 1: Chromatic Roots
//   const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 1: Chromatic Roots</h3>
//       <p>Chromatic roots are defined as numbers from 1 to 9. These form the foundation of our analysis.</p>
//       <div class="number-display">
//         ${chromaticRoots.map(n => `<span class="number">${n}</span>`).join('')}
//       </div>
//     </div>
//   `);

//   // Step 2: Parent Nodes (multiples of 3)
//   const parentNodes = chromaticRoots.filter(n => n % 3 === 0);
//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 2: Parent Nodes</h3>
//       <p>Parent nodes are identified as multiples of 3 among the chromatic roots.</p>
//       <div class="number-display">
//         ${chromaticRoots.map(n => `
//           <span class="number ${parentNodes.includes(n) ? 'parent' : ''}">${n}
//             ${parentNodes.includes(n) ? '<span class="indicator">Parent</span>' : ''}
//           </span>
//         `).join('')}
//       </div>
//       <p>Parent nodes: [${parentNodes.join(', ')}]</p>
//     </div>
//   `);

//   // Step 3: Child Nodes — 2-step subtraction from each parent node
//   const childMap = {};
//   const childNodes = [];

//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 3: Child Nodes</h3>
//       <p>Each parent node generates child nodes by subtracting 1 and 2 (representing right-to-left steps).</p>
//   `);

//   parentNodes.forEach(p => {
//     const children = [p - 1, p - 2].filter(n => n > 0);
//     childMap[p] = children;
//     children.forEach(c => {
//       if (!childNodes.includes(c)) childNodes.push(c);
//     });
    
//     resultHTML.push(`
//       <div class="parent-child-relation">
//         <span class="parent-node">${p}</span> 
//         <span class="arrow">→</span>
//         <span class="child-nodes">${children.join(', ')}</span>
//         <span class="explanation">(${p} - 1 = ${p-1}, ${p} - 2 = ${p-2})</span>
//       </div>
//     `);
//   });

//   resultHTML.push(`
//       <p>Final unique Child Nodes: [${childNodes.sort((a,b)=>a-b).join(', ')}]</p>
//     </div>
//   `);

//   // Step 4: Sums and Digital Roots
//   const sumCR = chromaticRoots.reduce((a, b) => a + b, 0);
//   const sumPN = parentNodes.reduce((a, b) => a + b, 0);
//   const sumCN = childNodes.reduce((a, b) => a + b, 0);

//   const drCR = digitalRoot(sumCR);
//   const drPN = digitalRoot(sumPN);
//   const drCN = digitalRoot(sumCN);

//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 4: Sums and Digital Roots</h3>
      
//       <div class="calculation">
//         <p>Sum of Chromatic Roots: ${chromaticRoots.join(' + ')} = ${sumCR}</p>
//         <p>Digital Root calculation: ${drCR.steps.join(' → ')} = ${drCR.result}</p>
//       </div>
      
//       <div class="calculation">
//         <p>Sum of Parent Nodes: ${parentNodes.join(' + ')} = ${sumPN}</p>
//         <p>Digital Root calculation: ${drPN.steps.join(' → ')} = ${drPN.result}</p>
//       </div>
      
//       <div class="calculation">
//         <p>Sum of Child Nodes: ${childNodes.join(' + ')} = ${sumCN}</p>
//         <p>Digital Root calculation: ${drCN.steps.join(' → ')} = ${drCN.result}</p>
//       </div>
//     </div>
//   `);

//   // Step 5: Factorials and digit sums
//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 5: Factorials and Digit Sums</h3>
//       <p>We now calculate the factorials of our sums and analyze their digital properties.</p>
//   `);

//   // Calculate factorials
//   const factCR = factorial(sumCR);
//   const factPN = factorial(sumPN);
//   const factCN = factorial(sumCN);
  
//   // Calculate digit sums
//   const dsCR = digitSum(factCR.result);
//   const dsPN = digitSum(factPN.result);
//   const dsCN = digitSum(factCN.result);
  
//   // Calculate digital roots of digit sums
//   const drDSCR = digitalRoot(dsCR.sum);
//   const drDSPN = digitalRoot(dsPN.sum);
//   const drDSCN = digitalRoot(dsCN.sum);

//   resultHTML.push(`
//       <div class="factorial-analysis">
//         <h4>${sumCR}! (Sum of Chromatic Roots)</h4>
//         <div class="process">
//           <p class="steps">${factCR.steps.join('<br>')}</p>
//           <p>Final value: ${dsCR.digitDisplay}</p>
//           <p>Digit Sum: ${dsCR.sum}</p>
//           <p>Digital Root: ${drDSCR.steps.join(' → ')} = ${drDSCR.result}</p>
//         </div>
//       </div>
      
//       <div class="factorial-analysis">
//         <h4>${sumPN}! (Sum of Parent Nodes)</h4>
//         <div class="process">
//           <p class="steps">${factPN.steps.join('<br>')}</p>
//           <p>Final value: ${dsPN.digitDisplay}</p>
//           <p>Digit Sum: ${dsPN.sum}</p>
//           <p>Digital Root: ${drDSPN.steps.join(' → ')} = ${drDSPN.result}</p>
//         </div>
//       </div>
      
//       <div class="factorial-analysis">
//         <h4>${sumCN}! (Sum of Child Nodes)</h4>
//         <div class="process">
//           <p class="steps">${factCN.steps.join('<br>')}</p>
//           <p>Final value: ${dsCN.digitDisplay}</p>
//           <p>Digit Sum: ${dsCN.sum}</p>
//           <p>Digital Root: ${drDSCN.steps.join(' → ')} = ${drDSCN.result}</p>
//         </div>
//       </div>
//     </div>
//   `);

//   // Step 6: Scales (chromatic roots × scale factors)
//   resultHTML.push(`
//     <div class="analysis-step">
//       <h3>Step 6: Scaling Chromatic Roots</h3>
//       <p>We multiply each chromatic root by scale factors to observe patterns.</p>
      
//       <div class="scale-input-container">
//         <h4>Explore Custom Scales</h4>
//         <p>Enter a scale factor to see how it affects the chromatic roots:</p>
//         <input type="number" id="scale-input" min="1" placeholder="Enter scale (e.g., 10, 11, 12...)" class="scale-input">
//         <button id="calculate-scale" class="scale-button">Calculate</button>
//       </div>
      
//       <div id="custom-scale-results"></div>
      
//       <h4>Default Scales (1-9)</h4>
//       <div class="scale-container">
//   `);
  
//   // Generate default scales 1-9
//   for (let scale = 1; scale <= 9; scale++) {
//     resultHTML.push(analyzeScale(scale, chromaticRoots));
  
//   }
  
//   resultHTML.push(`
//       </div>
//     </div>
//   `);

//   // Add the new sections
//   resultHTML.push(analyzePatternCycles());
//   resultHTML.push(addComparisonTool());
//   resultHTML.push(addPrimeFactorAnalysis());
  
//   // Add a conclusion section
//   resultHTML.push(`
//     <div class="conclusion">
//       <h3>Conclusion</h3>
//       <p>The analysis reveals numerical patterns across different scales and operations. 
//          Notice how digital roots cycle in predictable patterns, revealing the underlying mathematical structure.</p>
//     </div>
//   `);
  
//   return resultHTML.join('');
// }

// // Initialize the chromatic analysis when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//   const chromaticResults = document.getElementById('chromatic-results');
  
//   // Load Chart.js if needed for visualizations
//   function loadChartJS() {
//     return new Promise((resolve, reject) => {
//       if (window.Chart) {
//         resolve();
//         return;
//       }
      
//       const script = document.createElement('script');
//       script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
//       script.onload = resolve;
//       script.onerror = () => reject(new Error('Failed to load Chart.js'));
//       document.head.appendChild(script);
//     });
//   }
  
//   // Display a loading message
//   chromaticResults.innerHTML = '<p>Loading chromatic analysis...</p>';
  
//   // Use setTimeout to prevent UI freezing for calculations
//   setTimeout(() => {
//     try {
//       chromaticResults.innerHTML = performChromaticAnalysis();
      
//       // Add event listener for custom scale calculation
//       document.getElementById('calculate-scale').addEventListener('click', () => {
//         const scaleInput = document.getElementById('scale-input');
//         const scale = parseInt(scaleInput.value, 10);
        
//         if (isNaN(scale) || scale < 1) {
//           alert('Please enter a valid positive number for the scale.');
//           return;
//         }
        
//         const customScaleResults = document.getElementById('custom-scale-results');
//         const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
//         // Create container for the new scale
//         const scaleContainer = document.createElement('div');
//         scaleContainer.className = 'custom-scale';
//         scaleContainer.innerHTML = `
//           <h3>Custom Scale ${scale}×</h3>
//           ${analyzeScale(scale, chromaticRoots)}
//         `;
        
//         // Add to the beginning of results
//         if (customScaleResults.firstChild) {
//           customScaleResults.insertBefore(scaleContainer, customScaleResults.firstChild);
//         } else {
//           customScaleResults.appendChild(scaleContainer);
//         }
        
//         // Clear input
//         scaleInput.value = '';
        
//         // Scroll to the new result
//         scaleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       });
      
//       // Add keyboard event listener for Enter key
//       document.getElementById('scale-input').addEventListener('keypress', (event) => {
//         if (event.key === 'Enter') {
//           document.getElementById('calculate-scale').click();
//         }
//       });
      
//       // Add event listener for comparison tool
//       document.getElementById('compare-numbers').addEventListener('click', function() {
//         const num1 = parseInt(document.getElementById('number1').value);
//         const num2 = parseInt(document.getElementById('number2').value);
        
//         if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1) {
//           alert('Please enter valid positive numbers.');
//           return;
//         }
        
//         const dr1 = digitalRoot(num1);
//         const dr2 = digitalRoot(num2);
//         const factorialSum = num1 + num2;
//         const factAnalysis = factorial(factorialSum);
//         const factDigitSum = digitSum(factAnalysis.result);
        
//         const resultsHTML = `
//           <h4>Comparison Results</h4>
//           <table class="comparison-table">
//             <tr>
//               <th>Property</th>
//               <th>${num1}</th>
//               <th>${num2}</th>
//             </tr>
//             <tr>
//               <td>Digital Root</td>
//               <td>${dr1.result}</td>
//               <td>${dr2.result}</td>
//             </tr>
//             <tr>
//               <td>Digital Root Process</td>
//               <td>${dr1.steps.join(' → ')}</td>
//               <td>${dr2.steps.join(' → ')}</td>
//             </tr>
//             <tr>
//               <td>Sum</td>
//               <td colspan="2" class="center">${num1} + ${num2} = ${factorialSum}</td>
//             </tr>
//             <tr>
//               <td>Factorial of Sum</td>
//               <td colspan="2" class="center">${factorialSum}! = ${factAnalysis.steps[factAnalysis.steps.length-1]}</td>
//             </tr>
//             <tr>
//               <td>Digit Sum of Factorial</td>
//               <td colspan="2" class="center">${factDigitSum.sum}</td>
//             </tr>
//           </table>
//         `;
        
//         const comparisonResults = document.getElementById('comparison-results');
//         comparisonResults.innerHTML = resultsHTML;
//         comparisonResults.style.display = 'block';
//       });
      
//       // Try to load Chart.js and initialize visualization if successful
//       loadChartJS().then(() => {
//         // Only try to add visualization if Chart.js loaded successfully
//         try {
//           // Add a visualization section after the conclusion
//           const visualSection = document.createElement('div');
//           visualSection.className = 'visualization-section';
//           visualSection.innerHTML = `
//             <h3>Pattern Visualization</h3>
//             <p>This graph shows the digital roots across different scales:</p>
//             <div class="chart-container">
//               <canvas id="digitalRootChart"></canvas>
//             </div>
//           `;
          
//           const conclusion = document.querySelector('.conclusion');
//           if (conclusion) {
//             conclusion.after(visualSection);
            
//             // Create data for the chart
//             const scales = Array.from({length: 20}, (_, i) => i + 1);
//             const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//             const digitalRootData = scales.map(scale => {
//               const scaled = chromaticRoots.map(n => n * scale);
//               const sum = scaled.reduce((a, b) => a + b, 0);
//               return digitalRoot(sum).result;
//             });
            
//             // Create the chart
//             const ctx = document.getElementById('digitalRootChart').getContext('2d');
//             new Chart(ctx, {
//               type: 'line',
//               data: {
//                 labels: scales,
//                 datasets: [{
//                   label: 'Digital Root',
//                   data: digitalRootData,
//                   borderColor: '#4285f4',
//                   backgroundColor: 'rgba(66, 133, 244, 0.1)',
//                   tension: 0.1
//                 }]
//               },
//               options: {
//                 responsive: true,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     max: 9
//                   }
//                 },
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: 'Digital Root Pattern by Scale Factor'
//                   }
//                 }
//               }
//             });
//           }
//         } catch (error) {
//           console.error('Error creating visualization:', error);
//         }
//       }).catch(error => {
//         console.warn('Chart.js could not be loaded:', error);
//       });
      
//       // Add a scroll event to animate elements as they come into view
//       const animateOnScroll = () => {
//         const elements = document.querySelectorAll('.analysis-step, .custom-scale');
//         elements.forEach(element => {
//           const position = element.getBoundingClientRect();
//           // If element is in viewport
//           if(position.top >= 0 && position.bottom <= window.innerHeight) {
//             element.style.animation = 'fadeIn 1s forwards';
//           }
//         });
//       };
      
//       window.addEventListener('scroll', animateOnScroll);
//       // Trigger once on load
//       animateOnScroll();
      
//     } catch (error) {
//       chromaticResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
//     }
//   }, 10);
// });






function digitalRoot(n) {
    if (n === 0) return 0;
    
    // Show the process
    let steps = [n];
    let current = n;
    
    while (current > 9) {
      current = current.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
      steps.push(current);
    }
    
    return { result: ((n - 1) % 9) + 1, steps };
  }
  
  // Factorial calculation for larger numbers
  function factorial(n) {
    if (n === 0 || n === 1) return BigInt(1);
    let result = BigInt(1);
    
    // Store intermediate steps for display
    const steps = [];
    
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
      if (i <= 5 || i === n) { // Show first few steps and final result
        steps.push(`${i}! = ${result}`);
      } else if (i === 6) {
        steps.push("...");
      }
    }
    
    return { result, steps };
  }
  
  // Sum digits of a very large number
  function digitSum(n) {
    const digits = n.toString().split('');
    const sum = digits.reduce((sum, d) => sum + parseInt(d), 0);
    
    // For extremely large numbers, show only length and first/last few digits
    const digitDisplay = digits.length > 20 ? 
      `${digits.slice(0, 5).join('')}...${digits.slice(-5).join('')} (${digits.length} digits)` : 
      digits.join('');
    
    return { sum, digitDisplay };
  }
  
  // Function to perform scale analysis and return HTML
  function analyzeScale(scale, chromaticRoots) {
    const scaled = chromaticRoots.map(n => n * scale);
    const sum = scaled.reduce((a, b) => a + b, 0);
    const dr = digitalRoot(sum);
    
    return `
      <div class="scale">
        <h4>Scale ${scale}×</h4>
        <div class="scaled-numbers">
          ${scaled.map((n, i) => `<div class="calculation">${scale} × ${chromaticRoots[i]} = ${n}</div>`).join('')}
        </div>
        <p>Sum: ${scaled.join(' + ')} = ${sum}</p>
        <p>Digital Root: ${dr.steps.join(' → ')} = ${dr.result}</p>
      </div>
    `;
  }
  
  // Function to find prime factors
  function primeFactors(n) {
    const factors = [];
    let divisor = 2;
    
    while (n > 1) {
      while (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      }
      divisor++;
      
      // Optimization for large prime numbers
      if (divisor * divisor > n && n > 1) {
        factors.push(n);
        break;
      }
    }
    
    return factors;
  }
  
  // Pattern Analysis
  function analyzePatternCycles() {
    const resultHTML = [];
    
    resultHTML.push(`
      <div class="analysis-step">
        <h3>Digital Root Pattern Detection</h3>
        <p>I analyze how digital roots cycle over larger scale factors.</p>
        
        <div class="cycle-analysis">
    `);
    
    // Generate data for a larger range (e.g., scales 1-100)
    const scaleRange = 100;
    const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const digitalRootValues = [];
    
    for (let scale = 1; scale <= scaleRange; scale++) {
      const scaled = chromaticRoots.map(n => n * scale);
      const sum = scaled.reduce((a, b) => a + b, 0);
      const dr = digitalRoot(sum).result;
      digitalRootValues.push(dr);
    }
    
    // Find the cycle length
    let cycleLength = 0;
    for (let len = 1; len <= digitalRootValues.length / 2; len++) {
      let isCycle = true;
      for (let i = 0; i < len; i++) {
        if (digitalRootValues[i] !== digitalRootValues[i + len]) {
          isCycle = false;
          break;
        }
      }
      if (isCycle) {
        cycleLength = len;
        break;
      }
    }
    
    resultHTML.push(`
          <h4>Digital Root Cycle Analysis</h4>
          <p>After analyzing the first ${scaleRange} scale factors, I found that the digital roots repeat in a cycle of length ${cycleLength}.</p>
          <div class="cycle-pattern">
            <p>Pattern: ${digitalRootValues.slice(0, cycleLength).join(' → ')} → (repeats)</p>
          </div>
          
          <table class="pattern-table">
            <tr>
              <th>Scale</th>
              <th>Digital Root</th>
              <th>Position in Cycle</th>
            </tr>
    `);
    
    for (let i = 0; i < 20; i++) {
      resultHTML.push(`
            <tr>
              <td>${i + 1}</td>
              <td>${digitalRootValues[i]}</td>
              <td>${(i % cycleLength) + 1} of ${cycleLength}</td>
            </tr>
      `);
    }
    
    resultHTML.push(`
          </table>
        </div>
      </div>
    `);
    
    return resultHTML.join('');
  }
  
  // Add interactive comparison tool between different numbers
  function addComparisonTool() {
    return `
      <div class="analysis-step">
        <h4>Number Comparison Tool</h4>
        <p>Compare the properties of any two numbers.</p>
        
        <div class="comparison-tool">
          <div class="input-group">
            <label for="number1">First Number:</label>
            <input type="number" id="number1" min="1" value="45" class="comparison-input">
          </div>
          
          <div class="input-group">
            <label for="number2">Second Number:</label>
            <input type="number" id="number2" min="1" value="54" class="comparison-input">
          </div>
          
          <button id="compare-numbers" class="comparison-button">Compare</button>
          
          <div id="comparison-results" class="comparison-results">
            <!-- Results will be shown here -->
          </div>
        </div>
      </div>
    `;
  }
  
  function addPrimeFactorAnalysis() {
    return `
      <div class="analysis-step">
        <h4>Prime Factor Analysis</h4>
        <p>This section analyzes the prime factors of our important sums.</p>
        
        <div class="prime-factors">
          <h4>Prime Factorization of Key Numbers</h4>
          <table class="factors-table">
            <tr>
              <th>Number</th>
              <th>Prime Factors</th>
              <th>Factor Visualization</th>
            </tr>
            ${[45, 18, 27].map(num => {
              const factors = primeFactors(num);
              return `
                <tr>
                  <td>${num}</td>
                  <td>${factors.join(' × ')}</td>
                  <td>
                    <div class="factor-bars">
                      ${factors.map(factor => 
                        `<span class="factor-unit factor-${factor}" 
                               title="Factor: ${factor}"
                               style="width: ${factor * 5}px; background-color: hsl(${(factor * 30) % 360}, 70%, 60%);">
                           ${factor}
                         </span>`
                      ).join('')}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </table>
        </div>
      </div>
    `;
  }
  
  // Remove the addExtraStyles function since we're moving styles to a separate CSS file
  function performChromaticAnalysis(customScale = null) {
    const resultHTML = [];
    
    resultHTML.push(`<div class="intro">
      <h4>Chromatic Number Analysis</h4>
      <p>This analysis explores number patterns based on digital roots and the relationships between parent and child nodes.</p>
    </div>`);
  
    // Step 1: Chromatic Roots
    const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    resultHTML.push(`
      <div class="analysis-step">
        <h4>Chromatic Roots</h4>
        <p>Chromatic roots are defined as numbers from 1 to 9. These form the foundation of my analysis.</p>
        <div class="number-display">
          ${chromaticRoots.map(n => `<span class="number">${n}</span>`).join('')}
        </div>
      </div>
    `);
  
    // Step 2: Parent Nodes (multiples of 3)
    const parentNodes = chromaticRoots.filter(n => n % 3 === 0);
    resultHTML.push(`
      <div class="analysis-step">
        <h4> Parent Nodes</h4>
        <p>Parent nodes are identified as multiples of 3 among the chromatic roots.</p>
        <div class="number-display">
          ${chromaticRoots.map(n => `
            <span class="number ${parentNodes.includes(n) ? 'parent' : ''}">${n}
              ${parentNodes.includes(n) ? '<span class="indicator">Parent</span>' : ''}
            </span>
          `).join('')}
        </div>
        <p>Parent nodes: [${parentNodes.join(', ')}]</p>
      </div>
    `);
  
    // Step 3: Child Nodes — 2-step subtraction from each parent node
    const childMap = {};
    const childNodes = [];
  
    resultHTML.push(`
      <div class="analysis-step">
        <h4>Child Nodes</h4>
        <p>Each parent node generates child nodes by subtracting 1 and 2 (representing right-to-left steps).</p>
    `);
  
    parentNodes.forEach(p => {
      const children = [p - 1, p - 2].filter(n => n > 0);
      childMap[p] = children;
      children.forEach(c => {
        if (!childNodes.includes(c)) childNodes.push(c);
      });
      
      resultHTML.push(`
        <div class="parent-child-relation">
          <span class="parent-node">${p}</span> 
          <span class="arrow">→</span>
          <span class="child-nodes">${children.join(', ')}</span>
          <span class="explanation">(${p} - 1 = ${p-1}, ${p} - 2 = ${p-2})</span>
        </div>
      `);
    });
  
    resultHTML.push(`
        <p>Final unique Child Nodes: [${childNodes.sort((a,b)=>a-b).join(', ')}]</p>
      </div>
    `);
  
    // Step 4: Sums and Digital Roots
    const sumCR = chromaticRoots.reduce((a, b) => a + b, 0);
    const sumPN = parentNodes.reduce((a, b) => a + b, 0);
    const sumCN = childNodes.reduce((a, b) => a + b, 0);
  
    const drCR = digitalRoot(sumCR);
    const drPN = digitalRoot(sumPN);
    const drCN = digitalRoot(sumCN);
  
    resultHTML.push(`
      <div class="analysis-step">
        <h4>Sums and Digital Roots</h4>
        
        <div class="calculation">
          <p>Sum of Chromatic Roots: ${chromaticRoots.join(' + ')} = ${sumCR}</p>
          <p>Digital Root calculation: ${drCR.steps.join(' → ')} = ${drCR.result}</p>
        </div>
        
        <div class="calculation">
          <p>Sum of Parent Nodes: ${parentNodes.join(' + ')} = ${sumPN}</p>
          <p>Digital Root calculation: ${drPN.steps.join(' → ')} = ${drPN.result}</p>
        </div>
        
        <div class="calculation">
          <p>Sum of Child Nodes: ${childNodes.join(' + ')} = ${sumCN}</p>
          <p>Digital Root calculation: ${drCN.steps.join(' → ')} = ${drCN.result}</p>
        </div>
      </div>
    `);
  
    // Step 5: Factorials and digit sums
    resultHTML.push(`
      <div class="analysis-step">
        <h4>Factorials and Digit Sums</h4>
        <p>I now calculate the factorials of our sums and analyze their digital properties.</p>
    `);
  
    // Calculate factorials
    const factCR = factorial(sumCR);
    const factPN = factorial(sumPN);
    const factCN = factorial(sumCN);
    
    // Calculate digit sums
    const dsCR = digitSum(factCR.result);
    const dsPN = digitSum(factPN.result);
    const dsCN = digitSum(factCN.result);
    
    // Calculate digital roots of digit sums
    const drDSCR = digitalRoot(dsCR.sum);
    const drDSPN = digitalRoot(dsPN.sum);
    const drDSCN = digitalRoot(dsCN.sum);
  
    resultHTML.push(`
        <div class="factorial-analysis">
          <h4>${sumCR}! (Sum of Chromatic Roots)</h4>
          <div class="process">
            <p class="steps">${factCR.steps.join('<br>')}</p>
            <p>Final value: ${dsCR.digitDisplay}</p>
            <p>Digit Sum: ${dsCR.sum}</p>
            <p>Digital Root: ${drDSCR.steps.join(' → ')} = ${drDSCR.result}</p>
          </div>
        </div>
        
        <div class="factorial-analysis">
          <h4>${sumPN}! (Sum of Parent Nodes)</h4>
          <div class="process">
            <p class="steps">${factPN.steps.join('<br>')}</p>
            <p>Final value: ${dsPN.digitDisplay}</p>
            <p>Digit Sum: ${dsPN.sum}</p>
            <p>Digital Root: ${drDSPN.steps.join(' → ')} = ${drDSPN.result}</p>
          </div>
        </div>
        
        <div class="factorial-analysis">
          <h4>${sumCN}! (Sum of Child Nodes)</h4>
          <div class="process">
            <p class="steps">${factCN.steps.join('<br>')}</p>
            <p>Final value: ${dsCN.digitDisplay}</p>
            <p>Digit Sum: ${dsCN.sum}</p>
            <p>Digital Root: ${drDSCN.steps.join(' → ')} = ${drDSCN.result}</p>
          </div>
        </div>
      </div>
    `);
  
    // Step 6: Scales (chromatic roots × scale factors)
    resultHTML.push(`
      <div class="analysis-step">
        <h4>Scaling Chromatic Roots</h4>
        <p>I multiply each chromatic root by scale factors to observe patterns.</p>
        
        <div class="scale-input-container">
          <h4>Explore Custom Scales</h4>
          <p>Enter a scale factor to see how it affects the chromatic roots:</p>
          <input type="number" id="scale-input" min="1" placeholder="Enter scale (e.g., 10, 11, 12...)" class="scale-input">
          <button id="calculate-scale" class="scale-button">Calculate</button>
        </div>
        
        <div id="custom-scale-results"></div>
        
        <h4>Default Scales (1-9)</h4>
        <div class="scale-container">
    `);
    
    // Generate default scales 1-9
    for (let scale = 1; scale <= 9; scale++) {
      resultHTML.push(analyzeScale(scale, chromaticRoots));
    
    }
    
    resultHTML.push(`
        </div>
      </div>
    `);
  
    // Add the new sections
    resultHTML.push(analyzePatternCycles());
    resultHTML.push(addComparisonTool());
    resultHTML.push(addPrimeFactorAnalysis());
    
    // Add a conclusion section
    resultHTML.push(`
      <div class="conclusion">
        <h4>Isaac Muliro (The Xerxis Observation)</h4>
        <p>The analysis reveals numerical patterns across different scales and operations. 
          Notice how digital roots cycle in predictable patterns, revealing the underlying mathematical structure. I personally studied this for days everywhere i walked I was thinking partterns😁 
          In my conclusion 9 is the mother of all numbers you can dispose and build your own proof, Once you have a 9, You can get any number you want. I am still contemplating this thought further. I believe there is a hidden mystery in 9 as a digit with relation to 3 and 6. </p>
      </div>
    `);
    
    return resultHTML.join('');
  }
  
  // Initialize the chromatic analysis when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const chromaticResults = document.getElementById('chromatic-results');
    
    // Load Chart.js if needed for visualizations
    function loadChartJS() {
      return new Promise((resolve, reject) => {
        if (window.Chart) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Chart.js'));
        document.head.appendChild(script);
      });
    }
    
    // Display a loading message
    chromaticResults.innerHTML = '<p>Loading chromatic analysis...</p>';
    
    // Use setTimeout to prevent UI freezing for calculations
    setTimeout(() => {
      try {
        chromaticResults.innerHTML = performChromaticAnalysis();
        
        // Add event listener for custom scale calculation
        document.getElementById('calculate-scale').addEventListener('click', () => {
          const scaleInput = document.getElementById('scale-input');
          const scale = parseInt(scaleInput.value, 10);
          
          if (isNaN(scale) || scale < 1) {
            alert('Please enter a valid positive number for the scale.');
            return;
          }
          
          const customScaleResults = document.getElementById('custom-scale-results');
          const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          
          // Create container for the new scale
          const scaleContainer = document.createElement('div');
          scaleContainer.className = 'custom-scale';
          scaleContainer.innerHTML = `
            <h4>Custom Scale ${scale}×</h4>
            ${analyzeScale(scale, chromaticRoots)}
          `;
          
          // Add to the beginning of results
          if (customScaleResults.firstChild) {
            customScaleResults.insertBefore(scaleContainer, customScaleResults.firstChild);
          } else {
            customScaleResults.appendChild(scaleContainer);
          }
          
          // Clear input
          scaleInput.value = '';
          
          // Scroll to the new result
          scaleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        // Add keyboard event listener for Enter key
        document.getElementById('scale-input').addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            document.getElementById('calculate-scale').click();
          }
        });
        
        // Add event listener for comparison tool
        document.getElementById('compare-numbers').addEventListener('click', function() {
          const num1 = parseInt(document.getElementById('number1').value);
          const num2 = parseInt(document.getElementById('number2').value);
          
          if (isNaN(num1) || isNaN(num2) || num1 < 1 || num2 < 1) {
            alert('Please enter valid positive numbers.');
            return;
          }
          
          const dr1 = digitalRoot(num1);
          const dr2 = digitalRoot(num2);
          const factorialSum = num1 + num2;
          const factAnalysis = factorial(factorialSum);
          const factDigitSum = digitSum(factAnalysis.result);
          
          const resultsHTML = `
            <h4>Comparison Results</h4>
            <table class="comparison-table">
              <tr>
                <th>Property</th>
                <th>${num1}</th>
                <th>${num2}</th>
              </tr>
              <tr>
                <td>Digital Root</td>
                <td>${dr1.result}</td>
                <td>${dr2.result}</td>
              </tr>
              <tr>
                <td>Digital Root Process</td>
                <td>${dr1.steps.join(' → ')}</td>
                <td>${dr2.steps.join(' → ')}</td>
              </tr>
              <tr>
                <td>Sum</td>
                <td colspan="2" class="center">${num1} + ${num2} = ${factorialSum}</td>
              </tr>
              <tr>
                <td>Factorial of Sum</td>
                <td colspan="2" class="center">${factorialSum}! = ${factAnalysis.steps[factAnalysis.steps.length-1]}</td>
              </tr>
              <tr>
                <td>Digit Sum of Factorial</td>
                <td colspan="2" class="center">${factDigitSum.sum}</td>
              </tr>
            </table>
          `;
          
          const comparisonResults = document.getElementById('comparison-results');
          comparisonResults.innerHTML = resultsHTML;
          comparisonResults.style.display = 'block';
        });
        
        // Try to load Chart.js and initialize visualization if successful
        loadChartJS().then(() => {
          // Only try to add visualization if Chart.js loaded successfully
          try {
            // Add a visualization section after the conclusion
            const visualSection = document.createElement('div');
            visualSection.className = 'visualization-section';
            visualSection.innerHTML = `
              <h4>Pattern Visualization</h4>
              <p>This graph shows the digital roots across different scales:</p>
              <div class="chart-container">
                <canvas id="digitalRootChart"></canvas>
              </div>
            `;
            
            const conclusion = document.querySelector('.conclusion');
            if (conclusion) {
              conclusion.after(visualSection);
              
              // Create data for the chart
              const scales = Array.from({length: 20}, (_, i) => i + 1);
              const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
              const digitalRootData = scales.map(scale => {
                const scaled = chromaticRoots.map(n => n * scale);
                const sum = scaled.reduce((a, b) => a + b, 0);
                return digitalRoot(sum).result;
              });
              
              // Create the chart
              const ctx = document.getElementById('digitalRootChart').getContext('2d');
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: scales,
                  datasets: [{
                    label: 'Digital Root',
                    data: digitalRootData,
                    borderColor: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    tension: 0.1
                  }]
                },
                options: {
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 9
                    }
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: 'Digital Root Pattern by Scale Factor'
                    }
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error creating visualization:', error);
          }
        }).catch(error => {
          console.warn('Chart.js could not be loaded:', error);
        });
        
        // Add a scroll event to animate elements as they come into view
        const animateOnScroll = () => {
          const elements = document.querySelectorAll('.analysis-step, .custom-scale');
          elements.forEach(element => {
            const position = element.getBoundingClientRect();
            // If element is in viewport
            if(position.top >= 0 && position.bottom <= window.innerHeight) {
              element.style.animation = 'fadeIn 1s forwards';
            }
          });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        // Trigger once on load
        animateOnScroll();
        
      } catch (error) {
        chromaticResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      }
    }, 10);
  });