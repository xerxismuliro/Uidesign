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





let isListening = false;
let isPaused = false;
let visualizerInterval = null;
let audioContext = null;
let audioFeedbackEnabled = true; 
let speechSynthesis = window.speechSynthesis;
let spokenFeedbackEnabled = true; 

function initializeVoiceRecognition() {
    const voiceControlContainer = document.querySelector('.voice-control');
    const voiceStatus = document.getElementById('voice-status');
    
    
    initAudioFeedback();
    
    
    initSpeechSynthesis();
    
    
    loadAudioPreferences();
    
    
    createVoiceControlUI(voiceControlContainer);
    
    
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        handleUnsupportedVoiceRecognition(voiceControlContainer, voiceStatus);
        return;
    }

    const recognition = setupRecognitionObject(voiceStatus);
    
    
    setupVoiceControlListeners(recognition, voiceControlContainer);
    
    
    setupAudioFeedbackToggle();
    
    
    setupSpokenFeedbackToggle();
}


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
    console.log("Speech synthesis initialized");
    return true;
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


function speakFeedback(text, priority = false) {
    if (!spokenFeedbackEnabled || !speechSynthesis) return;
    
    
    if (priority) {
        speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    
    utterance.volume = 0.8;  
    utterance.rate = 1.1;    
    utterance.pitch = 1;     
    
    
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
    
    
    speechSynthesis.speak(utterance);
}


function setupAudioFeedbackToggle() {
    const settingsSection = document.getElementById('settings');
    if (!settingsSection) return;
    
    
    if (document.getElementById('audio-feedback-toggle')) return;
    
    
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
    if (!settingsSection) return;
    
    
    if (document.getElementById('spoken-feedback-toggle')) return;
    
    
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
    
    container.innerHTML = '';
    
    
    const startListeningBtn = document.createElement('button');
    startListeningBtn.id = 'start-listening';
    startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
    startListeningBtn.className = 'voice-btn primary-btn';
    
    
    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'pause-listening';
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    pauseBtn.className = 'voice-btn secondary-btn';
    pauseBtn.style.display = 'none';
    
    
    const visualizer = document.createElement('div');
    visualizer.id = 'voice-visualizer';
    visualizer.className = 'voice-visualizer';
    
    
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        visualizer.appendChild(bar);
    }
    
    
    const status = document.createElement('div');
    status.id = 'voice-status';
    status.textContent = 'Inactive';
    
    
    const btnContainer = document.createElement('div');
    btnContainer.className = 'voice-btn-container';
    btnContainer.appendChild(startListeningBtn);
    btnContainer.appendChild(pauseBtn);
    
    
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
    
    
    startListeningBtn.addEventListener('click', () => {
        if (isListening) {
            stopVoiceRecognition(recognition);
        } else {
            startVoiceRecognition(recognition);
        }
    });
    
    
    pauseBtn.addEventListener('click', () => {
        if (isPaused) {
            resumeVoiceRecognition(recognition);
        } else {
            pauseVoiceRecognition(recognition);
        }
    });
    
    
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
    
    
    playAudioFeedback('error');
    
    
    speakFeedback("Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.", true);
    
    
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
        
        if (!isPaused) {
            isListening = false;
            updateVoiceUIState('inactive');
        }
    };

    recognition.onresult = function (event) {
        playAudioFeedback('command'); 
        handleVoiceCommand(event, recognition);
    };

    recognition.onerror = function (event) {
        voiceStatus.textContent = "Error: " + event.error;
        voiceStatus.style.color = "red";
        updateVoiceUIState('error');
        playAudioFeedback('error'); 
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
    playAudioFeedback('start'); 
    speakFeedback("Listening for commands", true);
}

function stopVoiceRecognition(recognition) {
    recognition.stop();
    isListening = false;
    isPaused = false;
    updateVoiceUIState('inactive');
    stopVisualizer();
    playAudioFeedback('stop'); 
    speakFeedback("Voice recognition stopped", true);
}

