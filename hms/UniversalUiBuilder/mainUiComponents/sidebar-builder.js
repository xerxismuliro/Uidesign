

function buildSidebar() {
  const sidebar = document.querySelector('.left-sidebar');
  if (!sidebar) return;


  sidebar.innerHTML = '';


  const sidebarItemsContainer = document.createElement('div');
  sidebarItemsContainer.className = 'sidebar-items-container';
  sidebar.appendChild(sidebarItemsContainer);

const sidebarItems = [
  {
    id: 'Home',
    icon: 'fas fa-university',
    text: 'Home',
    iconClass: 'universal-icon1'
  },
  {
    id: 'MyVideos',
    icon: 'fas fa-microphone',
    text: 'My Videos',
    iconClass: 'universal-icon2'
  },
  {
    id: 'Favorites',
    icon: 'fas fa-bookmark',
    text: 'Favorites',
    iconClass: 'universal-icon3'
  },
  {
    id: 'Playlist',
    icon: 'fas fa-history',
    text: 'Playlist',
    iconClass: 'universal-icon4'
  },
  {
    id: 'settings',
    icon: 'fas fa-cog',
    text: 'Settings',
    iconClass: 'universal-icon5'
  },
  {
    id: 'help',
    icon: 'fas fa-question-circle',
    text: 'Help',
    iconClass: 'universal-icon6'
  },
];


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