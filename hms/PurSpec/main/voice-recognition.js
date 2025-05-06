let isListening = false;
let isPaused = false;
let visualizerInterval = null;
let audioContext = null;
let audioFeedbackEnabled = true; // User can toggle this in settings
let speechSynthesis = window.speechSynthesis;
let spokenFeedbackEnabled = true; // User can toggle this in settings

function initializeVoiceRecognition() {
    const voiceControlContainer = document.querySelector('.voice-control');
    const voiceStatus = document.getElementById('voice-status');
    
    // Initialize audio feedback
    initAudioFeedback();
    
    // Initialize speech synthesis
    initSpeechSynthesis();
    
    // Load audio preferences
    loadAudioPreferences();
    
    // Create necessary UI elements
    createVoiceControlUI(voiceControlContainer);
    
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        handleUnsupportedVoiceRecognition(voiceControlContainer, voiceStatus);
        return;
    }

    const recognition = setupRecognitionObject(voiceStatus);
    
    // Set up event listeners for voice control buttons
    setupVoiceControlListeners(recognition, voiceControlContainer);
    
    // Setup audio feedback toggle in settings
    setupAudioFeedbackToggle();
    
    // Setup spoken feedback toggle in settings
    setupSpokenFeedbackToggle();
}

// Function to initialize audio feedback
function initAudioFeedback() {
    try {
        // Create audio context (with fallback for older browsers)
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        console.log("Audio feedback system initialized");
        return true;
    } catch (e) {
        console.warn("Web Audio API not supported in this browser:", e);
        return false;
    }
}

// Function to initialize speech synthesis
function initSpeechSynthesis() {
    if (!speechSynthesis) {
        console.warn("Speech synthesis not supported in this browser");
        return false;
    }
    console.log("Speech synthesis initialized");
    return true;
}

// Function to play different audio tones for different states
function playAudioFeedback(type) {
    if (!audioFeedbackEnabled || !audioContext) return;
    
    // Resume AudioContext if it's suspended (needed for Chrome's autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Create oscillator for the tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure parameters based on the feedback type
    switch(type) {
        case 'start': // When voice recognition starts
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'stop': // When voice recognition stops
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 0.3); // E4
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'command': // When a command is recognized
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
            
        case 'error': // Error sound
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(207.65, audioContext.currentTime + 0.2); // G#3
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
            
        case 'success': // When a link or action succeeds
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            oscillator.start();
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
    }
}

// Function to speak text aloud
function speakFeedback(text, priority = false) {
    if (!spokenFeedbackEnabled || !speechSynthesis) return;
    
    // Cancel any previous speech if this is high priority
    if (priority) {
        speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice properties
    utterance.volume = 0.8;  // 0 to 1
    utterance.rate = 1.1;    // 0.1 to 10
    utterance.pitch = 1;     // 0 to 2
    
    // Try to use a natural-sounding voice if available
    const voices = speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google') ||
        voice.name.includes('Natural') ||
        (voice.name.includes('US') && voice.name.includes('English'))
    );
    
    if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0];
    }
    
    // Speak the text
    speechSynthesis.speak(utterance);
}

// Add audio feedback toggle to settings
function setupAudioFeedbackToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection) return;
    
    // Check if toggle already exists
    if (document.getElementById('audio-feedback-toggle')) return;
    
    // Create the audio feedback toggle control
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
    
    // Find a good position to insert the toggle
    const voiceSection = settingsSection.querySelector('.settings-section[data-section="voice"]');
    if (voiceSection) {
        voiceSection.appendChild(audioFeedbackToggle);
    } else {
        // If no voice section exists, add it to the main settings
        const newSection = document.createElement('div');
        newSection.className = 'settings-section';
        newSection.setAttribute('data-section', 'voice');
        
        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = 'Voice Recognition';
        
        newSection.appendChild(sectionHeader);
        newSection.appendChild(audioFeedbackToggle);
        settingsSection.appendChild(newSection);
    }
    
    // Add event listener for the toggle
    document.getElementById('audio-feedback-toggle').addEventListener('change', function(e) {
        audioFeedbackEnabled = e.target.checked;
        
        // Save the setting to localStorage
        localStorage.setItem('audioFeedbackEnabled', audioFeedbackEnabled);
        
        // Play a test sound if enabled
        if (audioFeedbackEnabled) {
            playAudioFeedback('start');
        }
    });
}

