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



const THRESHOLD_WARNING = 1000;
const THRESHOLD_WEBWORKER = 10000; function calculateFactorialindependent(n) {let result = BigInt(1);
  for (let i = BigInt(2); i <= n; i++) {
    result *= i;
  }
  return result;
} function calculateDigitSumindependent(numStr) {let sum = 0;
  for (const digit of numStr) {
    sum += parseInt(digit, 10);
  }
  return sum;
} function calculateDigitalRootindependent(n) {while (n >= 10) {
    n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return n;
} function performFactorialAnalysisindependent(num) {
  const n = BigInt(num);


  const factorialValue = calculateFactorialindependent(n);


  const factorialStr = factorialValue.toString();


  const digitSum = calculateDigitSumindependent(factorialStr);


  const digitalRoot = calculateDigitalRootindependent(digitSum);


  return `
    <h4>Results for ${num}!</h4>
    <pre>Factorial: ${factorialStr}</pre>
    <pre>Sum of digits: ${digitSum}</pre>
    <pre>Digital root: ${digitalRoot}</pre>
  `;
} function addFactorialVisualizationtoindependent(num, digitalRoot) {
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


  const rootDisplay = document.querySelector('.digital-root-display');
  rootDisplay.innerHTML = '';


  const circle = document.createElement('div');
  circle.className = 'digital-root-circle';
  circle.innerHTML = `<span>${digitalRoot}</span>`;
  circle.style.backgroundColor = `hsl(${digitalRoot * 40}, 70%, 60%)`;
  rootDisplay.appendChild(circle);


  const description = document.createElement('p');
  description.textContent = `Digital root ${digitalRoot} represents the cyclical nature of the number ${num}!`;
  rootDisplay.appendChild(description);


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
  `;
  document.head.appendChild(style);
} function createFactorialWorker() {
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
        
        
        const factorialStr = result.toString();
        
        
        let digitSum = 0;
        for (const digit of factorialStr) {
          digitSum += parseInt(digit, 10);
        }
        
        
        let digitalRoot = digitSum;
        while (digitalRoot >= 10) {
          digitalRoot = String(digitalRoot).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        }
        
        
        postMessage({ 
          type: 'result', 
          factorialStr: factorialStr,
          digitSum: digitSum,
          digitalRoot: digitalRoot
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


document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculate-btn');
  const factorialInput = document.getElementById('factorial-input');
  const factorialResults = document.getElementById('factorial-results');

  calculateBtn.addEventListener('click', () => {
    const num = parseInt(factorialInput.value, 10);
    if (isNaN(num) || num < 0) {
      factorialResults.innerHTML = '<p class="error">Please enter a non-negative number.</p>';
      return;
    }


    let warningMessage = '';
    if (num >= THRESHOLD_WARNING) {
      warningMessage = `
        <div class="warning-bar">
          <i>⚠️</i> 
          <div>
            <strong>Large factorial calculation:</strong> Computing ${num}! may take a significant amount of time and memory.
            ${num >= THRESHOLD_WEBWORKER ? ' Using web worker for background processing.' : ''}
          </div>
        </div>
      `;
    }

    factorialResults.innerHTML = `
      ${warningMessage}
      <p>Calculating...</p>
      ${num >= THRESHOLD_WEBWORKER ? '<div class="calculation-progress"><div class="progress-bar"></div></div>' : ''}
    `;

    if (num >= THRESHOLD_WEBWORKER) {

      const worker = createFactorialWorker();

      worker.onmessage = function (e) {
        const data = e.data;

        if (data.type === 'progress') {

          const progressBar = document.querySelector('.progress-bar');
          if (progressBar) {
            progressBar.style.width = `${data.progress}%`;
          }
        } else
        if (data.type === 'result') {

          factorialResults.innerHTML = `
            ${warningMessage}
            <h4>Results for ${num}!</h4>
            <pre>Factorial: ${data.factorialStr}</pre>
            <pre>Sum of digits: ${data.digitSum}</pre>
            <pre>Digital root: ${data.digitalRoot}</pre>
          `;


          addFactorialVisualizationtoindependent(num, data.digitalRoot);


          worker.terminate();
        } else
        if (data.type === 'error') {
          factorialResults.innerHTML = `<p class="error">Error: ${data.message}</p>`;
          worker.terminate();
        }
      };

      worker.onerror = function (error) {
        factorialResults.innerHTML = `<p class="error">Worker Error: ${error.message}</p>`;
        worker.terminate();
      };


      worker.postMessage(num);
    } else
    {

      setTimeout(() => {
        try {
          const result = performFactorialAnalysisindependent(num);
          factorialResults.innerHTML = warningMessage + result;


          const n = BigInt(num);
          const factorialValue = calculateFactorialindependent(n);
          const factorialStr = factorialValue.toString();
          const digitSum = calculateDigitSumindependent(factorialStr);
          const digitalRoot = calculateDigitalRootindependent(digitSum);


          addFactorialVisualizationtoindependent(num, digitalRoot);

        } catch (error) {
          factorialResults.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
      }, 10);
    }
  });
});