// Core state variables
let isListening = false;
let isPaused = false;
let visualizerInterval = null;
let recognition = null;

// Main initialization function
function initializeVoiceRecognition() {
    const voiceControlContainer = document.querySelector('.voice-control');
    const voiceStatus = document.getElementById('voice-status');
    
    // Initialize audio and speech feedback
    initAudioFeedback();
    initSpeechSynthesis();
    loadAudioPreferences();
    
    // Create UI elements
    createVoiceControlUI(voiceControlContainer);
    
    // Check browser support
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        handleUnsupportedVoiceRecognition(voiceControlContainer, voiceStatus);
        return;
    }

    recognition = setupRecognitionObject(voiceStatus);
    setupVoiceControlListeners(recognition, voiceControlContainer);
    setupAudioFeedbackToggle();
    setupSpokenFeedbackToggle();
    setupVerbosityLevelToggle(); // Add the new verbosity control
    
    // Initialize the action feedback system for comprehensive spoken feedback
    initActionFeedback();
    
    // Announce that the voice system is ready
    setTimeout(() => {
        if (typeof speakFeedback === 'function') {
            speakFeedback("Voice recognition system initialized and ready");
        }
    }, 1000); // Short delay to allow voices to load
}

function setupRecognitionObject(voiceStatus) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    
    // Add language detection or selection if available
    const userLanguage = navigator.language || navigator.userLanguage || 'en-US';
    recognition.lang = userLanguage;
    
    // Consider adding a language selector in settings
    const savedLanguage = localStorage.getItem('voiceRecognitionLanguage');
    if (savedLanguage) {
        recognition.lang = savedLanguage;
    }

    recognition.onstart = function () {
        isListening = true;
        updateVoiceUIState('listening');
        
        // Track recognition sessions for analytics
        if (typeof window.trackVoiceUsage === 'function') {
            window.trackVoiceUsage('start_listening');
        }
    };

    recognition.onend = function () {
        if (!isPaused) {
            isListening = false;
            updateVoiceUIState('inactive');
        }
        
        // If we're supposed to be listening but recognition stopped,
        // it might be due to a timeout, so restart it
        if (isListening && !isPaused) {
            console.log("Recognition ended unexpectedly, restarting...");
            recognition.start();
        }
    };

    recognition.onresult = function (event) {
        playAudioFeedback('command');
        
        // Extract and display the command for user confirmation
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        
        // Update the voice status to show what was heard
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Heard: "${command}"</span>`;
        }
        
        // Log commands for potential improvement of recognition
        console.log(`Voice command recognized: "${command}" (confidence: ${event.results[last][0].confidence})`);
        
        // Process the command
        handleVoiceCommand(event, recognition);
    };

    recognition.onerror = function (event) {
        voiceStatus.textContent = "Error: " + event.error;
        voiceStatus.style.color = "red";
        updateVoiceUIState('error');
        playAudioFeedback('error');
        
        // Use the prioritized speech feedback for errors
        if (typeof speakFeedback === 'function') {
            speakFeedback(`Error with voice recognition: ${event.error}`, true);
        }
        
        // Handle specific error types
        if (event.error === 'network') {
            if (typeof speakFeedback === 'function') {
                speakFeedback("Network error. Please check your internet connection.", true);
            }
        }
        else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            if (typeof speakFeedback === 'function') {
                speakFeedback("Microphone access denied. Please enable microphone permissions.", true);
            }
        }
        
        // Track errors for analytics
        if (typeof window.trackVoiceUsage === 'function') {
            window.trackVoiceUsage('error', { type: event.error });
        }
    };

    return recognition;
}

// Control functions
function startVoiceRecognition(recognition) {
    // First check if we have microphone permissions
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                // Permission granted, we can start
                stream.getTracks().forEach(track => track.stop()); // Stop the stream, we just needed to check permission
                
                // Proceed with starting recognition
                doStartRecognition(recognition);
            })
            .catch(function(err) {
                console.error("Microphone permission denied:", err);
                
                // Update UI to show permission issue
                updateVoiceUIState('error');
                
                // Speak the error
                if (typeof speakFeedback === 'function') {
                    speakFeedback("Microphone access denied. Please enable microphone permissions in your browser settings.", true);
                }
                
                // Show a dialog with instructions
                showMicrophonePermissionHelp();
            });
    } else {
        // No mediaDevices support, just try to start
        doStartRecognition(recognition);
    }
}

// Helper to actually start recognition after permission check
function doStartRecognition(recognition) {
    try {
        recognition.start();
        isListening = true;
        isPaused = false;
        updateVoiceUIState('listening');
        startVisualizer();
        playAudioFeedback('start');
        
        if (typeof speakFeedback === 'function') {
            speakFeedback("Listening for commands", true);
        }
        
        // Announce available commands based on current context
        announceAvailableCommands();
    } catch (e) {
        console.error("Error starting recognition:", e);
        
        if (typeof speakFeedback === 'function') {
            speakFeedback("Could not start voice recognition. " + e.message, true);
        }
    }
}

function stopVoiceRecognition(recognition) {
    try {
        recognition.stop();
        isListening = false;
        isPaused = false;
        updateVoiceUIState('inactive');
        stopVisualizer();
        playAudioFeedback('stop');
        
        if (typeof speakFeedback === 'function') {
            speakFeedback("Voice recognition stopped", true);
        }
    } catch (e) {
        console.error("Error stopping recognition:", e);
    }
}

function pauseVoiceRecognition(recognition) {
    try {
        recognition.stop();
        isPaused = true;
        updateVoiceUIState('paused');
        pauseVisualizer();
        playAudioFeedback('stop');
        
        if (typeof speakFeedback === 'function') {
            speakFeedback("Voice recognition paused", true);
        }
    } catch (e) {
        console.error("Error pausing recognition:", e);
    }
}

function resumeVoiceRecognition(recognition) {
    try {
        recognition.start();
        isPaused = false;
        updateVoiceUIState('listening');
        resumeVisualizer();
        playAudioFeedback('start');
        
        if (typeof speakFeedback === 'function') {
            speakFeedback("Resuming voice recognition", true);
        }
    } catch (e) {
        console.error("Error resuming recognition:", e);
    }
}

function refreshCurrentContent() {
    const iframe = document.getElementById('website-frame');
    
    // Announce the refresh action
    if (typeof speakFeedback === 'function') {
        speakFeedback("Refreshing page");
    }
    
    if (iframe) {
        iframe.src = iframe.src;
    } else {
        window.location.reload();
    }
}

// Show help if microphone permission is denied
function showMicrophonePermissionHelp() {
    // Create modal or notification with help
    const helpModal = document.createElement('div');
    helpModal.className = 'modal microphone-help-modal';
    helpModal.innerHTML = `
        <div class="modal-content">
            <h2>Microphone Access Required</h2>
            <p>Voice recognition requires microphone access to work. Please follow these steps to enable it:</p>
            <ol>
                <li>Look for the microphone or camera icon in your browser's address bar</li>
                <li>Click it and select "Always allow" for this site</li>
                <li>Refresh the page after changing permissions</li>
            </ol>
            <div class="modal-buttons">
                <button class="primary-btn" id="refresh-after-permission">Refresh Page</button>
                <button class="secondary-btn" id="close-mic-help">Continue Without Voice</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Add event listeners
    document.getElementById('refresh-after-permission').addEventListener('click', function() {
        window.location.reload();
    });
    
    document.getElementById('close-mic-help').addEventListener('click', function() {
        helpModal.remove();
    });
    
    // Announce the dialog for accessibility
    if (typeof announceModalOpen === 'function') {
        announceModalOpen("Microphone Access Required");
    }
}

