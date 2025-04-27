// Audio feedback
let audioContext = null;
let audioFeedbackEnabled = true;
let speechSynthesis = window.speechSynthesis;
let spokenFeedbackEnabled = true;
let verbosityLevel = 'medium'; // 'low', 'medium', 'high'

// Queue for managing multiple speech requests
let speechQueue = [];
let isSpeaking = false;

function initAudioFeedback() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        console.log("Audio feedback system initialized");
        return true;
    } catch (e) {
        console.warn("Web Audio API not supported in this browser:", e);
        return false;
    }
}

function initSpeechSynthesis() {
    if (!speechSynthesis) {
        console.warn("Speech synthesis not supported in this browser");
        return false;
    }
    
    // Get available voices and set up event listener for when voices change
    speechSynthesis.onvoiceschanged = loadPreferredVoice;
    loadPreferredVoice();
    
    console.log("Speech synthesis initialized");
    return true;
}

// Load the preferred voice
function loadPreferredVoice() {
    const savedVoice = localStorage.getItem('preferredVoiceIndex');
    if (savedVoice !== null) {
        preferredVoiceIndex = parseInt(savedVoice, 10);
    }
}


function playAudioFeedback(type) {
    if (!audioFeedbackEnabled || !audioContext) return;
    
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'start':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'stop':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'command':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'error':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(207.65, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'success':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
    }
}

// Enhanced speech feedback function with queue management
function speakFeedback(text, priority = false) {
    if (!spokenFeedbackEnabled || !speechSynthesis) return;
    
    // Skip very short messages if verbosity is low
    if (verbosityLevel === 'low' && text.length < 5 && !priority) return;
    
    // For lowest priority items, only speak them in high verbosity mode
    if (arguments.length > 2 && arguments[2] === 'low' && verbosityLevel !== 'high') return;
    
    // If this is a priority message, cancel everything else
    if (priority) {
        speechSynthesis.cancel();
        speechQueue = [];
        isSpeaking = false;
    }
    
    // Add to queue with priority flag
    speechQueue.push({
        text: text,
        priority: priority
    });
    
    // Start processing queue if not already speaking
    if (!isSpeaking) {
        processSpeechQueue();
    }
}



function setupAudioFeedbackToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection || document.getElementById('audio-feedback-toggle')) return;
    
    const audioFeedbackToggle = document.createElement('div');
    audioFeedbackToggle.className = 'settings-item';
    audioFeedbackToggle.innerHTML = `
        <div class="setting-label">
            <i class="fas fa-volume-up"></i>
            <span>Audio Feedback for Voice Commands</span>
        </div>
        <div class="setting-control">
            <label class="switch">
                <input type="checkbox" id="audio-feedback-toggle" ${audioFeedbackEnabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
    `;
    
    const voiceSection = settingsSection.querySelector('.settings-section[data-section="voice"]');
    if (voiceSection) {
        voiceSection.appendChild(audioFeedbackToggle);
    } else {
        const newSection = document.createElement('div');
        newSection.className = 'settings-section';
        newSection.setAttribute('data-section', 'voice');
        
        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = 'Voice Recognition';
        
        newSection.appendChild(sectionHeader);
        newSection.appendChild(audioFeedbackToggle);
        settingsSection.appendChild(newSection);
    }
    
    document.getElementById('audio-feedback-toggle').addEventListener('change', function(e) {
        audioFeedbackEnabled = e.target.checked;
        localStorage.setItem('audioFeedbackEnabled', audioFeedbackEnabled);
        
        if (audioFeedbackEnabled) {
            playAudioFeedback('start');
        }
    });
}

function setupSpokenFeedbackToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection || document.getElementById('spoken-feedback-toggle')) return;
    
    const spokenFeedbackToggle = document.createElement('div');
    spokenFeedbackToggle.className = 'settings-item';
    spokenFeedbackToggle.innerHTML = `
        <div class="setting-label">
            <i class="fas fa-comment-alt"></i>
            <span>Speak Actions Aloud</span>
        </div>
        <div class="setting-control">
            <label class="switch">
                <input type="checkbox" id="spoken-feedback-toggle" ${spokenFeedbackEnabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
    `;
    
    const voiceSection = settingsSection.querySelector('.settings-section[data-section="voice"]');
    if (voiceSection) {
        voiceSection.appendChild(spokenFeedbackToggle);
    } else {
        console.warn("Voice section not found in settings");
    }
    
    document.getElementById('spoken-feedback-toggle').addEventListener('change', function(e) {
        spokenFeedbackEnabled = e.target.checked;
        localStorage.setItem('spokenFeedbackEnabled', spokenFeedbackEnabled);
        
        if (spokenFeedbackEnabled) {
            speakFeedback("Voice feedback is now enabled.");
        }
    });
}