// Add spoken feedback toggle to settings
function setupSpokenFeedbackToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection) return;
    
    // Check if toggle already exists
    if (document.getElementById('spoken-feedback-toggle')) return;
    
    // Create the spoken feedback toggle control
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
    
    // Find a good position to insert the toggle
    const voiceSection = settingsSection.querySelector('.settings-section[data-section="voice"]');
    if (voiceSection) {
        voiceSection.appendChild(spokenFeedbackToggle);
    } else {
        // If setupAudioFeedbackToggle already created a voice section, this shouldn't happen
        console.warn("Voice section not found in settings");
    }
    
    // Add event listener for the toggle
    document.getElementById('spoken-feedback-toggle').addEventListener('change', function(e) {
        spokenFeedbackEnabled = e.target.checked;
        
        // Save the setting to localStorage
        localStorage.setItem('spokenFeedbackEnabled', spokenFeedbackEnabled);
        
        // Say a test message if enabled
        if (spokenFeedbackEnabled) {
            speakFeedback("Voice feedback is now enabled.");
        }
    });
}

// Load audio preferences from localStorage
function loadAudioPreferences() {
    const savedPref = localStorage.getItem('audioFeedbackEnabled');
    if (savedPref !== null) {
        audioFeedbackEnabled = savedPref === 'true';
    }
    
    const savedSpokenPref = localStorage.getItem('spokenFeedbackEnabled');
    if (savedSpokenPref !== null) {
        spokenFeedbackEnabled = savedSpokenPref === 'true';
    }
}

function createVoiceControlUI(container) {
    // Clear existing content
    container.innerHTML = '';
    
    // Create main button
    const startListeningBtn = document.createElement('button');
    startListeningBtn.id = 'start-listening';
    startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
    startListeningBtn.className = 'voice-btn primary-btn';
    
    // Create pause button (initially hidden)
    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'pause-listening';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    pauseBtn.className = 'voice-btn secondary-btn';
    pauseBtn.style.display = 'none';
    
    // Create visualizer container
    const visualizer = document.createElement('div');
    visualizer.id = 'voice-visualizer';
    visualizer.className = 'voice-visualizer';
    
    // Create 5 bars for the visualizer
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer.appendChild(bar);
    }
    
    // Create status element
    const status = document.createElement('div');
    status.id = 'voice-status';
    status.textContent = 'Inactive';
    
    // Create button container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'voice-btn-container';
    btnContainer.appendChild(startListeningBtn);
    btnContainer.appendChild(pauseBtn);
    
    // Add elements to container
    container.appendChild(btnContainer);
    container.appendChild(visualizer);
    container.appendChild(status);
    
    return {
        startListeningBtn,
        pauseBtn,
        visualizer,
        status
    };
}

function setupVoiceControlListeners(recognition, container) {
    const startListeningBtn = document.getElementById('start-listening');
    const pauseBtn = document.getElementById('pause-listening');
    const quickStartBtn = document.getElementById('quick-start');
    
    // Start/Stop button
    startListeningBtn.addEventListener('click', () => {
        if (isListening) {
            stopVoiceRecognition(recognition);
        } else {
            startVoiceRecognition(recognition);
        }
    });
    
    // Pause/Resume button
    pauseBtn.addEventListener('click', () => {
        if (isPaused) {
            resumeVoiceRecognition(recognition);
        } else {
            pauseVoiceRecognition(recognition);
        }
    });
    
    // Quick start button if it exists
    if (quickStartBtn) {
        quickStartBtn.addEventListener('click', () => {
            if (!isListening) {
                startVoiceRecognition(recognition);
            }
            showSection("voice-commands");
        });
    }
}

