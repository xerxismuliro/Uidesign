const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Very simple test endpoint
app.get('/api/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ status: 'Server is running correctly' });
});

// Very simple scan endpoint with mock data
app.get('/api/scan', (req, res) => {
    console.log('Scan endpoint hit');
    
    // Generate some mock data
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

// Very simple history endpoint with mock data
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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Available endpoints:');
    console.log('  - /api/test');
    console.log('  - /api/scan');
    console.log('  - /api/history');
});