// Process speech queue
function processSpeechQueue() {
    if (speechQueue.length === 0 || isSpeaking) {
        isSpeaking = false;
        return;
    }
    
    isSpeaking = true;
    const nextSpeech = speechQueue.shift();
    
    const utterance = new SpeechSynthesisUtterance(nextSpeech.text);
    
    // Configure voice properties
    utterance.volume = 0.8;  
    utterance.rate = 1.1;    
    utterance.pitch = 1;     
    
    // Get voices again in case they've loaded since init
    const voices = speechSynthesis.getVoices();
    
    // Try to use a natural-sounding voice
    const preferredVoices = voices.filter(voice => 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google') ||
        voice.name.includes('Natural') ||
        (voice.name.includes('US') && voice.name.includes('English'))
    );
    
    if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
    }
    
    // When speech ends, process next item in queue
    utterance.onend = function() {
        isSpeaking = false;
        processSpeechQueue();
    };
    
    // Handle errors in speech synthesis
    utterance.onerror = function(event) {
        console.error("Speech synthesis error:", event);
        isSpeaking = false;
        processSpeechQueue();
    };
    
    speechSynthesis.speak(utterance);
}

// Add setup for speech verbosity level in settings
function setupVerbosityLevelToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection) return;
    
    // Check if control already exists
    if (document.getElementById('verbosity-level')) return;
    
    // Create the verbosity level control
    const verbosityControl = document.createElement('div');
    verbosityControl.className = 'settings-item';
    verbosityControl.innerHTML = `
        <div class="setting-label">
            <i class="fas fa-comments"></i>
            <span>Speech Feedback Verbosity</span>
        </div>
        <div class="setting-control">
            <select id="verbosity-level" class="settings-select">
                <option value="low" ${verbosityLevel === 'low' ? 'selected' : ''}>Minimal (major actions only)</option>
                <option value="medium" ${verbosityLevel === 'medium' ? 'selected' : ''}>Medium (important actions)</option>
                <option value="high" ${verbosityLevel === 'high' ? 'selected' : ''}>High (all actions)</option>
            </select>
        </div>
    `;
    
    // Find voice section to insert into
    const voiceSection = settingsSection.querySelector('.settings-section[data-section="voice"]');
    if (voiceSection) {
        voiceSection.appendChild(verbosityControl);
    } else {
        console.warn("Voice section not found in settings");
    }
    
    // Add event listener
    document.getElementById('verbosity-level').addEventListener('change', function(e) {
        verbosityLevel = e.target.value;
        localStorage.setItem('verbosityLevel', verbosityLevel);
        
        // Say a test message with new verbosity
        if (spokenFeedbackEnabled) {
            speakFeedback(`Speech verbosity set to ${verbosityLevel} level`);
        }
    });
}

// When loading preferences, also load verbosity setting
function loadAudioPreferences() {
    const savedPref = localStorage.getItem('audioFeedbackEnabled');
    if (savedPref !== null) {
        audioFeedbackEnabled = savedPref === 'true';
    }
    
    const savedSpokenPref = localStorage.getItem('spokenFeedbackEnabled');
    if (savedSpokenPref !== null) {
        spokenFeedbackEnabled = savedSpokenPref === 'true';
    }
    
    const savedVerbosity = localStorage.getItem('verbosityLevel');
    if (savedVerbosity !== null) {
        verbosityLevel = savedVerbosity;
    }
}

// Add these action feedback functions for various user interactions

// Track mouse movements and announce focused elements (for high verbosity only)
function setupElementFocusFeedback() {
    if (!spokenFeedbackEnabled || verbosityLevel !== 'high') return;
    
    let lastFocusedElement = null;
    let focusDebounceTimer = null;
    
    document.addEventListener('mousemove', function(e) {
        clearTimeout(focusDebounceTimer);
        focusDebounceTimer = setTimeout(() => {
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element && element !== lastFocusedElement) {
                lastFocusedElement = element;
                
                // Determine what kind of element this is
                if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                    const text = element.textContent?.trim() || 'unnamed button';
                    speakFeedback(`Hovering over ${element.tagName === 'A' ? 'link' : 'button'}: ${text}`, false, 'low');
                } else if (element.tagName === 'INPUT') {
                    const label = element.getAttribute('aria-label') || element.getAttribute('placeholder') || 'input field';
                    speakFeedback(`Hovering over ${label}`, false, 'low');
                }
            }
        }, 1000); // 1 second debounce to avoid constant speaking
    });
}

// Navigation feedback
function announcePageChange(pageName) {
    if (!spokenFeedbackEnabled) return;
    
    // Medium and high verbosity levels get page changes
    if (verbosityLevel !== 'low') {
        speakFeedback(`Page changed to ${pageName}`);
    }
}

