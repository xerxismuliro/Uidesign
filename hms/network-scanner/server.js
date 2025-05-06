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





const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.get('/api/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ status: 'Server is running correctly' });
});


app.get('/api/scan', (req, res) => {
    console.log('Scan endpoint hit');
    
    
    const devices = [
        {
            ip: '192.168.1.1',
            mac: '00:11:22:33:44:55',
            deviceType: 'Router',
            vendor: 'Generic',
            timestamp: new Date().toISOString()
        },
        {
            ip: '192.168.1.100',
            mac: 'AA:BB:CC:DD:EE:FF',
            deviceType: 'Example Device',
            vendor: 'Example Inc.',
            timestamp: new Date().toISOString()
        },
        {
            ip: '192.168.1.101',
            mac: 'AA:BB:CC:DD:EE:00',
            deviceType: 'Computer',
            vendor: 'Dell Inc.',
            timestamp: new Date().toISOString()
        }
    ];
    
    console.log(`Returning ${devices.length} mock devices`);
    res.json(devices);
});


app.get('/api/history', (req, res) => {
    console.log('History endpoint hit');
    
    const history = [
        {
            timestamp: new Date().toISOString(),
            deviceCount: 3,
            devices: []
        },
        {
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            deviceCount: 2,
            devices: []
        }
    ];
    
    console.log('Returning mock history data');
    res.json(history);
});


app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server running at http:
    console.log('Available endpoints:');
    console.log('  - /api/test');
    console.log('  - /api/scan');
    console.log('  - /api/history');
});