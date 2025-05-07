
// document.getElementById('pinWindowButton').addEventListener('click', () => {
//   console.log('Pin Window button clicked');
//   // Focus the Electron window
//   window.focus();
//   // Send the pin window command
//   window.electronAPI.pinWindow();
//   console.log('Pin Window command sent');
// });

// document.getElementById('unpinWindowButton').addEventListener('click', () => {
//   console.log('Unpin Window button clicked');
//   // Focus the Electron window
//   window.focus();
//   // Send the unpin window command
//   window.electronAPI.unpinWindow();
//   console.log('Unpin Window command sent');
// });

// window.electronAPI.onPinWindowReply((data) => {
//   console.log('Received pin window reply');
//   const contentDiv = document.querySelector('.contentDiv');
//   console.log('Updating contentDiv with data:', data);
//   contentDiv.textContent = data;
// });




document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded');
  window.electronAPI.onPinWindowReply((data) => {
    console.log('Received pin window reply');
    const contentDiv = document.querySelector('.contentDiv');
    console.log('Updating contentDiv with data:', data);
    contentDiv.textContent += data + '\n'; // Append the data to the contentDiv
  });
});

document.getElementById('pinWindowButton').addEventListener('click', () => {
  console.log('Pin Window button clicked');
  // Focus the Electron window
  window.focus();
  // Send the pin window command
  window.electronAPI.pinWindow();
  console.log('Pin Window command sent');
});