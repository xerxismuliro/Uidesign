// VOICE RECOGNITION
let isListening = false;

function initializeVoiceRecognition() {
    const startListeningBtn = document.getElementById('start-listening');
    const voiceStatus = document.getElementById('voice-status');
    const quickStartBtn = document.getElementById('quick-start');
    
    // Check if browser supports SpeechRecognition
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        handleUnsupportedVoiceRecognition(startListeningBtn, voiceStatus);
        return;
    }
    
    const recognition = setupRecognitionObject(voiceStatus, startListeningBtn);
    
    // Toggle voice recognition button
    startListeningBtn.addEventListener('click', () => {
        toggleVoiceRecognition(recognition);
    });
    
    // Quick start button
    if (quickStartBtn) {
        quickStartBtn.addEventListener('click', () => {
            if (!isListening) {
                recognition.start();
            }
            showSection("voice-commands");
        });
    }
}

function handleUnsupportedVoiceRecognition(startListeningBtn, voiceStatus) {
    startListeningBtn.disabled = true;
    voiceStatus.textContent = "Voice recognition not supported in this browser";
    voiceStatus.style.color = "red";
}

function setupRecognitionObject(voiceStatus, startListeningBtn) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        isListening = true;
        voiceStatus.textContent = "Listening...";
        voiceStatus.style.color = "green";
        startListeningBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
    };
    
    recognition.onend = function() {
        isListening = false;
        voiceStatus.textContent = "Inactive";
        voiceStatus.style.color = "";
        startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
    };
    
    recognition.onresult = function(event) {
        handleVoiceCommand(event, recognition);
    };
    
    recognition.onerror = function(event) {
        voiceStatus.textContent = "Error: " + event.error;
        voiceStatus.style.color = "red";
    };
    
    return recognition;
}

function toggleVoiceRecognition(recognition) {
    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

function handleVoiceCommand(event, recognition) {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase().trim();
    
    document.getElementById('voice-status').textContent = `Command: "${command}"`;
    
    // Navigation commands
    if (command.includes("go to") || command.includes("open")) {
        let website = command.replace("go to", "").replace("open", "").trim();
        navigateToWebsite(website);
    }


    // Add Purchase College specific commands
    else if (command.includes('show purchase links')) {
        showSection('purchase-links');
    }
    else if (command.includes('go to purchase') || command.includes('open purchase')) {
        handlePurchaseLinkVoiceCommand(command);
    }



    // Theme commands
    else if (command.includes("dark mode")) {
        document.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme: 'dark' } 
        }));
    }
    else if (command.includes("light mode")) {
        document.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme: 'light' } 
        }));
    }
    // Section navigation
    else if (command.includes("show voice commands") || command.includes("voice commands")) {
        showSection("voice-commands");
    }
    else if (command.includes("show bookmarks") || command.includes("bookmarks")) {
        showSection("bookmarks");
    }
    else if (command.includes("show history") || command.includes("history")) {
        showSection("history");
    }
    else if (command.includes("show settings") || command.includes("settings")) {
        showSection("settings");
    }
    else if (command.includes("show help") || command.includes("help")) {
        showSection("help");
    }
    else if (command.includes("show accessibility") || command.includes("accessibility")) {
        showSection("accessibility");
    }
    // Control commands
    else if (command.includes("stop listening")) {
        recognition.stop();
    }
    else if (command.includes("home") || command.includes("go home")) {
        showSection("default");
    }
    else if (command.includes("refresh") || command.includes("reload")) {
        refreshCurrentContent();
    }
}

function refreshCurrentContent() {
    const iframe = document.getElementById('website-frame');
    if (iframe) {
        iframe.src = iframe.src;
    } else {
        window.location.reload();
    }
}


// // New function to handle Purchase links voice commands
// function handlePurchaseLinkVoiceCommand(command) {
//     // Extract the query part after "purchase"
//     let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
    
//     if (!query || query === '') {
//         // If no specific section, just go to the main Purchase.edu site
//         navigateToWebsite('https://www.purchase.edu/');
//         return;
//     }
    
//     // See if we can match it to one of our links
//     if (purchaseEduLinks && purchaseEduLinks.length > 0) {
//         // First try an exact match
//         const exactMatches = purchaseEduLinks.filter(link => 
//             link.text.toLowerCase() === query
//         );
        
//         if (exactMatches.length > 0) {
//             navigateToWebsite(exactMatches[0].url);
//             return;
//         }
        
//         // If no exact match, try a partial match
//         const partialMatches = purchaseEduLinks.filter(link => 
//             link.text.toLowerCase().includes(query)
//         );
        
//         if (partialMatches.length > 0) {
//             navigateToWebsite(partialMatches[0].url);
//             return;
//         }
//     }
    
//     // If no matches in our links data, try a generic URL construction
//     const constructedUrl = `https://www.purchase.edu/${query.replace(/\s+/g, '-')}/`;
//     navigateToWebsite(constructedUrl);
// }


// New function to handle Purchase links voice commands
function handlePurchaseLinkVoiceCommand(command) {
    // Extract the query part after "purchase"
    let query = command.replace('go to purchase', '').replace('open purchase', '').trim();
    
    // Update voice status with a more descriptive message
    const voiceStatus = document.getElementById('voice-status');
    if (voiceStatus) {
        voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Searching for Purchase link: "${query}"</span>`;
    }
    
    if (!query || query === '') {
        // If no specific section, just go to the main Purchase.edu site
        navigateToWebsite('https://www.purchase.edu/');
        return;
    }
    
    // See if we can match it to one of our links
    if (typeof purchaseEduLinks !== 'undefined' && purchaseEduLinks && purchaseEduLinks.length > 0) {
        // First try an exact match
        const exactMatches = purchaseEduLinks.filter(link => 
            link.text.toLowerCase() === query
        );
        
        if (exactMatches.length > 0) {
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--success-color)">Found exact match: "${exactMatches[0].text}"</span>`;
            }
            navigateToWebsite(exactMatches[0].url);
            return;
        }
        
        // If no exact match, try a partial match
        const partialMatches = purchaseEduLinks.filter(link => 
            link.text.toLowerCase().includes(query)
        );
        
        if (partialMatches.length > 0) {
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--success-color)">Found similar match: "${partialMatches[0].text}"</span>`;
            }
            navigateToWebsite(partialMatches[0].url);
            return;
        }
    }
    
    // If no matches in our links data, try a generic URL construction
    if (voiceStatus) {
        voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No exact matches found, trying constructed URL...</span>`;
    }
    
    const constructedUrl = `https://www.purchase.edu/${query.replace(/\s+/g, '-')}/`;
    navigateToWebsite(constructedUrl);
}