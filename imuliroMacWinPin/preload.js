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



const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});


contextBridge.exposeInMainWorld('electronAPI', {
  pinWindow: () => {
    console.log('Sending pin-window IPC message');
    ipcRenderer.send('pin-window');
  },
  onPinWindowReply: (callback) => {
    ipcRenderer.on('pin-window-reply', (event, data) => {
      console.log('Received pin-window-reply IPC message');
      callback(data);
    });
  }
});