function pauseVoiceRecognition(recognition) {
    recognition.stop();
    isPaused = true;
    updateVoiceUIState('paused');
    pauseVisualizer();
    playAudioFeedback('stop'); 
    speakFeedback("Voice recognition paused", true);
}

function resumeVoiceRecognition(recognition) {
    recognition.start();
    isPaused = false;
    updateVoiceUIState('listening');
    resumeVisualizer();
    playAudioFeedback('start'); 
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
    
    
    stopVisualizer();
    
    
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


function handleVoiceCommand(event, recognition) {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase().trim();

    
    console.log("Processing voice command in handleVoiceCommand:", command);

    document.getElementById('voice-status').textContent = `Command: "${command}"`;

    
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

    
    if (typeof linkTextContent !== 'undefined' && linkTextContent.length > 0 && typeof Fuse !== 'undefined') {
        
        const fuseOptions = {
            includeScore: true,
            threshold: 0.4,
            minMatchCharLength: 3,
            ignoreLocation: true
        };
        
        const fuse = new Fuse(linkTextContent, fuseOptions);
        const results = fuse.search(normalizedCommand);
        
        console.log("Fuzzy search results:", results.slice(0, 3));
        
        
        if (results.length > 0 && results[0].score < 0.4) {
            console.log(`Fuzzy match found: "${results[0].item}" (score: ${results[0].score})`);
            handlePurchaseLinkVoiceCommand(results[0].item);
            return;
        }
    }

    
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

    
    if (command.startsWith('go to purchase') || command.startsWith('open purchase')) {
        handlePurchaseLinkVoiceCommand(command);
        return;
    }

    
    
    if (typeof fallbackPurchaseLinks !== 'undefined' && fallbackPurchaseLinks && fallbackPurchaseLinks.length > 0) {
        
        for (const link of fallbackPurchaseLinks) {
            if (!link.text) continue;

            const linkText = link.text.toLowerCase();

            
            if (command === linkText ||
                
                command === `go to ${linkText}` ||
                command === `open ${linkText}`) {
                console.log(`Direct match with link text: "${link.text}"`);
                handlePurchaseLinkVoiceCommand(command);
                return;
            }
        }

        
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

    
    
    
    if (command.includes("go to") || command.includes("open")) {
        let website = command.replace("go to", "").replace("open", "").trim();
        navigateToWebsite(website);
        playAudioFeedback('success');
        speakFeedback(`Navigating to ${website}`);
        return;
    }

    
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
        
        playAudioFeedback('error');
        speakFeedback("Sorry, I didn't understand that command");
    }
}


function handlePurchaseLinkVoiceCommand(command) {
    
    console.log(`Processing Purchase link command: "${command}"`);
    
    
    let query = command;
    if (command.includes('purchase')) {
        query = command.replace('go to purchase', '')
               .replace('open purchase', '')
               .replace('purchase', '')
               .trim();
    } else {
        
        
        query = command;
    }

    
    const voiceStatus = document.getElementById('voice-status');
    if (voiceStatus) {
        voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Searching for: "${query}"</span>`;
    }

    
    if (!query || query === '') {
        speakFeedback("Navigating to Purchase College homepage");
        
        setTimeout(() => {
            navigateToWebsite('https:
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--success-color)">Navigating to Purchase College homepage</span>`;
            }
            playAudioFeedback('success');
        }, 100);
        return;
    }

    
    query = query.replace(/dot com|\.com|dotcom|dot|com$/gi, '').trim();

    
    query = query.trim().toLowerCase();

    
    if (typeof fallbackPurchaseLinks === 'undefined' || !fallbackPurchaseLinks || !fallbackPurchaseLinks.length) {
        console.warn('No fallback links available for Purchase.edu matching');
        
        const cleanPath = query.replace(/\s+/g, '-');
        const constructedUrl = `https:
        
        speakFeedback(`No link database available. Trying to navigate to ${query}`);
        
        setTimeout(() => {
            navigateToWebsite(constructedUrl);
            playAudioFeedback('success');
        }, 300);
        return;
    }

    console.log(`Searching for "${query}" in ${fallbackPurchaseLinks.length} fallback links`);

    
    function scoreMatch(link, queryText) {
        if (!link || !link.text) return 0;

        const linkText = link.text.toLowerCase();
        const linkTitle = (link.title || '').toLowerCase();
        let score = 0;

        
        if (linkText === queryText) {
            score += 100;
        }
        
        else if (linkTitle === queryText) {
            score += 90;
        }
        
        else if (linkText.includes(queryText)) {
            
            score += 80 * (queryText.length / linkText.length);
        }
        
        else if (queryText.includes(linkText)) {
            score += 70 * (linkText.length / queryText.length);
        }
        
        else if (linkTitle.includes(queryText)) {
            score += 60 * (queryText.length / linkTitle.length);
        }

        
        const queryWords = queryText.split(/\s+/);
        const linkWords = linkText.split(/\s+/);

        let wordMatches = 0;
        queryWords.forEach(qWord => {
            if (qWord.length < 3) return; 

            linkWords.forEach(lWord => {
                
                if (lWord === qWord) {
                    wordMatches += 2;
                }
                
                else if (lWord.startsWith(qWord) || qWord.startsWith(lWord)) {
                    wordMatches += 1;
                }
            });
        });

        score += wordMatches * 5;

        
        if (link.url && link.url.includes('purchase.edu')) {
            score += 20;
        }

        return score;
    }

    
    const scoredLinks = fallbackPurchaseLinks
        .filter(link => link && link.url && link.text) 
        .map(link => ({
            link: link,
            score: scoreMatch(link, query)
        }))
        .sort((a, b) => b.score - a.score); 

    
    console.log('Scored links for query:', query);
    console.log('All scored links:', scoredLinks);

    console.log('Top 5 link matches:', scoredLinks.slice(0, 5));
    

    
    const bestMatch = scoredLinks.find(item => item.score > 0);

    if (bestMatch) {
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--success-color)">Found match: "${bestMatch.link.text}"</span>`;
        }
        console.log(`Navigating to best match: ${bestMatch.link.text} (${bestMatch.link.url}) - Score: ${bestMatch.score}`);
        playAudioFeedback('success'); 
        
        
        speakFeedback(`Navigating to ${bestMatch.link.text}`);
        
        
        setTimeout(() => {
            navigateToWebsite(bestMatch.link.url);
        }, 100);
        return;
    }

    
    const queryWords = query.split(/\s+/).filter(word => word.length > 2);

    if (queryWords.length > 0) {
        
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
            playAudioFeedback('success'); 
            
            
            speakFeedback(`Found partial match. Navigating to ${wordMatchLinks[0].link.text}`);
            
            
            setTimeout(() => {
                navigateToWebsite(wordMatchLinks[0].link.url);
            }, 100);
            return;
        }
    }

    
    
    const mainSections = ['academics', 'admissions', 'campus-life', 'about', 'offices'];
    let bestSection = '';

    
    for (const section of mainSections) {
        if (query.includes(section)) {
            bestSection = section;
            break;
        }
    }

    
    if (!bestSection) {
        
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

        
        let highestScore = 0;
        Object.keys(sectionScores).forEach(section => {
            if (sectionScores[section] > highestScore) {
                highestScore = sectionScores[section];
                bestSection = section;
            }
        });
    }

    
    let constructedUrl;
    if (bestSection) {
        const cleanPath = query.replace(/\s+/g, '-');
        constructedUrl = `https:
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No direct match found. Trying: ${bestSection}/${cleanPath}/</span>`;
        }
        speakFeedback(`No exact match found. Trying ${bestSection} section for ${query}`);
    } else {
        const cleanPath = query.replace(/\s+/g, '-');
        constructedUrl = `https:
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No match found. Trying direct path: ${cleanPath}/</span>`;
        }
        speakFeedback(`No match found. Trying to navigate directly to ${query}`);
    }

    console.log(`No match found, constructed URL: ${constructedUrl}`);
    playAudioFeedback('command');
    
    
    setTimeout(() => {
        navigateToWebsite(constructedUrl);
    }, 300);
}

