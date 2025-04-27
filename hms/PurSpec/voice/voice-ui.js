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