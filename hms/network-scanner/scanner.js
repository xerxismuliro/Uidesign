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



const os = require('os'); function scanNetwork(callback) {console.log('Starting network scan (simple test version)');

  try {

    const interfaces = os.networkInterfaces();
    const devices = [];

    console.log('Found network interfaces:', Object.keys(interfaces));


    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {

        if (iface.family === 'IPv4') {
          console.log(`Adding interface: ${name} - ${iface.address}`);
          devices.push({
            ip: iface.address,
            mac: iface.mac || '00:00:00:00:00:00',
            deviceType: 'This Computer',
            vendor: 'Local',
            timestamp: new Date().toISOString()
          });


          if (!iface.internal) {

            const networkPrefix = iface.address.substring(0, iface.address.lastIndexOf('.') + 1);

            devices.push({
              ip: networkPrefix + '1',
              mac: '00:11:22:33:44:55',
              deviceType: 'Router',
              vendor: 'Generic',
              timestamp: new Date().toISOString()
            });


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


module.exports = { scanNetwork };