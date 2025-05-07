// // automatically adjust the height of the textarea for the Event post input
// var textarea = document.getElementById('eventDescription');
// var maxHeight = 300; // adjust as needed
// textarea.addEventListener('eventDescription', function() {
//     this.style.height = 'auto'; // temporarily shrink textarea to get the correct scrollHeight
//     var scrollHeight = this.scrollHeight < maxHeight ? this.scrollHeight : maxHeight;
//     this.style.height = scrollHeight + 'px';
//     if (this.value === '') {
//         this.style.height = '20px'; // reset to min-height when input is cleared
//     }
// });