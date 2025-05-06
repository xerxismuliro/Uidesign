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



function buildSidebar() {
  const sidebar = document.querySelector('.left-sidebar');
  if (!sidebar) return;


  sidebar.innerHTML = '';


  const sidebarItemsContainer = document.createElement('div');
  sidebarItemsContainer.className = 'sidebar-items-container';
  sidebar.appendChild(sidebarItemsContainer);


  const sidebarItems = [
  {
    id: 'purchase-links',
    icon: 'fas fa-university',
    text: 'Purchase College',
    iconClass: 'icon-purchase'
  },
  {
    id: 'voice-commands',
    icon: 'fas fa-microphone',
    text: 'Voice Commands',
    iconClass: 'icon-voice'
  },
  {
    id: 'bookmarks',
    icon: 'fas fa-bookmark',
    text: 'Bookmarks',
    iconClass: 'icon-bookmarks'
  },
  {
    id: 'history',
    icon: 'fas fa-history',
    text: 'History',
    iconClass: 'icon-history'
  },
  {
    id: 'settings',
    icon: 'fas fa-cog',
    text: 'Settings',
    iconClass: 'icon-settings'
  },
  {
    id: 'help',
    icon: 'fas fa-question-circle',
    text: 'Help',
    iconClass: 'icon-help'
  },
  {
    id: 'accessibility',
    icon: 'fas fa-universal-access',
    text: 'Accessibility',
    iconClass: 'icon-accessibility'
  }];



  sidebarItems.forEach((item) => {
    const sidebarItem = document.createElement('div');
    sidebarItem.className = 'sidebar-item';

    sidebarItem.innerHTML = `
            <a href="#" class="content-trigger" data-content="${item.id}">
                <div class="icon-container ${item.iconClass}">
                    <i class="${item.icon}"></i>
                </div>
                <span>${item.text}</span>
            </a>
        `;

    sidebarItemsContainer.appendChild(sidebarItem);
  });


  addCreditsFooter(sidebar);


  attachSidebarEventListeners();
} function addCreditsFooter(sidebar) {
  const creditsFooter = document.createElement('div');
  creditsFooter.className = 'sidebar-credits';


  const currentYear = new Date().getFullYear();

  creditsFooter.innerHTML = `
        <div class="credits-content">
            <p>Developed by</p>
            <p class="developer-name">Isaac Muliro</p>
            <p class="copyright">&copy; ${currentYear}</p>
        </div>
    `;

  sidebar.appendChild(creditsFooter);
} 
function attachSidebarEventListeners() {
  const contentTriggers = document.querySelectorAll('.content-trigger');

  contentTriggers.forEach((trigger) => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const contentId = this.getAttribute('data-content');
      showSection(contentId);
    });
  });
}


document.addEventListener('DOMContentLoaded', buildSidebar);