// Form interaction feedback
function setupFormInteractionFeedback() {
    document.addEventListener('focus', function(e) {
        if (!spokenFeedbackEnabled) return;
        
        const target = e.target;
        
        // For high verbosity, announce focus events
        if (verbosityLevel === 'high' && 
           (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {
            const label = target.getAttribute('aria-label') || 
                          target.getAttribute('placeholder') || 
                          target.getAttribute('name') || 
                          'form field';
            speakFeedback(`Focused on ${label}`, false, 'low');
        }
    }, true);
    
    document.addEventListener('change', function(e) {
        if (!spokenFeedbackEnabled) return;
        
        const target = e.target;
        
        // For medium and high verbosity, announce changes
        if (verbosityLevel !== 'low' && 
           (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {
            
            if (target.type === 'checkbox') {
                speakFeedback(`${target.checked ? 'Checked' : 'Unchecked'} ${target.getAttribute('aria-label') || 'checkbox'}`);
            } else if (target.type === 'radio') {
                speakFeedback(`Selected ${target.value}`);
            } else if (target.tagName === 'SELECT') {
                speakFeedback(`Selected ${target.options[target.selectedIndex].text}`);
            }
        }
    });
    
    document.addEventListener('submit', function(e) {
        if (!spokenFeedbackEnabled) return;
        speakFeedback(`Form submitted`);
    });
}

// Button click feedback
function setupButtonFeedback() {
    document.addEventListener('click', function(e) {
        if (!spokenFeedbackEnabled) return;
        
        // Only for medium and high verbosity
        if (verbosityLevel === 'low') return;
        
        const target = e.target.closest('button, a, [role="button"]');
        if (target) {
            const text = target.textContent?.trim() || 'button';
            // For important actions, always announce; for others only in high verbosity
            const isImportant = target.classList.contains('primary-btn') || 
                              target.getAttribute('aria-label')?.includes('submit') ||
                              text.toLowerCase().includes('submit') ||
                              text.toLowerCase().includes('save');
            
            if (isImportant || verbosityLevel === 'high') {
                speakFeedback(`Clicked ${text}`);
            }
        }
    });
}

// Modal dialog feedback
function announceModalOpen(modalTitle) {
    if (!spokenFeedbackEnabled) return;
    speakFeedback(`Dialog opened: ${modalTitle}`);
}

function announceModalClose() {
    if (!spokenFeedbackEnabled || verbosityLevel === 'low') return;
    speakFeedback(`Dialog closed`);
}

// Setup all the action listeners when initializing
function initActionFeedback() {
    setupElementFocusFeedback();
    setupFormInteractionFeedback();
    setupButtonFeedback();
    
    // MutationObserver for detecting DOM changes and announcements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // For new nodes that might be alerts or notifications
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Alert notifications
                        if (node.classList && 
                            (node.classList.contains('alert') || 
                             node.classList.contains('notification') || 
                             node.classList.contains('toast'))) {
                            const text = node.textContent.trim();
                            speakFeedback(text);
                        }
                        
                        // Modal dialogs
                        if (node.classList && node.classList.contains('modal') && 
                            (node.getAttribute('aria-hidden') === 'false' || 
                             getComputedStyle(node).display !== 'none')) {
                            const title = node.querySelector('.modal-title, h1, h2, h3')?.textContent || 'Dialog';
                            announceModalOpen(title);
                        }
                    }
                });
            }
            
            // For attribute changes that might indicate state changes
            if (mutation.type === 'attributes') {
                const target = mutation.target;
                
                // Modal closing
                if (target.classList && target.classList.contains('modal') && 
                    (mutation.attributeName === 'aria-hidden' || mutation.attributeName === 'style')) {
                    if (target.getAttribute('aria-hidden') === 'true' || 
                        getComputedStyle(target).display === 'none') {
                        announceModalClose();
                    }
                }
                
                // Toggle state changes
                if (target.tagName === 'INPUT' && target.type === 'checkbox' && mutation.attributeName === 'checked') {
                    if (verbosityLevel !== 'low') {
                        speakFeedback(`${target.checked ? 'Enabled' : 'Disabled'} ${target.getAttribute('aria-label') || 'option'}`);
                    }
                }
            }
        });
    });
    
    // Start observing the document
    observer.observe(document.body, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-hidden', 'style', 'checked', 'class']
    });
}

// Export functions that need to be called from other modules
window.speakFeedback = speakFeedback;
window.announcePageChange = announcePageChange;
window.announceModalOpen = announceModalOpen;
window.announceModalClose = announceModalClose;
window.initActionFeedback = initActionFeedback;