// Helper to announce context-appropriate commands
function announceAvailableCommands() {
    // Get the current section/context Voice recognition system initialized
    const currentSection = getCurrentSection();
    
    let commandSuggestion = "You can say ";
    
    // Customize based on current section
    switch(currentSection) {
        case 'purchase-links':
            commandSuggestion += "'admissions', 'academics', or the name of any Purchase College page you'd like to visit.";
            break;
        case 'settings':
            commandSuggestion += "'dark mode', 'light mode', or 'go home'.";
            break;
        case 'history':
            commandSuggestion += "'clear history', 'go to' followed by a website, or 'go home'.";
            break;
        default:
            commandSuggestion += "'show settings', 'purchase links', 'show help', or 'dark mode'.";
    }
    
    // Only speak this for medium or high verbosity
    if (typeof speakFeedback === 'function') {
        setTimeout(() => {
            speakFeedback(commandSuggestion, false, 'medium');
        }, 1500); // Delay to let the "listening" announcement finish
    }
}

// Helper to determine current section
function getCurrentSection() {
    // This implementation depends on your app structure
    // Example assumes sections have a class like "section-name active"
    const activeSection = document.querySelector('.section.active, [data-section].active');
    if (activeSection) {
        return activeSection.getAttribute('data-section') || activeSection.id;
    }
    return 'default';
}

// Export necessary functions globally for other modules
window.startVoiceRecognition = startVoiceRecognition;
window.stopVoiceRecognition = stopVoiceRecognition;
window.pauseVoiceRecognition = pauseVoiceRecognition;
window.resumeVoiceRecognition = resumeVoiceRecognition;
window.refreshCurrentContent = refreshCurrentContent;
window.initializeVoiceRecognition = initializeVoiceRecognition;