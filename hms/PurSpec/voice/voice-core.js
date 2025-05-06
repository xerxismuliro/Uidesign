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
let recognition = null; 
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

  recognition = setupRecognitionObject(voiceStatus);
  setupVoiceControlListeners(recognition, voiceControlContainer);
  setupAudioFeedbackToggle();
  setupSpokenFeedbackToggle();
  setupVerbosityLevelToggle();


  initActionFeedback();


  setTimeout(() => {
    if (typeof speakFeedback === 'function') {
      speakFeedback("Voice recognition system initialized and ready");
    }
  }, 1000);
} function setupRecognitionObject(voiceStatus) {const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();recognition.continuous = true;
  recognition.interimResults = false;


  const userLanguage = navigator.language || navigator.userLanguage || 'en-US';
  recognition.lang = userLanguage;


  const savedLanguage = localStorage.getItem('voiceRecognitionLanguage');
  if (savedLanguage) {
    recognition.lang = savedLanguage;
  }

  recognition.onstart = function () {
    isListening = true;
    updateVoiceUIState('listening');


    if (typeof window.trackVoiceUsage === 'function') {
      window.trackVoiceUsage('start_listening');
    }
  };

  recognition.onend = function () {
    if (!isPaused) {
      isListening = false;
      updateVoiceUIState('inactive');
    }



    if (isListening && !isPaused) {
      console.log("Recognition ended unexpectedly, restarting...");
      recognition.start();
    }
  };

  recognition.onresult = function (event) {
    playAudioFeedback('command');


    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase().trim();


    if (voiceStatus) {
      voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Heard: "${command}"</span>`;
    }


    console.log(`Voice command recognized: "${command}" (confidence: ${event.results[last][0].confidence})`);


    handleVoiceCommand(event, recognition);
  };

  recognition.onerror = function (event) {
    voiceStatus.textContent = "Error: " + event.error;
    voiceStatus.style.color = "red";
    updateVoiceUIState('error');
    playAudioFeedback('error');


    if (typeof speakFeedback === 'function') {
      speakFeedback(`Error with voice recognition: ${event.error}`, true);
    }


    if (event.error === 'network') {
      if (typeof speakFeedback === 'function') {
        speakFeedback("Network error. Please check your internet connection.", true);
      }
    } else
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      if (typeof speakFeedback === 'function') {
        speakFeedback("Microphone access denied. Please enable microphone permissions.", true);
      }
    }


    if (typeof window.trackVoiceUsage === 'function') {
      window.trackVoiceUsage('error', { type: event.error });
    }
  };

  return recognition;
} function startVoiceRecognition(recognition) {

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).
    then(function (stream) {

      stream.getTracks().forEach((track) => track.stop());


      doStartRecognition(recognition);
    }).
    catch(function (err) {
      console.error("Microphone permission denied:", err);


      updateVoiceUIState('error');


      if (typeof speakFeedback === 'function') {
        speakFeedback("Microphone access denied. Please enable microphone permissions in your browser settings.", true);
      }


      showMicrophonePermissionHelp();
    });
  } else {

    doStartRecognition(recognition);
  }
} function doStartRecognition(recognition) {
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


    announceAvailableCommands();
  } catch (e) {
    console.error("Error starting recognition:", e);

    if (typeof speakFeedback === 'function') {
      speakFeedback("Could not start voice recognition. " + e.message, true);
    }
  }
} function stopVoiceRecognition(recognition) {try {
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
} function pauseVoiceRecognition(recognition) {try {
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
} function resumeVoiceRecognition(recognition) {try {
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
} function refreshCurrentContent() {
  const iframe = document.getElementById('website-frame');


  if (typeof speakFeedback === 'function') {
    speakFeedback("Refreshing page");
  }

  if (iframe) {
    iframe.src = iframe.src;
  } else {
    window.location.reload();
  }
} 
function showMicrophonePermissionHelp() {

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


  document.getElementById('refresh-after-permission').addEventListener('click', function () {
    window.location.reload();
  });

  document.getElementById('close-mic-help').addEventListener('click', function () {
    helpModal.remove();
  });


  if (typeof announceModalOpen === 'function') {
    announceModalOpen("Microphone Access Required");
  }
} 
function announceAvailableCommands() {

  const currentSection = getCurrentSection();

  let commandSuggestion = "You can say ";


  switch (currentSection) {
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


  if (typeof speakFeedback === 'function') {
    setTimeout(() => {
      speakFeedback(commandSuggestion, false, 'medium');
    }, 1500);
  }
} function getCurrentSection() {


  const activeSection = document.querySelector('.section.active, [data-section].active');
  if (activeSection) {
    return activeSection.getAttribute('data-section') || activeSection.id;
  }
  return 'default';
}


window.startVoiceRecognition = startVoiceRecognition;
window.stopVoiceRecognition = stopVoiceRecognition;
window.pauseVoiceRecognition = pauseVoiceRecognition;
window.resumeVoiceRecognition = resumeVoiceRecognition;
window.refreshCurrentContent = refreshCurrentContent;
window.initializeVoiceRecognition = initializeVoiceRecognition;