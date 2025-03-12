
$("document").ready(function() {

$("#Events-saved-via-Browser").css({
    "border-color": "#2a5dbd",
    "border-style": "solid",
    "border-width": "1px",
});

});




// document.addEventListener('DOMContentLoaded', function() {
//     const clickableDivs = document.querySelectorAll('[data-target]');
//     const contentDivs = document.querySelectorAll('.contentDiv');

//     clickableDivs.forEach(div => {
//         div.addEventListener('click', function() {
//             const targetId = this.getAttribute('data-target');

//             contentDivs.forEach(contentDiv => {
//                 if (contentDiv.id === targetId) {
//                     contentDiv.style.display = 'block';
//                 } else {
//                     contentDiv.style.display = 'none';
//                 }
//             });
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const clickableDivs = document.querySelectorAll('[data-target]');
    const contentDivs = document.querySelectorAll('.contentDiv');
    const defaultTargetId = 'browserEventsContent';

    // Function to show the default content
    function showDefaultContent() {
        contentDivs.forEach(contentDiv => {
            if (contentDiv.id === defaultTargetId) {
                contentDiv.style.display = 'block';
            } else {
                contentDiv.style.display = 'none';
            }
        });
    }

    // Show the default content on page load
    showDefaultContent();

    clickableDivs.forEach(div => {
        div.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            contentDivs.forEach(contentDiv => {
                if (contentDiv.id === targetId) {
                    contentDiv.style.display = 'block';
                } else {
                    contentDiv.style.display = 'none';
                }
            });
        });
    });
});