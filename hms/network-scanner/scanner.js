// const { exec } = require('child_process');
// const os = require('os');
// const fs = require('fs');
// const path = require('path');

// // Get the local IP address
// function getLocalIP() {
//     const interfaces = os.networkInterfaces();
//     for (const name of Object.keys(interfaces)) {
//         for (const iface of interfaces[name]) {
//             // Skip over non-IPv4 and internal (loopback) addresses
//             if (iface.family === 'IPv4' && !iface.internal) {
//                 return iface.address;
//             }
//         }
//     }
//     return '127.0.0.1'; // Default to localhost if no other IP is found
// }

// // Scan the local network for devices
// function scanNetwork(callback) {
//     const localIP = getLocalIP();
//     const networkPrefix = localIP.substring(0, localIP.lastIndexOf('.') + 1);
    
//     console.log(`Local IP: ${localIP}`);
//     console.log(`Scanning network: ${networkPrefix}0/24`);
    
//     // For macOS (which you're using based on your terminal output)
//     // Send a broadcast ping and then get ARP table
//     const cmd = `ping -c 1 -t 1 ${networkPrefix}255 && arp -a`;
    
//     exec(cmd, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing scan: ${error.message}`);
//             return callback(error);
//         }
        
//         if (stderr) {
//             console.error(`Scan stderr: ${stderr}`);
//         }
        
//         // Parse the output to extract IP and MAC addresses
//         const devices = parseARPOutput(stdout);
        
//         // Log the scan results
//         logScanResults(devices);
        
//         callback(null, devices);
//     });
// }

// // Parse ARP output to extract IP and MAC addresses (macOS specific)
// function parseARPOutput(output) {
//     const devices = [];
//     const lines = output.split('\n');
//     const regex = /\(([0-9.]+)\) at ([0-9a-f:]+).+?on/i;
    
//     for (const line of lines) {
//         const match = line.match(regex);
//         if (match) {
//             const ip = match[1];
//             const mac = match[2];
            
//             // Skip local addresses
//             if (mac === '00:00:00:00:00:00' || mac === 'ff:ff:ff:ff:ff:ff') {
//                 continue;
//             }
            
//             devices.push({
//                 ip: ip,
//                 mac: mac,
//                 deviceType: guessDeviceType(ip, mac),
//                 vendor: getVendorFromMAC(mac),
//                 timestamp: new Date().toISOString()
//             });
//         }
//     }
    
//     return devices;
// }

// // Simple function to guess the vendor from MAC address
// // In a real app, you'd use a proper MAC vendor database
// function getVendorFromMAC(mac) {
//     const prefix = mac.substring(0, 8).toUpperCase();
//     const vendorMap = {
//         '00:50:56': 'VMware',
//         'AC:DE:48': 'Apple',
//         '00:0C:29': 'VMware',
//         '00:1A:11': 'Google',
//         '00:1F:5B': 'Apple',
//         'E8:03:9A': 'Samsung',
//         '98:FA:9B': 'Apple',
//         '88:66:A5': 'Apple',
//         'F0:18:98': 'Apple',
//         '00:27:02': 'Amazon',
//         'F8:1E:DF': 'Apple',
//         'AC:BC:32': 'Apple',
//         '78:31:C1': 'Apple',
//         '00:16:CB': 'Apple'
//     };
    
//     for (const [key, value] of Object.entries(vendorMap)) {
//         if (mac.toUpperCase().startsWith(key)) {
//             return value;
//         }
//     }
//     return 'Unknown';
// }

// // Guess the device type based on available info
// function guessDeviceType(ip, mac) {
//     // Router heuristic - common default gateway ending in .1
//     if (ip.endsWith('.1') || ip.endsWith('.254')) {
//         return 'Router';
//     }
    
//     // Vendor-based heuristics
//     const vendor = getVendorFromMAC(mac);
    
//     if (vendor === 'Apple') {
//         return 'Apple Device';
//     } else if (vendor === 'Samsung') {
//         return 'Samsung Device';
//     } else if (vendor === 'Google') {
//         return 'Google Device';
//     } else if (vendor === 'Amazon') {
//         return 'Amazon Device';
//     } else if (vendor === 'VMware') {
//         return 'Virtual Machine';
//     }
    
//     return 'Unknown Device';
// }

// // Log scan results to a file
// function logScanResults(devices) {
//     const logPath = path.join(__dirname, 'scan-log.json');
//     let history = [];
    
//     // Try to read existing log file
//     try {
//         if (fs.existsSync(logPath)) {
//             const logContent = fs.readFileSync(logPath, 'utf8');
//             history = JSON.parse(logContent);
//         }
//     } catch (error) {
//         console.error(`Error reading log file: ${error.message}`);
//     }
    
//     // Add new scan to history
//     const newScan = {
//         timestamp: new Date().toISOString(),
//         deviceCount: devices.length,
//         devices: devices
//     };
    
//     // Keep only the last 20 scans
//     history.unshift(newScan);
//     if (history.length > 20) {
//         history = history.slice(0, 20);
//     }
    
//     // Write back to file
//     try {
//         fs.writeFileSync(logPath, JSON.stringify(history, null, 2));
//     } catch (error) {
//         console.error(`Error writing to log file: ${error.message}`);
//     }
// }

// module.exports = { scanNetwork };





// Very simple scanner for testing





const os = require('os');

function scanNetwork(callback) {
    console.log('Starting network scan (simple test version)');
    
    try {
        // Get network interfaces
        const interfaces = os.networkInterfaces();
        const devices = [];
        
        console.log('Found network interfaces:', Object.keys(interfaces));
        
        // For testing, just return the local machine
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                // Skip over non-IPv4 addresses
                if (iface.family === 'IPv4') {
                    console.log(`Adding interface: ${name} - ${iface.address}`);
                    devices.push({
                        ip: iface.address,
                        mac: iface.mac || '00:00:00:00:00:00',
                        deviceType: 'This Computer',
                        vendor: 'Local',
                        timestamp: new Date().toISOString()
                    });
                    
                    // If not a local interface, add some test devices
                    if (!iface.internal) {
                        // Add a fake router for testing
                        const networkPrefix = iface.address.substring(0, iface.address.lastIndexOf('.') + 1);
                        
                        devices.push({
                            ip: networkPrefix + '1',
                            mac: '00:11:22:33:44:55',
                            deviceType: 'Router',
                            vendor: 'Generic',
                            timestamp: new Date().toISOString()
                        });
                        
                        // Add another fake device
                        devices.push({
                            ip: networkPrefix + '100',
                            mac: 'AA:BB:CC:DD:EE:FF',
                            deviceType: 'Example Device',
                            vendor: 'Example Inc.',
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            }
        }
        
        console.log(`Found ${devices.length} devices (test data)`);
        callback(null, devices);
    } catch (error) {
        console.error('Error in scanNetwork:', error);
        callback(error);
    }
}

// Export the function
module.exports = { scanNetwork };