function handleUnsupportedVoiceRecognition(container, voiceStatus) {
    const startListeningBtn = document.getElementById('start-listening');
    if (startListeningBtn) startListeningBtn.disabled = true;
    
    voiceStatus.textContent = "Voice recognition not supported in this browser";
    voiceStatus.style.color = "red";
    
    // Play error sound
    playAudioFeedback('error');
    
    // Speak error message
    speakFeedback("Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.", true);
    
    // Add a browser compatibility message
    const compatMessage = document.createElement('div');
    compatMessage.className = 'compat-message';
    compatMessage.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>Voice recognition requires Chrome, Edge, or Safari.</p>
    `;
    container.appendChild(compatMessage);
}

function setupRecognitionObject(voiceStatus) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = function () {
        isListening = true;
        updateVoiceUIState('listening');
    };

    recognition.onend = function () {
        // Only update UI if we're not paused - this preserves UI state during pause
        if (!isPaused) {
            isListening = false;
            updateVoiceUIState('inactive');
        }
    };

    recognition.onresult = function (event) {
        playAudioFeedback('command'); // Play sound when command received
        handleVoiceCommand(event, recognition);
    };

    recognition.onerror = function (event) {
        voiceStatus.textContent = "Error: " + event.error;
        voiceStatus.style.color = "red";
        updateVoiceUIState('error');
        playAudioFeedback('error'); // Play error sound
        speakFeedback(`Error with voice recognition: ${event.error}`, true);
    };

    return recognition;
}

function startVoiceRecognition(recognition) {
    recognition.start();
    isListening = true;
    isPaused = false;
    updateVoiceUIState('listening');
    startVisualizer();
    playAudioFeedback('start'); // Play start sound
    speakFeedback("Listening for commands", true);
}

function stopVoiceRecognition(recognition) {
    recognition.stop();
    isListening = false;
    isPaused = false;
    updateVoiceUIState('inactive');
    stopVisualizer();
    playAudioFeedback('stop'); // Play stop sound
    speakFeedback("Voice recognition stopped", true);
}

function pauseVoiceRecognition(recognition) {
    recognition.stop();
    isPaused = true;
    updateVoiceUIState('paused');
    pauseVisualizer();
    playAudioFeedback('stop'); // Play stop sound
    speakFeedback("Voice recognition paused", true);
}

function resumeVoiceRecognition(recognition) {
    recognition.start();
    isPaused = false;
    updateVoiceUIState('listening');
    resumeVisualizer();
    playAudioFeedback('start'); // Play start sound
    speakFeedback("Resuming voice recognition", true);
}

function updateVoiceUIState(state) {
    const startListeningBtn = document.getElementById('start-listening');
    const pauseBtn = document.getElementById('pause-listening');
    const voiceStatus = document.getElementById('voice-status');
    const visualizer = document.getElementById('voice-visualizer');
    
    switch(state) {
        case 'inactive':
            startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
            pauseBtn.style.display = 'none';
            voiceStatus.textContent = "Inactive";
            voiceStatus.style.color = "";
            visualizer.classList.remove('active', 'paused', 'error');
            break;
            
        case 'listening':
            startListeningBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
            pauseBtn.style.display = 'inline-flex';
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            voiceStatus.textContent = "Listening...";
            voiceStatus.style.color = "green";
            visualizer.classList.add('active');
            visualizer.classList.remove('paused', 'error');
            break;
            
        case 'paused':
            startListeningBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
            pauseBtn.style.display = 'inline-flex';
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            voiceStatus.textContent = "Paused";
            voiceStatus.style.color = "orange";
            visualizer.classList.add('paused');
            visualizer.classList.remove('active', 'error');
            break;
            
        case 'error':
            startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Retry';
            pauseBtn.style.display = 'none';
            visualizer.classList.add('error');
            visualizer.classList.remove('active', 'paused');
            break;
    }
}

function startVisualizer() {
    const bars = document.querySelectorAll('.visualizer-bar');
    
    // Stop any existing animation
    stopVisualizer();
    
    // Start new animation
    visualizerInterval = setInterval(() => {
        bars.forEach(bar => {
            const height = Math.floor(Math.random() * 100) + '%';
            bar.style.height = height;
        });
    }, 200);
}

function stopVisualizer() {
    if (visualizerInterval) {
        clearInterval(visualizerInterval);
        visualizerInterval = null;
        
        // Reset bars
        const bars = document.querySelectorAll('.visualizer-bar');
        bars.forEach(bar => {
            bar.style.height = '10%';
        });
    }
}

function pauseVisualizer() {
    if (visualizerInterval) {
        clearInterval(visualizerInterval);
        visualizerInterval = null;
        // Keep current heights
    }
}

function resumeVisualizer() {
    startVisualizer();
}

function refreshCurrentContent() {
    const iframe = document.getElementById('website-frame');
    if (iframe) {
        iframe.src = iframe.src;
    } else {
        window.location.reload();
    }
}

// Update your handleVoiceCommand function with this improved fuzzy matching
function handleVoiceCommand(event, recognition) {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase().trim();

    // Log the command for debugging
    console.log("Processing voice command in handleVoiceCommand:", command);

    document.getElementById('voice-status').textContent = `Command: "${command}"`;

    // Special handling for common singular forms that should match plural pages
    const singularToPluralMap = {
        'admission': 'admissions',
        'academic': 'academics',
        'art': 'arts',
        'program': 'programs',
        'major': 'majors'
    };
    
    let normalizedCommand = command;
    if (singularToPluralMap[command]) {
        console.log(`Converting singular "${command}" to plural "${singularToPluralMap[command]}"`);
        normalizedCommand = singularToPluralMap[command];
    }

    // Using Fuse.js for fuzzy matching with linkTextContent
    if (typeof linkTextContent !== 'undefined' && linkTextContent.length > 0 && typeof Fuse !== 'undefined') {
        // Configure Fuse with appropriate options
        const fuseOptions = {
            includeScore: true,
            threshold: 0.4,
            minMatchCharLength: 3,
            ignoreLocation: true
        };
        
        const fuse = new Fuse(linkTextContent, fuseOptions);
        const results = fuse.search(normalizedCommand);
        
        console.log("Fuzzy search results:", results.slice(0, 3));
        
        // If we found a good match
        if (results.length > 0 && results[0].score < 0.4) {
            console.log(`Fuzzy match found: "${results[0].item}" (score: ${results[0].score})`);
            handlePurchaseLinkVoiceCommand(results[0].item);
            return;
        }
    }

    // Handle direct Purchase College commands first
    if (command === "purchase" ||
        command === "purchase website" ||
        command === "purchase edu" ||
        command === "purchase college" ||
        command === "show purchase" ||
        command === "purchase links") {
        showSection("purchase-links");
        playAudioFeedback('success');
        speakFeedback("Showing Purchase College links");
        return;
    }

    // Handle "go to purchase [something]" or "open purchase [something]"
    if (command.startsWith('go to purchase') || command.startsWith('open purchase')) {
        handlePurchaseLinkVoiceCommand(command);
        return;
    }

    // Check if the command might be referring to a Purchase link directly
    // This allows saying just "veteran services" or "my heliotrope" without "purchase"
    if (typeof fallbackPurchaseLinks !== 'undefined' && fallbackPurchaseLinks && fallbackPurchaseLinks.length > 0) {
        // Check if command exactly matches or is very close to any link text
        for (const link of fallbackPurchaseLinks) {
            if (!link.text) continue;

            const linkText = link.text.toLowerCase();

            // Direct match with link text
            if (command === linkText ||
                // Also check with "go to" or "open" prefix
                command === `go to ${linkText}` ||
                command === `open ${linkText}`) {
                console.log(`Direct match with link text: "${link.text}"`);
                handlePurchaseLinkVoiceCommand(command);
                return;
            }
        }

        // Check for very common Purchase sections that might be said directly
        const commonSections = [
            'admissions', 'academics', 'campus life', 'about',
            'arts', 'art', 'design', 'programs', 'majors',
            'apply now', 'housing', 'tuition', 'financial aid'
        ];

        if (commonSections.includes(command)) {
            console.log(`Command matches common Purchase section: "${command}"`);
            handlePurchaseLinkVoiceCommand(command);
            return;
        }
    }

    // Other types of commands below - only executed if not a Purchase command
    
    // Navigation commands
    if (command.includes("go to") || command.includes("open")) {
        let website = command.replace("go to", "").replace("open", "").trim();
        navigateToWebsite(website);
        playAudioFeedback('success');
        speakFeedback(`Navigating to ${website}`);
        return;
    }

    // Theme commands
    else if (command.includes("dark mode")) {
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: 'dark' }
        }));
        playAudioFeedback('success');
        speakFeedback("Dark mode activated");
        return;
    }
    else if (command.includes("light mode")) {
        document.dispatchEvent(new CustomEvent('themeChange', {
            detail: { theme: 'light' }
        }));
        playAudioFeedback('success');
        speakFeedback("Light mode activated");
        return;
    }

    // Section navigation with expanded command options and success sound
    else if (command.includes("show voice commands") || command.includes("voice commands") ||
        command.includes("available commands") || command.includes("what can i say") ||
        command.includes("voice help") || command.includes("voice options") ||
        command.includes("voice features") || command === "commands") {
        showSection("voice-commands");
        playAudioFeedback('success');
        speakFeedback("Showing voice commands");
        return;
    }
    else if (command.includes("show bookmarks") || command.includes("bookmarks") ||
        command.includes("saved sites") || command.includes("my bookmarks") ||
        command.includes("favorite sites") || command.includes("favorites") ||
        command.includes("saved pages") || command === "saved" ||
        command === "show my bookmarks") {
        showSection("bookmarks");
        playAudioFeedback('success');
        speakFeedback("Showing bookmarks");
        return;
    }
    else if (command.includes("show history") || command.includes("history") ||
        command.includes("browsing history") || command.includes("recent sites") ||
        command.includes("recently visited") || command.includes("past sites") ||
        command.includes("show my history") || command.includes("what did i visit") ||
        command === "recent") {
        showSection("history");
        playAudioFeedback('success');
        speakFeedback("Showing browser history");
        return;
    }
    else if (command.includes("show settings") || command.includes("settings") ||
        command.includes("preferences") || command.includes("options") ||
        command.includes("configuration") || command.includes("app settings") ||
        command.includes("change settings") || command.includes("setup") ||
        command === "configure") {
        showSection("settings");
        playAudioFeedback('success');
        speakFeedback("Showing settings");
        return;
    }
    else if (command.includes("show help") || command.includes("help") ||
        command.includes("support") || command.includes("assistance") ||
        command.includes("how to use") || command.includes("instructions") ||
        command.includes("guide") || command.includes("tutorial") ||
        command === "how do i use this") {
        showSection("help");
        playAudioFeedback('success');
        speakFeedback("Showing help information");
        return;
    }
    else if (command.includes("show accessibility") || command.includes("accessibility") ||
        command.includes("accessible options") || command.includes("access features") ||
        command.includes("accessibility settings") || command.includes("a11y") ||
        command.includes("accommodations") || command.includes("assistive features") ||
        command === "access") {
        showSection("accessibility");
        playAudioFeedback('success');
        speakFeedback("Showing accessibility options");
        return;
    }
    else if (command.includes('show purchase links')) {
        showSection('purchase-links');
        playAudioFeedback('success');
        speakFeedback("Showing Purchase College links");
        return;
    }

    // Control commands
    else if (command.includes("stop listening")) {
        recognition.stop();
        playAudioFeedback('stop');
        speakFeedback("Stopping voice recognition", true);
        return;
    }
    else if (command.includes("home") || command.includes("go home")) {
        showSection("default");
        playAudioFeedback('success');
        speakFeedback("Going to home page");
        return;
    }
    else if (command.includes("refresh") || command.includes("reload")) {
        speakFeedback("Refreshing page");
        playAudioFeedback('success');
        setTimeout(() => {
            refreshCurrentContent();
        }, 500);
        return;
    }
    else {
        // Unknown command
        playAudioFeedback('error');
        speakFeedback("Sorry, I didn't understand that command");
    }
}

// Function to handle Purchase links voice commands
function handlePurchaseLinkVoiceCommand(command) {
    // At the beginning of handlePurchaseLinkVoiceCommand
    console.log(`Processing Purchase link command: "${command}"`);
    
    // Extract the query part after "purchase" if present
    let query = command;
    if (command.includes('purchase')) {
        query = command.replace('go to purchase', '')
               .replace('open purchase', '')
               .replace('purchase', '')
               .trim();
    } else {
        // If command doesn't contain "purchase", use the command as is
        // This is important for direct section names like "Admissions"
        query = command;
    }

    // Update voice status with a more descriptive message
    const voiceStatus = document.getElementById('voice-status');
    if (voiceStatus) {
        voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Searching for: "${query}"</span>`;
    }

    // If query is empty, just go to the main Purchase.edu site
    if (!query || query === '') {
        speakFeedback("Navigating to Purchase College homepage");
        
        setTimeout(() => {
            navigateToWebsite('https://www.purchase.edu/');
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--success-color)">Navigating to Purchase College homepage</span>`;
            }
            playAudioFeedback('success');
        }, 100);
        return;
    }

    // Handle common speech recognition issues with URLs
    query = query.replace(/dot com|\.com|dotcom|dot|com$/gi, '').trim();

    // Clean up query 
    query = query.trim().toLowerCase();

    // Check if we have fallback links available
    if (typeof fallbackPurchaseLinks === 'undefined' || !fallbackPurchaseLinks || !fallbackPurchaseLinks.length) {
        console.warn('No fallback links available for Purchase.edu matching');
        // If no fallback links, construct a basic URL
        const cleanPath = query.replace(/\s+/g, '-');
        const constructedUrl = `https://www.purchase.edu/${cleanPath}/`;
        
        speakFeedback(`No link database available. Trying to navigate to ${query}`);
        
        setTimeout(() => {
            navigateToWebsite(constructedUrl);
            playAudioFeedback('success');
        }, 300);
        return;
    }

    console.log(`Searching for "${query}" in ${fallbackPurchaseLinks.length} fallback links`);

    // Define a scoring function to find the best match
    function scoreMatch(link, queryText) {
        if (!link || !link.text) return 0;

        const linkText = link.text.toLowerCase();
        const linkTitle = (link.title || '').toLowerCase();
        let score = 0;

        // Exact match on text is best
        if (linkText === queryText) {
            score += 100;
        }
        // Exact match on title is good too
        else if (linkTitle === queryText) {
            score += 90;
        }
        // If query is a substring of the link text
        else if (linkText.includes(queryText)) {
            // The closer the length, the better the match
            score += 80 * (queryText.length / linkText.length);
        }
        // If link text is a substring of the query
        else if (queryText.includes(linkText)) {
            score += 70 * (linkText.length / queryText.length);
        }
        // If title contains the query
        else if (linkTitle.includes(queryText)) {
            score += 60 * (queryText.length / linkTitle.length);
        }

        // Split both into words and count matching words
        const queryWords = queryText.split(/\s+/);
        const linkWords = linkText.split(/\s+/);

        let wordMatches = 0;
        queryWords.forEach(qWord => {
            if (qWord.length < 3) return; // Skip very short words

            linkWords.forEach(lWord => {
                // Full word match
                if (lWord === qWord) {
                    wordMatches += 2;
                }
                // Partial word match (beginning of word)
                else if (lWord.startsWith(qWord) || qWord.startsWith(lWord)) {
                    wordMatches += 1;
                }
            });
        });

        score += wordMatches * 5;

        // Bonus for Purchase College URLs
        if (link.url && link.url.includes('purchase.edu')) {
            score += 20;
        }

        return score;
    }

    // Score all links
    const scoredLinks = fallbackPurchaseLinks
        .filter(link => link && link.url && link.text) // Filter out invalid links
        .map(link => ({
            link: link,
            score: scoreMatch(link, query)
        }))
        .sort((a, b) => b.score - a.score); // Sort by score descending

    // Add these two log statements right here
    console.log('Scored links for query:', query);
    console.log('All scored links:', scoredLinks);

    console.log('Top 5 link matches:', scoredLinks.slice(0, 5));
    

    // Get the best match that has a non-zero score
    const bestMatch = scoredLinks.find(item => item.score > 0);

    if (bestMatch) {
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--success-color)">Found match: "${bestMatch.link.text}"</span>`;
        }
        console.log(`Navigating to best match: ${bestMatch.link.text} (${bestMatch.link.url}) - Score: ${bestMatch.score}`);
        playAudioFeedback('success'); // Play success sound when a good match is found
        
        // Announce what we're navigating to
        speakFeedback(`Navigating to ${bestMatch.link.text}`);
        
        // Navigate after a slight delay to allow speech to begin
        setTimeout(() => {
            navigateToWebsite(bestMatch.link.url);
        }, 100);
        return;
    }

    // If no good match found, try a fuzzy match on individual words
    const queryWords = query.split(/\s+/).filter(word => word.length > 2);

    if (queryWords.length > 0) {
        // Try to match based on individual important words
        const wordMatchLinks = fallbackPurchaseLinks
            .filter(link => link && link.text)
            .map(link => {
                let wordMatchScore = 0;
                queryWords.forEach(word => {
                    if (link.text.toLowerCase().includes(word)) {
                        wordMatchScore += 10 * (word.length / link.text.length);
                    }
                    if (link.title && link.title.toLowerCase().includes(word)) {
                        wordMatchScore += 5 * (word.length / link.title.length);
                    }
                });
                return { link, score: wordMatchScore };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        if (wordMatchLinks.length > 0) {
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--warning-color)">Found partial match: "${wordMatchLinks[0].link.text}"</span>`;
            }
            console.log(`Navigating to word match: ${wordMatchLinks[0].link.text} (${wordMatchLinks[0].link.url}) - Score: ${wordMatchLinks[0].score}`);
            playAudioFeedback('success'); // Still success, but partial match
            
            // Announce the partial match
            speakFeedback(`Found partial match. Navigating to ${wordMatchLinks[0].link.text}`);
            
            // Navigate after a slight delay
            setTimeout(() => {
                navigateToWebsite(wordMatchLinks[0].link.url);
            }, 100);
            return;
        }
    }

    // If still no match, try the more advanced pattern matching logic or construct a URL
    // We'll analyze path patterns from existing links to guess what section this belongs in
    const mainSections = ['academics', 'admissions', 'campus-life', 'about', 'offices'];
    let bestSection = '';

    // Check if query directly mentions a main section
    for (const section of mainSections) {
        if (query.includes(section)) {
            bestSection = section;
            break;
        }
    }

    // If no direct section match, try to infer from keywords
    if (!bestSection) {
        // Check keywords associated with each section
        const sectionKeywords = {
            'academics': ['program', 'major', 'school', 'course', 'class', 'study', 'degree', 'faculty', 'professor', 'department'],
            'admissions': ['apply', 'application', 'tuition', 'financial', 'aid', 'scholarship', 'enroll', 'admit'],
            'campus-life': ['campus', 'housing', 'dorm', 'dining', 'student', 'club', 'activity', 'life', 'residence'],
            'about': ['history', 'mission', 'contact', 'about', 'leadership', 'president', 'board'],
            'offices': ['office', 'service', 'support', 'administration', 'registrar', 'bursar', 'career', 'health', 'veteran']
        };

        const sectionScores = {};
        Object.keys(sectionKeywords).forEach(section => {
            sectionScores[section] = 0;
            sectionKeywords[section].forEach(keyword => {
                if (query.includes(keyword)) {
                    sectionScores[section] += 1;
                }
            });
        });

        // Find section with highest score
        let highestScore = 0;
        Object.keys(sectionScores).forEach(section => {
            if (sectionScores[section] > highestScore) {
                highestScore = sectionScores[section];
                bestSection = section;
            }
        });
    }

    // Construct a URL using the best section or direct path
    let constructedUrl;
    if (bestSection) {
        const cleanPath = query.replace(/\s+/g, '-');
        constructedUrl = `https://www.purchase.edu/${bestSection}/${cleanPath}/`;
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No direct match found. Trying: ${bestSection}/${cleanPath}/</span>`;
        }
        speakFeedback(`No exact match found. Trying ${bestSection} section for ${query}`);
    } else {
        const cleanPath = query.replace(/\s+/g, '-');
        constructedUrl = `https://www.purchase.edu/${cleanPath}/`;
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No match found. Trying direct path: ${cleanPath}/</span>`;
        }
        speakFeedback(`No match found. Trying to navigate directly to ${query}`);
    }

    console.log(`No match found, constructed URL: ${constructedUrl}`);
    playAudioFeedback('command');
    
    // Navigate after a slight delay
    setTimeout(() => {
        navigateToWebsite(constructedUrl);
    }, 300);
}

