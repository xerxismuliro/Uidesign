/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from scratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */

function buildContentSections() {
  const contentContainer = document.querySelector('.content');
  if (!contentContainer) return;

  contentContainer.innerHTML = '';

  buildHomeSection(contentContainer);
  buildMyVideosSection(contentContainer);
  buildFavoritesSection(contentContainer);
  buildPlaylistSection(contentContainer);
  buildSettingsSection(contentContainer);
  buildHelpSection(contentContainer);

  showSection('Home');
}

function buildHomeSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'Home';

  section.innerHTML = `
    <div class="video-player-container">
      <h3>Demo Video on how the Purchase college Voice navigation works</h3>
      <div class="featured-video">
        <video id="videoPlayer" controls>
          <source src="vids/imulirosamplevid.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="video-info">
          <h3 id="video-title">Isaac Muliro's Sample Video</h3>
          <div class="video-controls">
            <button id="play-btn" class="control-btn"><i class="fas fa-play"></i></button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);

  setupSimpleVideoPlayer(section);
}

function buildMyVideosSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'MyVideos';

  section.innerHTML = `
    <h2><i class="fas fa-microphone"></i> My Videos</h2>
    <div class="empty-state">
      <i class="fas fa-film"></i>
      <p>No videos available. Add videos to see them here.</p>
    </div>
  `;

  container.appendChild(section);
}

function buildFavoritesSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'Favorites';

  section.innerHTML = `
    <h2><i class="fas fa-bookmark"></i> Favorites</h2>
    <div class="empty-state">
      <i class="fas fa-heart"></i>
      <p>No favorites yet. Mark videos as favorites to see them here.</p>
    </div>
  `;

  container.appendChild(section);
}

function buildPlaylistSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'Playlist';

  section.innerHTML = `
    <h2><i class="fas fa-history"></i> Playlists</h2>
    <div class="empty-state">
      <i class="fas fa-list"></i>
      <p>No playlists created. Create a playlist to organize your videos.</p>
    </div>
    <button class="create-playlist"><i class="fas fa-plus"></i> Create Playlist</button>
  `;

  container.appendChild(section);
}

function buildSettingsSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'settings';

  section.innerHTML = `
    <h2><i class="fas fa-cog"></i> Settings</h2>
    <div class="settings-section">
      <h3>Playback Settings</h3>
      <div class="setting-item">
        <label for="autoplay">Autoplay:</label>
        <label class="switch">
          <input type="checkbox" id="autoplay" checked>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="setting-item">
        <label for="video-quality">Default Quality:</label>
        <select id="video-quality">
          <option value="auto">Auto</option>
          <option value="1080p">1080p</option>
          <option value="720p" selected>720p</option>
          <option value="480p">480p</option>
          <option value="360p">360p</option>
        </select>
      </div>
    </div>
  `;

  container.appendChild(section);
}

function buildHelpSection(container) {
  const section = document.createElement('div');
  section.className = 'content-section';
  section.id = 'help';

  section.innerHTML = `
    <h2><i class="fas fa-question-circle"></i> Help</h2>
    <div class="help-section">
      <h3>Video Player Help</h3>
      <div class="faq-item">
        <h4>How do I play the video?</h4>
        <p>Click the play button in the video player on the home page.</p>
      </div>
      <div class="faq-item">
        <h4>How do I change video quality?</h4>
        <p>Go to Settings and select your preferred quality from the dropdown menu.</p>
      </div>
    </div>
    <button class="help-button"><i class="fas fa-envelope"></i> Contact Support</button>
  `;

  container.appendChild(section);

  const contactBtn = section.querySelector('.help-button');
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      window.open('mailto:support@example.com?subject=Video Player Support', '_blank');
    });
  }
}

function setupSimpleVideoPlayer(container) {
  const videoPlayer = container.querySelector('#videoPlayer');
  const playBtn = container.querySelector('#play-btn');
  
  // Play button functionality
  playBtn.addEventListener('click', function() {
    if (videoPlayer.paused) {
      videoPlayer.play();
      this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      this.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
  
  // Update play/pause button based on video state
  videoPlayer.addEventListener('play', function() {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });
  
  videoPlayer.addEventListener('pause', function() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
  
  videoPlayer.addEventListener('ended', function() {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach((section) => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  const sidebarItems = document.querySelectorAll('.sidebar-item a');
  sidebarItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('data-content') === sectionId) {
      item.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', buildContentSections);