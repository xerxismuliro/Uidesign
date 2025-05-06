/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */





function digitalRoot(n) {
  if (n === 0) return 0;
  
  
  let steps = [n];
  let current = n;
  
  while (current > 9) {
    current = current.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    steps.push(current);
  }
  
  return { result: ((n - 1) % 9) + 1, steps };
}


const FACTORIAL_WARNING_THRESHOLD = 1000; 
const FACTORIAL_WEBWORKER_THRESHOLD = 10000; 


function factorial(n) {
  if (n === 0 || n === 1) return { result: BigInt(1), steps: ["1! = 1"] };
  
  
  if (n < FACTORIAL_WARNING_THRESHOLD) {
    let result = BigInt(1);
    
    const steps = [];
    
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
      if (i <= 5 || i === n) { 
        steps.push(`${i}! = ${result}`);
      } else if (i === 6) {
        steps.push("...");
      }
    }
    
    return { result, steps };
  }
  
  else {
    return { 
      result: BigInt(-1),  
      steps: [`${n}! will be calculated using a web worker`],
      needsWebWorker: true,
      n: n
    };
  }
}


function createFactorialWorker() {
  const workerScript = `
    onmessage = function(e) {
      const num = e.data;
      try {
        
        let result = BigInt(1);
        let n = BigInt(num);
        
        
        const reportInterval = Math.max(1, Number(n) / 20);
        let lastReportedProgress = 0;
        
        for (let i = BigInt(2); i <= n; i++) {
          result *= i;
          
          
          if (Number(i) - lastReportedProgress >= reportInterval) {
            const progress = Number(i) / Number(n);
            postMessage({ type: 'progress', progress: progress * 100 });
            lastReportedProgress = Number(i);
          }
        }
        
        
        postMessage({ 
          type: 'result', 
          result: result.toString()
        });
      } catch (error) {
        postMessage({ type: 'error', message: error.message });
      }
    };
  `;
  
  
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  
  return new Worker(workerUrl);
}


function calculateFactorialAsync(n, callback) {
  const worker = createFactorialWorker();
  let progressElement = null;
  
  worker.onmessage = function(e) {
    const data = e.data;
    
    if (data.type === 'progress') {
      
      if (progressElement) {
        progressElement.style.width = `${data.progress}%`;
      }
    } 
    else if (data.type === 'result') {
      
      callback(BigInt(data.result));
      
      
      worker.terminate();
    } 
    else if (data.type === 'error') {
      console.error(`Factorial calculation error: ${data.message}`);
      callback(null, data.message);
      worker.terminate();
    }
  };
  
  worker.onerror = function(error) {
    console.error(`Worker error: ${error.message}`);
    callback(null, error.message);
    worker.terminate();
  };
  
  
  const containerElement = document.createElement('div');
  containerElement.className = 'calculation-progress';
  progressElement = document.createElement('div');
  progressElement.className = 'progress-bar';
  containerElement.appendChild(progressElement);
  
  
  worker.postMessage(n);
  
  return containerElement;
}


function digitSum(n) {
  const digits = n.toString().split('');
  const sum = digits.reduce((sum, d) => sum + parseInt(d), 0);
  
  
  const digitDisplay = digits.length > 20 ? 
    `${digits.slice(0, 5).join('')}...${digits.slice(-5).join('')} (${digits.length} digits)` : 
    digits.join('');
  
  return { sum, digitDisplay };
}


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


function primeFactors(n) {
  const factors = [];
  let divisor = 2;
  
  while (n > 1) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n /= divisor;
    }
    divisor++;
    
    
    if (divisor * divisor > n && n > 1) {
      factors.push(n);
      break;
    }
  }
  
  return factors;
}


