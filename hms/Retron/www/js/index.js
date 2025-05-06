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



document.addEventListener('deviceready', onDeviceReady, false); function onDeviceReady() {


  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  document.getElementById('deviceready').classList.add('ready');
}