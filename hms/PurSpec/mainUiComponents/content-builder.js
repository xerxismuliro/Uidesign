/**
 * Builds all content sections
 */
function buildContentSections() {
    const contentContainer = document.querySelector('.content');
    if (!contentContainer) return;
    
    // Clear existing content
    contentContainer.innerHTML = '';
    
    // Build each section
    buildDefaultSection(contentContainer);
    buildVoiceCommandsSection(contentContainer);
    buildBookmarksSection(contentContainer);
    buildHistorySection(contentContainer);
    buildSettingsSection(contentContainer);
    buildHelpSection(contentContainer);
    buildAccessibilitySection(contentContainer);
    
    // Show default section
    showSection('default');
}

/**
 * Builds the default welcome section
 */
function buildDefaultSection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'default';
    
    section.innerHTML = `
        <h2>Welcome to Voice Web Navigator</h2>
        <p>This application allows you to navigate the web using voice commands. Simply speak the name of a website or select an option from the sidebar.</p>
        <div class="voice-demo">
            <p>Try saying:</p>
            <ul>
                <li>"Go to Wikipedia"</li>
                <li>"Open YouTube"</li>
                <li>"Navigate to Purchase College"</li>
            </ul>
            <button id="quick-start"><i class="fas fa-play"></i> Quick Start</button>
        </div>
    `;
    
    container.appendChild(section);
    
    // Add event listener to quick start button
    const quickStartBtn = section.querySelector('#quick-start');
    if (quickStartBtn) {
        quickStartBtn.addEventListener('click', () => {
            if (typeof startVoiceRecognition === 'function' && 
                typeof recognition !== 'undefined' && 
                !isListening) {
                startVoiceRecognition(recognition);
            }
            showSection("voice-commands");
        });
    }
}

/**
 * Builds the voice commands section
 */
function buildVoiceCommandsSection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'voice-commands';
    
    section.innerHTML = `
        <h2><i class="fas fa-microphone"></i> Voice Commands</h2>
        <p>Use these voice commands to navigate:</p>
        <div class="commands-list">
            <div class="command-item">
                <h3>Navigation</h3>
                <ul>
                    <li>"Go to [website]" - Navigate to a website</li>
                    <li>"Open [website]" - Open a website in a new tab</li>
                    <li>"Back" - Go back to the previous page</li>
                    <li>"Forward" - Go forward to the next page</li>
                    <li>"Refresh" or "Reload" - Reload the current page</li>
                </ul>
            </div>
            <div class="command-item">
                <h3>Controls</h3>
                <ul>
                    <li>"Scroll down/up" - Scroll the page down/up</li>
                    <li>"Stop listening" - Turn off voice recognition</li>
                    <li>"Start listening" - Turn on voice recognition</li>
                    <li>"Dark mode" / "Light mode" - Switch theme</li>
                </ul>
            </div>
        </div>
    `;
    
    container.appendChild(section);
}

/**
 * Builds the bookmarks section
 */
function buildBookmarksSection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'bookmarks';
    
    section.innerHTML = `
        <h2><i class="fas fa-bookmark"></i> Bookmarks</h2>
        <p>Your saved bookmarks:</p>
        <div class="bookmarks-grid">
            <div class="bookmark-item">
                <i class="fab fa-google"></i>
                <span>Google</span>
            </div>
            <div class="bookmark-item">
                <i class="fab fa-youtube"></i>
                <span>YouTube</span>
            </div>
            <div class="bookmark-item">
                <i class="fab fa-wikipedia-w"></i>
                <span>Wikipedia</span>
            </div>
            <div class="bookmark-item">
                <i class="fas fa-university"></i>
                <span>Purchase College</span>
            </div>
            <div class="bookmark-item add-bookmark">
                <i class="fas fa-plus"></i>
                <span>Add Bookmark</span>
            </div>
        </div>
    `;
    
    container.appendChild(section);
    
    // Add event listeners for bookmark items
    const bookmarkItems = section.querySelectorAll('.bookmark-item:not(.add-bookmark)');
    bookmarkItems.forEach(item => {
        item.addEventListener('click', function() {
            const siteName = this.querySelector('span').textContent;
            if (typeof navigateToWebsite === 'function') {
                navigateToWebsite(siteName);
            }
        });
    });
    
    // Add event listener for "Add Bookmark" button
    const addBookmarkBtn = section.querySelector('.add-bookmark');
    if (addBookmarkBtn) {
        addBookmarkBtn.addEventListener('click', function() {
            // Handle adding a new bookmark
            if (typeof addBookmark === 'function') {
                addBookmark();
            }
        });
    }
}

/**
 * Builds the history section
 */
