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



$("document").ready(function () {

  $("#Events-saved-via-Browser").css({
    "border-color": "#2a5dbd",
    "border-style": "solid",
    "border-width": "1px"
  });

});



document.addEventListener('DOMContentLoaded', function () {

  const hamburgerMenu = document.getElementById('hamburger-menu');
  const leftSidebar = document.querySelector('.leftSidebarDiv');
  const overlay = document.querySelector('.sidebar-overlay');
  const menuItems = document.querySelectorAll('.section div');
  const mobileSearchContainer = document.getElementById('mobile-search-container');
  const mobileSearchBox = document.getElementById('mobileSearchBox');
  const browserEventsButton = document.getElementById('Events-saved-via-Browser');


  hamburgerMenu.addEventListener('click', function () {
    leftSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });


  overlay.addEventListener('click', function () {
    leftSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });


  menuItems.forEach((item) => {
    item.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');


      document.querySelectorAll('.contentDiv').forEach((div) => {
        div.style.display = 'none';
      });


      const targetDiv = document.getElementById(targetId);
      if (targetDiv) {
        targetDiv.style.display = 'block';


        if (targetId === 'browserEventsContent') {
          mobileSearchContainer.style.display = 'block';
        } else {
          mobileSearchContainer.style.display = 'none';
        }
      }


      if (window.innerWidth <= 768) {
        leftSidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  });


  browserEventsButton.addEventListener('click', function () {

    document.querySelectorAll('.contentDiv').forEach((div) => {
      div.style.display = 'none';
    });


    const browserEventsContent = document.getElementById('browserEventsContent');
    if (browserEventsContent) {
      browserEventsContent.style.display = 'block';


      if (window.innerWidth <= 768) {
        mobileSearchContainer.style.display = 'block';
      }
    }
  });


  if (mobileSearchBox) {
    mobileSearchBox.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      const todoItems = document.querySelectorAll('#browserTodoTableBody tr');

      todoItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }


  window.addEventListener('resize', function () {

    const browserEventsContent = document.getElementById('browserEventsContent');

    if (window.innerWidth <= 768 && browserEventsContent &&
    browserEventsContent.style.display === 'block') {
      mobileSearchContainer.style.display = 'block';
    } else if (window.innerWidth > 768) {
      mobileSearchContainer.style.display = 'none';
    }


    if (window.innerWidth > 768) {
      leftSidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }); 
  function updateMobileSearchVisibility() {
    const browserEventsContent = document.getElementById('browserEventsContent');

    if (window.innerWidth <= 768 && browserEventsContent &&
    browserEventsContent.style.display === 'block') {
      mobileSearchContainer.style.display = 'block';
    } else {
      mobileSearchContainer.style.display = 'none';
    }
  }


  updateMobileSearchVisibility();
}); 

function showDefaultContent() {
  let anyContentVisible = false;
  document.querySelectorAll('.contentDiv').forEach((div) => {
    if (div.style.display === 'block') {
      anyContentVisible = true;
    }
  });

  if (!anyContentVisible) {
    const browserEvents = document.getElementById('browserEventsContent');
    if (browserEvents) {
      browserEvents.style.display = 'block';


      const mobileSearchContainer = document.getElementById('mobile-search-container');
      if (window.innerWidth <= 768 && mobileSearchContainer) {
        mobileSearchContainer.style.display = 'block';
      }
    }
  }
}


setTimeout(showDefaultContent, 100);