function analyzePatternCycles() {
  const resultHTML = [];
  
  resultHTML.push(`
    <div class="analysis-step">
      <h3>Digital Root Pattern Detection</h3>
      <p>I analyze how digital roots cycle over larger scale factors.</p>
      
      <div class="cycle-analysis">
  `);
  
  
  const scaleRange = 100;
  const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const digitalRootValues = [];
  
  for (let scale = 1; scale <= scaleRange; scale++) {
    const scaled = chromaticRoots.map(n => n * scale);
    const sum = scaled.reduce((a, b) => a + b, 0);
    const dr = digitalRoot(sum).result;
    digitalRootValues.push(dr);
  }
  
  
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
  
  for (let i = 0; i < 100; i++) {
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



function addFactorialStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .calculation-progress {
      width: 100%;
      height: 20px;
      background-color: #e9ecef;
      border-radius: 4px;
      margin: 10px 0;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background-color: #007bff;
      width: 0;
      transition: width 0.3s;
    }
    
    .warning-bar {
      background-color: #fff3cd;
      color: #856404;
      border: 1px solid #ffeeba;
      border-radius: 4px;
      padding: 10px 15px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }

    .warning-bar i {
      margin-right: 10px;
      font-size: 20px;
    }
    
    
    .expandable-content {
      position: relative;
      max-height: 80px;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      word-break: break-word;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    .expandable-content.expanded {
      max-height: 2000px;
      transition: max-height 0.5s ease-in;
    }
    
    .expand-button {
      display: inline-block;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 3px 10px;
      margin-top: 5px;
      cursor: pointer;
      font-size: 0.9em;
      transition: background-color 0.2s;
    }
    
    .expand-button:hover {
       background-color:rgb(17, 161, 53);
    }
    
    .content-preview {
      display: block;
      word-break: break-all;
    }
    
    .content-full {
      display: none;
      word-break: break-all;
      white-space: normal;
    }
    
    .expandable-content.expanded .content-preview {
      display: none;
    }
    
    .expandable-content.expanded .content-full {
      display: block;
    }
    
    .dropdown-arrow {
      display: inline-block;
      margin-left: 5px;
      transition: transform 0.3s;
    }
    
    .expandable-content.expanded .dropdown-arrow {
      transform: rotate(180deg);
    }
    
    
    .comparison-table td {
      max-width: 300px;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    
    
    .factorial-result {
      white-space: normal;
      word-break: break-all;
      overflow-wrap: break-word;
    }
    
    
    .digit-frequency {
      margin-top: 10px;
      width: 100%;
    }
    
    .frequency-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .frequency-table th,
    .frequency-table td {
      padding: 6px;
      border: 1px solid #ddd;
      text-align: left;
    }
    
    
    
    
    
    .frequency-bar-container {
      width: 100%;
      background-color:rgb(88, 109, 130);
      height: 20px;
      border-radius: 3px;
    }
    
    .frequency-bar {
      height: 20px;
      border-radius: 3px;
    }
  `;
  document.head.appendChild(style);
}






function createExpandableContent(preview, fullContent) {
  return `
    <div class="expandable-content">
      <div class="content-preview">${preview}</div>
      <div class="content-full factorial-result">${fullContent}</div>
      <div class="expand-button">View more <span class="dropdown-arrow">▼</span></div>
    </div>
  `;
}



function analyzeDigitFrequency(numStr) {
  const frequency = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
  
  for (const digit of numStr) {
    if (digit >= '0' && digit <= '9') {
      frequency[digit]++;
    }
  }
  
  return frequency;
}


function createDigitFrequencyVisualization(frequency) {
  const total = Object.values(frequency).reduce((sum, count) => sum + count, 0);
  let html = `<div class="digit-frequency">
    <h4>Digit Frequency Analysis (${total} total digits)</h4>
    <table class="frequency-table">
      <tr>
        <th>Digit</th>
        <th>Count</th>
        <th>Percentage</th>
        <th>Distribution</th>
      </tr>`;
  
  for (let digit = 0; digit <= 9; digit++) {
    const count = frequency[digit];
    const percentage = ((count / total) * 100).toFixed(2);
    const barWidth = Math.max(1, Math.min(100, percentage));
    
    html += `
      <tr>
        <td>${digit}</td>
        <td>${count.toLocaleString()}</td>
        <td>${percentage}%</td>
        <td>
          <div class="frequency-bar-container">
            <div class="frequency-bar" 
                 style="width: ${barWidth}%; background-color: hsl(${digit * 36}, 70%, 60%);" 
                 title="${count} occurrences (${percentage}%)">
            </div>
          </div>
        </td>
      </tr>`;
  }
  
  html += `</table></div>`;
  return html;
}






function performChromaticAnalysis(customScale = null) {
  const resultHTML = [];
  
  resultHTML.push(`<div class="intro">
    <h4>Chromatic Number Analysis</h4>
    <p>This analysis explores number patterns based on digital roots and the relationships between parent and child nodes.</p>
  </div>`);

  
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

  
  resultHTML.push(`
    <div class="analysis-step" id="factorial-analysis">
      <h4>Factorials and Digit Sums</h4>
      <p>I now calculate the factorials of our sums and analyze their digital properties.</p>
  `);

  
  resultHTML.push(`
      <div class="factorial-analysis" id="cr-factorial-container">
        <h4>${sumCR}! (Sum of Chromatic Roots)</h4>
        <div class="process" id="cr-factorial-process">
          <p>Calculating...</p>
        </div>
      </div>
      
      <div class="factorial-analysis" id="pn-factorial-container">
        <h4>${sumPN}! (Sum of Parent Nodes)</h4>
        <div class="process" id="pn-factorial-process">
          <p>Calculating...</p>
        </div>
      </div>
      
      <div class="factorial-analysis" id="cn-factorial-container">
        <h4>${sumCN}! (Sum of Child Nodes)</h4>
        <div class="process" id="cn-factorial-process">
          <p>Calculating...</p>
        </div>
      </div>
    </div>
  `);

  
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
  
  
  for (let scale = 1; scale <= 9; scale++) {
    resultHTML.push(analyzeScale(scale, chromaticRoots));
  
  }
  
  resultHTML.push(`
      </div>
    </div>
  `);

  
  resultHTML.push(analyzePatternCycles());
  resultHTML.push(addComparisonTool());
  resultHTML.push(addPrimeFactorAnalysis());
  
  
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


function processFactorialResults(sumCR, sumPN, sumCN) {
  
  const factCR = factorial(sumCR);
  if (factCR.needsWebWorker) {
    const container = document.getElementById('cr-factorial-process');
    
    
    const warningHTML = `
      <div class="warning-bar">
        <i>⚠️</i> 
        <div>
          <strong>Large factorial calculation:</strong> Computing ${sumCR}! may take a significant amount of time.
        </div>
      </div>
    `;
    container.innerHTML = warningHTML;
    
    
    const progressBar = calculateFactorialAsync(sumCR, (result, error) => {
      if (error) {
        container.innerHTML = `<p class="error">Error: ${error}</p>`;
        return;
      }
      
      
      const digitSumData = digitSum(result);
      const digitalRootData = digitalRoot(digitSumData.sum);
      
      container.innerHTML = `
        <p class="steps">${sumCR}! = Large number with ${result.toString().length} digits</p>
        <p>Final value: ${digitSumData.digitDisplay}</p>
        <p>Digit Sum: ${digitSumData.sum}</p>
        <p>Digital Root: ${digitalRootData.steps.join(' → ')} = ${digitalRootData.result}</p>
      `;
    });
    
    container.appendChild(progressBar);
  } else {
    const dsCR = digitSum(factCR.result);
    const drDSCR = digitalRoot(dsCR.sum);
    document.getElementById('cr-factorial-process').innerHTML = `
      <p class="steps">${factCR.steps.join('<br>')}</p>
      <p>Final value: ${dsCR.digitDisplay}</p>
      <p>Digit Sum: ${dsCR.sum}</p>
      <p>Digital Root: ${drDSCR.steps.join(' → ')} = ${drDSCR.result}</p>
    `;
  }
  
  
  const factPN = factorial(sumPN);
  if (factPN.needsWebWorker) {
    const container = document.getElementById('pn-factorial-process');
    
    
    const warningHTML = `
      <div class="warning-bar">
        <i>⚠️</i> 
        <div>
          <strong>Large factorial calculation:</strong> Computing ${sumPN}! may take a significant amount of time.
        </div>
      </div>
    `;
    container.innerHTML = warningHTML;
    
    
    const progressBar = calculateFactorialAsync(sumPN, (result, error) => {
      if (error) {
        container.innerHTML = `<p class="error">Error: ${error}</p>`;
        return;
      }
      
      
      const digitSumData = digitSum(result);
      const digitalRootData = digitalRoot(digitSumData.sum);
      
      container.innerHTML = `
        <p class="steps">${sumPN}! = Large number with ${result.toString().length} digits</p>
        <p>Final value: ${digitSumData.digitDisplay}</p>
        <p>Digit Sum: ${digitSumData.sum}</p>
        <p>Digital Root: ${digitalRootData.steps.join(' → ')} = ${digitalRootData.result}</p>
      `;
    });
    
    container.appendChild(progressBar);
  } else {
    const dsPN = digitSum(factPN.result);
    const drDSPN = digitalRoot(dsPN.sum);
    document.getElementById('pn-factorial-process').innerHTML = `
      <p class="steps">${factPN.steps.join('<br>')}</p>
      <p>Final value: ${dsPN.digitDisplay}</p>
      <p>Digit Sum: ${dsPN.sum}</p>
      <p>Digital Root: ${drDSPN.steps.join(' → ')} = ${drDSPN.result}</p>
    `;
  }
  
  
  const factCN = factorial(sumCN);
  if (factCN.needsWebWorker) {
    const container = document.getElementById('cn-factorial-process');
    
    
    const warningHTML = `
      <div class="warning-bar">
        <i>⚠️</i> 
        <div>
          <strong>Large factorial calculation:</strong> Computing ${sumCN}! may take a significant amount of time.
        </div>
      </div>
    `;
    container.innerHTML = warningHTML;
    
    
    const progressBar = calculateFactorialAsync(sumCN, (result, error) => {
      if (error) {
        container.innerHTML = `<p class="error">Error: ${error}</p>`;
        return;
      }
      
      
      const digitSumData = digitSum(result);
      const digitalRootData = digitalRoot(digitSumData.sum);
      
      container.innerHTML = `
        <p class="steps">${sumCN}! = Large number with ${result.toString().length} digits</p>
        <p>Final value: ${digitSumData.digitDisplay}</p>
        <p>Digit Sum: ${digitSumData.sum}</p>
        <p>Digital Root: ${digitalRootData.steps.join(' → ')} = ${digitalRootData.result}</p>
      `;
    });
    
    container.appendChild(progressBar);
  } else {
    const dsCN = digitSum(factCN.result);
    const drDSCN = digitalRoot(dsCN.sum);
    document.getElementById('cn-factorial-process').innerHTML = `
      <p class="steps">${factCN.steps.join('<br>')}</p>
      <p>Final value: ${dsCN.digitDisplay}</p>
      <p>Digit Sum: ${dsCN.sum}</p>
      <p>Digital Root: ${drDSCN.steps.join(' → ')} = ${drDSCN.result}</p>
    `;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const chromaticResults = document.getElementById('chromatic-results');
  
  
  addFactorialStyles();
  
  
  function loadChartJS() {
    return new Promise((resolve, reject) => {
      if (window.Chart) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https:
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Chart.js'));
      document.head.appendChild(script);
    });
  }
  
  
  chromaticResults.innerHTML = '<p>Loading chromatic analysis...</p>';
  
  
  setTimeout(() => {
    try {
      chromaticResults.innerHTML = performChromaticAnalysis();
      
      
      const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const parentNodes = chromaticRoots.filter(n => n % 3 === 0);
      const childNodes = [];
      
      parentNodes.forEach(p => {
        const children = [p - 1, p - 2].filter(n => n > 0);
        children.forEach(c => {
          if (!childNodes.includes(c)) childNodes.push(c);
        });
      });
      
      const sumCR = chromaticRoots.reduce((a, b) => a + b, 0);
      const sumPN = parentNodes.reduce((a, b) => a + b, 0);
      const sumCN = childNodes.reduce((a, b) => a + b, 0);
      
      
      processFactorialResults(sumCR, sumPN, sumCN);
      
      
      document.getElementById('calculate-scale').addEventListener('click', () => {
        const scaleInput = document.getElementById('scale-input');
        const scale = parseInt(scaleInput.value, 10);
        
        if (isNaN(scale) || scale < 1) {
          alert('Please enter a valid positive number for the scale.');
          return;
        }
        
        const customScaleResults = document.getElementById('custom-scale-results');
        const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        
        const scaleContainer = document.createElement('div');
        scaleContainer.className = 'custom-scale';
        scaleContainer.innerHTML = `
          <h4>Custom Scale ${scale}×</h4>
          ${analyzeScale(scale, chromaticRoots)}
        `;
        
        
        if (customScaleResults.firstChild) {
          customScaleResults.insertBefore(scaleContainer, customScaleResults.firstChild);
        } else {
          customScaleResults.appendChild(scaleContainer);
        }
        
        
        scaleInput.value = '';
        
        
        scaleContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      
      
      document.getElementById('scale-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          document.getElementById('calculate-scale').click();
        }
      });
      


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
  
  const comparisonResults = document.getElementById('comparison-results');
  comparisonResults.style.display = 'block';
  
  
  comparisonResults.innerHTML = `
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
        <td>${createExpandableContent(
          dr1.steps.length > 3 ? dr1.steps.slice(0, 2).join(' → ') + ' → ...' : dr1.steps.join(' → '), 
          dr1.steps.join(' → ')
        )}</td>
        <td>${createExpandableContent(
          dr2.steps.length > 3 ? dr2.steps.slice(0, 2).join(' → ') + ' → ...' : dr2.steps.join(' → '), 
          dr2.steps.join(' → ')
        )}</td>
      </tr>
      <tr>
        <td>Sum</td>
        <td colspan="2" class="center">${num1} + ${num2} = ${factorialSum}</td>
      </tr>
      <tr id="factorial-row">
        <td>Factorial of Sum</td>
        <td colspan="2" class="center">Calculating ${factorialSum}!...</td>
      </tr>
      <tr id="digit-sum-row">
        <td>Digit Sum of Factorial</td>
        <td colspan="2" class="center">Calculating...</td>
      </tr>
      <tr id="digit-frequency-row">
        <td>Digit Frequency Analysis</td>
        <td colspan="2" class="center">Calculating...</td>
      </tr>
    </table>
  `;
  
  
  document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', function() {
      const container = this.parentElement;
      container.classList.toggle('expanded');
      this.innerHTML = container.classList.contains('expanded') ? 
        'View less <span class="dropdown-arrow">▲</span>' : 
        'View more <span class="dropdown-arrow">▼</span>';
    });
  });
  
  
  if (factorialSum >= FACTORIAL_WEBWORKER_THRESHOLD) {
    const factRow = document.getElementById('factorial-row');
    factRow.cells[1].innerHTML = `
      <div class="warning-bar">
        <i>⚠️</i> 
        <div>
          <strong>Large calculation:</strong> Computing ${factorialSum}!
        </div>
      </div>
      <div id="comparison-progress"></div>
    `;
    
    const progressContainer = document.getElementById('comparison-progress');
    const progressBar = calculateFactorialAsync(factorialSum, (result, error) => {
      if (error) {
        factRow.cells[1].innerHTML = `<p class="error">Error: ${error}</p>`;
        document.getElementById('digit-sum-row').cells[1].innerHTML = 'Could not calculate';
        document.getElementById('digit-frequency-row').cells[1].innerHTML = 'Could not calculate';
        return;
      }
      
      const resultStr = result.toString();
      const digitSumData = digitSum(result);
      const digitFrequency = analyzeDigitFrequency(resultStr);
      
      
      const preview = `${factorialSum}! = ${resultStr.length > 20 ? 
        resultStr.substring(0, 10) + '...' + resultStr.substring(resultStr.length - 10) : 
        resultStr} (${resultStr.length} digits)`;
        
      const fullContent = `${factorialSum}! = ${resultStr}`;
      
      factRow.cells[1].innerHTML = createExpandableContent(preview, fullContent);
      document.getElementById('digit-sum-row').cells[1].innerHTML = createExpandableContent(
        `Sum = ${digitSumData.sum}`, 
        `Sum of all ${resultStr.length} digits = ${digitSumData.sum}`
      );
      
      
      const frequencyRow = document.getElementById('digit-frequency-row');
      const frequencyHTML = createDigitFrequencyVisualization(digitFrequency);
      frequencyRow.cells[1].innerHTML = createExpandableContent(
        "Click to view digit distribution analysis", 
        frequencyHTML
      );
      
      
      document.querySelectorAll('.expand-button').forEach(button => {
        button.addEventListener('click', function() {
          const container = this.parentElement;
          container.classList.toggle('expanded');
          this.innerHTML = container.classList.contains('expanded') ? 
            'View less <span class="dropdown-arrow">▲</span>' : 
            'View more <span class="dropdown-arrow">▼</span>';
        });
      });
    });
    
    progressContainer.appendChild(progressBar);
  } else {
    const factAnalysis = factorial(factorialSum);
    const factDigitSum = digitSum(factAnalysis.result);
    const resultStr = factAnalysis.result.toString();
    const digitFrequency = analyzeDigitFrequency(resultStr);
    
    
    const factPreview = `${factorialSum}! = ${resultStr.length > 20 ? 
      resultStr.substring(0, 10) + '...' + resultStr.substring(resultStr.length - 10) : 
      resultStr}`;
      
    const factFull = `${factorialSum}! = ${resultStr}`;
    
    document.getElementById('factorial-row').cells[1].innerHTML = createExpandableContent(factPreview, factFull);
    document.getElementById('digit-sum-row').cells[1].innerHTML = factDigitSum.sum;
    
    
    const frequencyRow = document.getElementById('digit-frequency-row');
    const frequencyHTML = createDigitFrequencyVisualization(digitFrequency);
    frequencyRow.cells[1].innerHTML = createExpandableContent(
      "Click to view digit distribution analysis", 
      frequencyHTML
    );
    
    
    document.querySelectorAll('.expand-button').forEach(button => {
      button.addEventListener('click', function() {
        const container = this.parentElement;
        container.classList.toggle('expanded');
        this.innerHTML = container.classList.contains('expanded') ? 
          'View less <span class="dropdown-arrow">▲</span>' : 
          'View more <span class="dropdown-arrow">▼</span>';
      });
    });
  }
});





      
      
      loadChartJS().then(() => {
        
        try {
          
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
            
            
            const scales = Array.from({length: 20}, (_, i) => i + 1);
            const chromaticRoots = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const digitalRootData = scales.map(scale => {
              const scaled = chromaticRoots.map(n => n * scale);
              const sum = scaled.reduce((a, b) => a + b, 0);
              return digitalRoot(sum).result;
            });
            
            
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
      
      
      const animateOnScroll = () => {
        const elements = document.querySelectorAll('.analysis-step, .custom-scale');
        elements.forEach(element => {
          const position = element.getBoundingClientRect();
          
          if(position.top >= 0 && position.bottom <= window.innerHeight) {
            element.style.animation = 'fadeIn 1s forwards';
          }
        });
      };
      
      window.addEventListener('scroll', animateOnScroll);
      
      animateOnScroll();
      
    } catch (error) {
      chromaticResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }, 10);
});