function buildHistorySection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'history';
    
    section.innerHTML = `
        <h2><i class="fas fa-history"></i> History</h2>
        <p>Your browsing history:</p>
        <ul class="history-list">
            <li>
                <i class="fas fa-globe"></i>
                <span>Purchase College - 5 minutes ago</span>
            </li>
            <li>
                <i class="fab fa-wikipedia-w"></i>
                <span>Wikipedia - 20 minutes ago</span>
            </li>
            <li>
                <i class="fab fa-google"></i>
                <span>Google Search - 35 minutes ago</span>
            </li>
            <li>
                <i class="fab fa-youtube"></i>
                <span>YouTube - 1 hour ago</span>
            </li>
        </ul>
        <button class="clear-history"><i class="fas fa-trash"></i> Clear History</button>
    `;
    
    container.appendChild(section);
    
    // Add event listener for clear history button
    const clearHistoryBtn = section.querySelector('.clear-history');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            // Clear history functionality
            if (typeof clearHistory === 'function') {
                clearHistory();
            }
        });
    }
    
    // Add event listeners for history items
    const historyItems = section.querySelectorAll('.history-list li');
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            const siteText = this.querySelector('span').textContent;
            const siteName = siteText.split(' - ')[0]; // Extract site name
            if (typeof navigateToWebsite === 'function') {
                navigateToWebsite(siteName);
            }
        });
    });
}

/**
 * Builds the settings section
 */
function buildSettingsSection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'settings';
    
    section.innerHTML = `
        <h2><i class="fas fa-cog"></i> Settings</h2>
        <div class="settings-section">
            <h3>Voice Recognition</h3>
            <div class="setting-item">
                <label for="voice-lang">Language:</label>
                <select id="voice-lang">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                </select>
            </div>
            <div class="setting-item">
                <label for="voice-sensitivity">Sensitivity:</label>
                <input type="range" id="voice-sensitivity" min="1" max="10" value="5">
            </div>
            <div class="setting-item">
                <label>Auto-start listening:</label>
                <label class="switch">
                    <input type="checkbox" id="auto-start">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="settings-section">
            <h3>Display</h3>
            <div class="setting-item">
                <label for="font-size">Font Size:</label>
                <select id="font-size">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                </select>
            </div>
            <div class="setting-item">
                <label>High Contrast Mode:</label>
                <label class="switch">
                    <input type="checkbox" id="high-contrast">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    `;
    
    container.appendChild(section);
    
    // Add event listeners for settings controls
    const fontSizeSelect = section.querySelector('#font-size');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', function() {
            document.body.setAttribute('data-font-size', this.value);
            if (typeof saveSettings === 'function') {
                saveSettings('fontSize', this.value);
            }
        });
    }
    
    const highContrastToggle = section.querySelector('#high-contrast');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
            if (typeof saveSettings === 'function') {
                saveSettings('highContrast', this.checked);
            }
        });
    }
}

/**
 * Builds the help section
 */
function buildHelpSection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'help';
    
    section.innerHTML = `
        <h2><i class="fas fa-question-circle"></i> Help</h2>
        <div class="help-section">
            <h3>Frequently Asked Questions</h3>
            <div class="faq-item">
                <h4>How do I start voice navigation?</h4>
                <p>Click the "Start Listening" button in the sidebar or say "Start listening" if voice recognition is already active.</p>
            </div>
            <div class="faq-item">
                <h4>Which browsers are supported?</h4>
                <p>This application works best in Chrome, Edge, and Safari browsers that support the Web Speech API.</p>
            </div>
            <div class="faq-item">
                <h4>Can I use this offline?</h4>
                <p>Voice recognition requires an internet connection to function properly.</p>
            </div>
            <div class="faq-item">
                <h4>How do I add custom voice commands?</h4>
                <p>You can add custom commands in the Settings > Voice Commands section.</p>
            </div>
        </div>
        <button class="help-button"><i class="fas fa-envelope"></i> Contact Support</button>
    `;
    
    container.appendChild(section);
    
    // Add event listener for contact support button
    const contactBtn = section.querySelector('.help-button');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.open('mailto:support@example.com?subject=Voice Web Navigator Support', '_blank');
        });
    }
}

/**
 * Builds the accessibility section
 */
function buildAccessibilitySection(container) {
    const section = document.createElement('div');
    section.className = 'content-section';
    section.id = 'accessibility';
    
    section.innerHTML = `
        <h2><i class="fas fa-universal-access"></i> Accessibility</h2>
        <p>Voice Web Navigator is designed to be accessible to all users:</p>
        <div class="accessibility-features">
            <div class="feature">
                <i class="fas fa-volume-up"></i>
                <h3>Screen Reader Support</h3>
                <p>Compatible with popular screen readers like NVDA, JAWS, and VoiceOver.</p>
            </div>
            <div class="feature">
                <i class="fas fa-keyboard"></i>
                <h3>Keyboard Navigation</h3>
                <p>All functions can be accessed via keyboard shortcuts.</p>
            </div>
            <div class="feature">
                <i class="fas fa-font"></i>
                <h3>Text Scaling</h3>
                <p>Text can be resized without breaking the layout.</p>
            </div>
            <div class="feature">
                <i class="fas fa-adjust"></i>
                <h3>Color Contrast</h3>
                <p>High contrast mode available for users with visual impairments.</p>
            </div>
        </div>
    `;
    
    container.appendChild(section);
}

/**
 * Handles showing a specific content section
 */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Highlight the active sidebar item
    const sidebarItems = document.querySelectorAll('.sidebar-item a');
    sidebarItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-content') === sectionId) {
            item.classList.add('active');
        }
    });
}

// Initialize content sections when the DOM is loaded
document.addEventListener('DOMContentLoaded', buildContentSections);