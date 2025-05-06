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



let deviceList = [];
let scanHistory = []; 





























function scan() {
  showLoading();





  const timestamp = new Date().getTime();
  const apiUrl = `/api/scan?t=${timestamp}`;
  console.log('Making request to:', apiUrl);

  fetch(apiUrl).
  then((response) => {
    console.log('Response status:', response.status);
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      return response.text().then((text) => {
        throw new Error(`Scan failed: ${text || response.statusText}`);
      });
    }
    return response.json();
  }).
  then((data) => {
    console.log('Scan successful, found devices:', data.length);
    deviceList = data;
    updateNetworkStats();
    loadHistory();
    displayDevices(deviceList);
  }).
  catch((error) => {
    console.error('Error during scan:', error);
    showError(`Scan failed: ${error.message}`);
  });
} 
function showLoading() {
  const output = document.getElementById('output');
  output.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-sync fa-spin fa-3x"></i>
            <div class="welcome-title">Scanning Network...</div>
            <div class="welcome-text">Looking for active devices on your local network</div>
        </div>
    `;
} function showError(message) {
  const output = document.getElementById('output');
  output.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
            <div class="welcome-title">Error</div>
            <div class="welcome-text">${message}</div>
        </div>
    `;
} function displayDevices(devices) {
  const output = document.getElementById('output');

  if (devices.length === 0) {
    output.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-exclamation-triangle fa-3x"></i>
                <div class="welcome-title">No Devices Found</div>
                <div class="welcome-text">Try scanning again or check your network connection</div>
            </div>
        `;
    return;
  }

  let html = '';

  devices.forEach((device) => {
    html += `
            <div class="device" onclick="showDeviceDetails('${device.ip}')">
                <div class="device-title">
                    <i class="${getDeviceIcon(device)}"></i>
                    <span>${device.hostname || device.deviceType || 'Unknown Device'}</span>
                </div>
                <div class="device-info">
                    <div class="info-item"><i class="fas fa-network-wired"></i> <span>${device.ip}</span></div>
                    <div class="info-item"><i class="fas fa-barcode"></i> <span>${device.mac}</span></div>
                    <div class="info-item"><i class="fas fa-building"></i> <span>${device.vendor || 'Unknown'}</span></div>
                </div>
            </div>
        `;
  });

  output.innerHTML = html;
} function getDeviceIcon(device) {const deviceType = (device.deviceType || '').toLowerCase();

  if (deviceType.includes('router')) {
    return 'fas fa-router';
  } else if (deviceType.includes('apple')) {
    return 'fab fa-apple';
  } else if (deviceType.includes('samsung') || deviceType.includes('android')) {
    return 'fab fa-android';
  } else if (deviceType.includes('google')) {
    return 'fab fa-google';
  } else if (deviceType.includes('amazon')) {
    return 'fab fa-amazon';
  } else {
    return 'fas fa-desktop';
  }
} function showDeviceDetails(ip) {
  const device = deviceList.find((d) => d.ip === ip);

  if (!device) return;

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalTitle = document.getElementById('modal-title');

  modalTitle.textContent = device.hostname || device.deviceType || 'Device Details';
  modalContent.textContent = JSON.stringify(device, null, 2);

  modal.style.display = 'block';
} 
function closeModal() {
  document.getElementById('modal').style.display = 'none';
} 
function filterDevices() {
  const searchTerm = document.getElementById('searchBox').value.toLowerCase();

  if (!searchTerm) {
    displayDevices(deviceList);
    return;
  }

  const filteredDevices = deviceList.filter((device) =>
  device.ip && device.ip.toLowerCase().includes(searchTerm) ||
  device.hostname && device.hostname.toLowerCase().includes(searchTerm) ||
  device.mac && device.mac.toLowerCase().includes(searchTerm) ||
  device.vendor && device.vendor.toLowerCase().includes(searchTerm) ||
  device.deviceType && device.deviceType.toLowerCase().includes(searchTerm)
  );

  displayDevices(filteredDevices);
} 
function exportJSON() {
  if (deviceList.length === 0) {
    alert('No scan results to export');
    return;
  }

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deviceList, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "network_scan_" + new Date().toISOString() + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
} 
function loadHistory() {
  fetch('/api/history').
  then((response) => response.json()).
  then((data) => {
    scanHistory = data;
    updateScanHistory();
  }).
  catch((error) => {
    console.error('Error loading history:', error);
  });
} 
function viewHistory() {
  if (scanHistory.length === 0) {
    alert('No scan history available');
    return;
  }

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalTitle = document.getElementById('modal-title');

  modalTitle.textContent = 'Scan History';
  modalContent.textContent = JSON.stringify(scanHistory, null, 2);

  modal.style.display = 'block';
} 
function updateNetworkStats() {
  const statsElement = document.getElementById('network-stats');

  if (deviceList.length === 0) {
    statsElement.innerHTML = '<div class="widget-text">Run a scan to view statistics</div>';
    return;
  }


  const types = {
    routers: 0,
    apple: 0,
    android: 0,
    other: 0
  };

  deviceList.forEach((device) => {
    const deviceType = (device.deviceType || '').toLowerCase();

    if (deviceType.includes('router')) {
      types.routers++;
    } else if (deviceType.includes('apple')) {
      types.apple++;
    } else if (deviceType.includes('samsung') || deviceType.includes('android')) {
      types.android++;
    } else {
      types.other++;
    }
  });

  statsElement.innerHTML = `
        <div class="stats-list">
            <div class="stats-item"><i class="fas fa-network-wired"></i> <span>Total Devices: ${deviceList.length}</span></div>
            <div class="stats-item"><i class="fas fa-router"></i> <span>Routers: ${types.routers}</span></div>
            <div class="stats-item"><i class="fab fa-apple"></i> <span>Apple Devices: ${types.apple}</span></div>
            <div class="stats-item"><i class="fab fa-android"></i> <span>Android/Samsung: ${types.android}</span></div>
            <div class="stats-item"><i class="fas fa-question-circle"></i> <span>Other: ${types.other}</span></div>
        </div>
    `;
} 
function updateScanHistory() {
  const historyElement = document.getElementById('scan-history');

  if (!scanHistory || scanHistory.length === 0) {
    historyElement.innerHTML = '<div class="widget-text">No recent scans</div>';
    return;
  }

  let html = '<div class="history-list">';
  scanHistory.slice(0, 5).forEach((scan) => {
    const date = new Date(scan.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    html += `
            <div class="history-item">
                <i class="fas fa-clock"></i>
                <span>${formattedDate}: ${scan.deviceCount} devices</span>
            </div>
        `;
  });
  html += '</div>';

  historyElement.innerHTML = html;
}


window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};


document.addEventListener('DOMContentLoaded', function () {

  loadHistory();
});