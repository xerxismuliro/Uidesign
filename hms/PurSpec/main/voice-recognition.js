// let isListening = false;

// function initializeVoiceRecognition() {
//     const startListeningBtn = document.getElementById('start-listening');
//     const voiceStatus = document.getElementById('voice-status');
//     const quickStartBtn = document.getElementById('quick-start');

//     // Check if browser supports SpeechRecognition
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//         handleUnsupportedVoiceRecognition(startListeningBtn, voiceStatus);
//         return;
//     }

//     const recognition = setupRecognitionObject(voiceStatus, startListeningBtn);

//     // Toggle voice recognition button
//     startListeningBtn.addEventListener('click', () => {
//         toggleVoiceRecognition(recognition);
//     });

//     // Quick start button
//     if (quickStartBtn) {
//         quickStartBtn.addEventListener('click', () => {
//             if (!isListening) {
//                 recognition.start();
//             }
//             showSection("voice-commands");
//         });
//     }
// }

// function handleUnsupportedVoiceRecognition(startListeningBtn, voiceStatus) {
//     startListeningBtn.disabled = true;
//     voiceStatus.textContent = "Voice recognition not supported in this browser";
//     voiceStatus.style.color = "red";
// }

// function setupRecognitionObject(voiceStatus, startListeningBtn) {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onstart = function () {
//         isListening = true;
//         voiceStatus.textContent = "Listening...";
//         voiceStatus.style.color = "green";
//         startListeningBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
//     };

//     recognition.onend = function () {
//         isListening = false;
//         voiceStatus.textContent = "Inactive";
//         voiceStatus.style.color = "";
//         startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
//     };

//     recognition.onresult = function (event) {
//         handleVoiceCommand(event, recognition);
//     };

//     recognition.onerror = function (event) {
//         voiceStatus.textContent = "Error: " + event.error;
//         voiceStatus.style.color = "red";
//     };

//     return recognition;
// }

// function toggleVoiceRecognition(recognition) {
//     if (isListening) {
//         recognition.stop();
//     } else {
//         recognition.start();
//     }
// }

// function refreshCurrentContent() {
//     const iframe = document.getElementById('website-frame');
//     if (iframe) {
//         iframe.src = iframe.src;
//     } else {
//         window.location.reload();
//     }
// }



// function handleVoiceCommand(event, recognition) {
//     const last = event.results.length - 1;
//     const command = event.results[last][0].transcript.toLowerCase().trim();

//     // Log the command for debugging
//     console.log("Processing voice command in handleVoiceCommand:", command);

//     document.getElementById('voice-status').textContent = `Command: "${command}"`;

//     // Handle direct Purchase College commands first
//     if (command === "purchase" ||
//         command === "purchase website" ||
//         command === "purchase edu" ||
//         command === "purchase college" ||
//         command === "show purchase" ||
//         command === "purchase links") {
//         showSection("purchase-links");
//         return;
//     }

//     // Handle "go to purchase [something]" or "open purchase [something]"
//     if (command.startsWith('go to purchase') || command.startsWith('open purchase')) {
//         handlePurchaseLinkVoiceCommand(command);
//         return;
//     }

//     // Check if the command might be referring to a Purchase link directly
//     // This allows saying just "veteran services" or "my heliotrope" without "purchase"
//     if (typeof fallbackPurchaseLinks !== 'undefined' && fallbackPurchaseLinks && fallbackPurchaseLinks.length > 0) {
//         // Check if command exactly matches or is very close to any link text
//         for (const link of fallbackPurchaseLinks) {
//             if (!link.text) continue;

//             const linkText = link.text.toLowerCase();

//             // Direct match with link text
//             if (command === linkText ||
//                 // Also check with "go to" or "open" prefix
//                 command === `go to ${linkText}` ||
//                 command === `open ${linkText}`) {
//                 console.log(`Direct match with link text: "${link.text}"`);
//                 handlePurchaseLinkVoiceCommand(command);
//                 return;
//             }
//         }

//         // Check for very common Purchase sections that might be said directly
//         const commonSections = [
//             'admissions', 'academics', 'campus life', 'about',
//             'arts', 'art', 'design', 'programs', 'majors',
//             'apply now', 'housing', 'tuition', 'financial aid'
//         ];

//         if (commonSections.includes(command)) {
//             console.log(`Command matches common Purchase section: "${command}"`);
//             handlePurchaseLinkVoiceCommand(command);
//             return;
//         }
//     }

//     // Other types of commands below - only executed if not a Purchase command
    
//     // Navigation commands
//     if (command.includes("go to") || command.includes("open")) {
//         let website = command.replace("go to", "").replace("open", "").trim();
//         navigateToWebsite(website);
//         return;
//     }

//     // Theme commands
//     else if (command.includes("dark mode")) {
//         document.dispatchEvent(new CustomEvent('themeChange', {
//             detail: { theme: 'dark' }
//         }));
//     }
//     else if (command.includes("light mode")) {
//         document.dispatchEvent(new CustomEvent('themeChange', {
//             detail: { theme: 'light' }
//         }));
//     }

//     // Section navigation with expanded command options
//     else if (command.includes("show voice commands") || command.includes("voice commands") ||
//         command.includes("available commands") || command.includes("what can i say") ||
//         command.includes("voice help") || command.includes("voice options") ||
//         command.includes("voice features") || command === "commands") {
//         showSection("voice-commands");
//     }
//     else if (command.includes("show bookmarks") || command.includes("bookmarks") ||
//         command.includes("saved sites") || command.includes("my bookmarks") ||
//         command.includes("favorite sites") || command.includes("favorites") ||
//         command.includes("saved pages") || command === "saved" ||
//         command === "show my bookmarks") {
//         showSection("bookmarks");
//     }
//     else if (command.includes("show history") || command.includes("history") ||
//         command.includes("browsing history") || command.includes("recent sites") ||
//         command.includes("recently visited") || command.includes("past sites") ||
//         command.includes("show my history") || command.includes("what did i visit") ||
//         command === "recent") {
//         showSection("history");
//     }
//     else if (command.includes("show settings") || command.includes("settings") ||
//         command.includes("preferences") || command.includes("options") ||
//         command.includes("configuration") || command.includes("app settings") ||
//         command.includes("change settings") || command.includes("setup") ||
//         command === "configure") {
//         showSection("settings");
//     }
//     else if (command.includes("show help") || command.includes("help") ||
//         command.includes("support") || command.includes("assistance") ||
//         command.includes("how to use") || command.includes("instructions") ||
//         command.includes("guide") || command.includes("tutorial") ||
//         command === "how do i use this") {
//         showSection("help");
//     }
//     else if (command.includes("show accessibility") || command.includes("accessibility") ||
//         command.includes("accessible options") || command.includes("access features") ||
//         command.includes("accessibility settings") || command.includes("a11y") ||
//         command.includes("accommodations") || command.includes("assistive features") ||
//         command === "access") {
//         showSection("accessibility");
//     }
//     else if (command.includes('show purchase links')) {
//         showSection('purchase-links');
//     }

//     // Control commands
//     else if (command.includes("stop listening")) {
//         recognition.stop();
//     }
//     else if (command.includes("home") || command.includes("go home")) {
//         showSection("default");
//     }
//     else if (command.includes("refresh") || command.includes("reload")) {
//         refreshCurrentContent();
//     }
// }

// // Function to handle Purchase links voice commands
// function handlePurchaseLinkVoiceCommand(command) {
//     // At the beginning of handlePurchaseLinkVoiceCommand
//     console.log(`Processing Purchase link command: "${command}"`);
    
//     // Extract the query part after "purchase" if present
//     let query = command;
//     if (command.includes('purchase')) {
//         query = command.replace('go to purchase', '')
//                .replace('open purchase', '')
//                .replace('purchase', '')
//                .trim();
//     } else {
//         // If command doesn't contain "purchase", use the command as is
//         // This is important for direct section names like "Admissions"
//         query = command;
//     }

//     // Update voice status with a more descriptive message
//     const voiceStatus = document.getElementById('voice-status');
//     if (voiceStatus) {
//         voiceStatus.innerHTML = `<span style="color:var(--accent-color)">Searching for: "${query}"</span>`;
//     }

//     // If query is empty, just go to the main Purchase.edu site
//     if (!query || query === '') {
//         navigateToWebsite('https://www.purchase.edu/');
//         if (voiceStatus) {
//             voiceStatus.innerHTML = `<span style="color:var(--success-color)">Navigating to Purchase College homepage</span>`;
//         }
//         return;
//     }

//     // Handle common speech recognition issues with URLs
//     query = query.replace(/dot com|\.com|dotcom|dot|com$/gi, '').trim();

//     // Clean up query 
//     query = query.trim().toLowerCase();

//     // Check if we have fallback links available
//     if (typeof fallbackPurchaseLinks === 'undefined' || !fallbackPurchaseLinks || !fallbackPurchaseLinks.length) {
//         console.warn('No fallback links available for Purchase.edu matching');
//         // If no fallback links, construct a basic URL
//         const cleanPath = query.replace(/\s+/g, '-');
//         navigateToWebsite(`https://www.purchase.edu/${cleanPath}/`);
//         return;
//     }

//     console.log(`Searching for "${query}" in ${fallbackPurchaseLinks.length} fallback links`);

//     // Define a scoring function to find the best match
//     function scoreMatch(link, queryText) {
//         if (!link || !link.text) return 0;

//         const linkText = link.text.toLowerCase();
//         const linkTitle = (link.title || '').toLowerCase();
//         let score = 0;

//         // Exact match on text is best
//         if (linkText === queryText) {
//             score += 100;
//         }
//         // Exact match on title is good too
//         else if (linkTitle === queryText) {
//             score += 90;
//         }
//         // If query is a substring of the link text
//         else if (linkText.includes(queryText)) {
//             // The closer the length, the better the match
//             score += 80 * (queryText.length / linkText.length);
//         }
//         // If link text is a substring of the query
//         else if (queryText.includes(linkText)) {
//             score += 70 * (linkText.length / queryText.length);
//         }
//         // If title contains the query
//         else if (linkTitle.includes(queryText)) {
//             score += 60 * (queryText.length / linkTitle.length);
//         }

//         // Split both into words and count matching words
//         const queryWords = queryText.split(/\s+/);
//         const linkWords = linkText.split(/\s+/);

//         let wordMatches = 0;
//         queryWords.forEach(qWord => {
//             if (qWord.length < 3) return; // Skip very short words

//             linkWords.forEach(lWord => {
//                 // Full word match
//                 if (lWord === qWord) {
//                     wordMatches += 2;
//                 }
//                 // Partial word match (beginning of word)
//                 else if (lWord.startsWith(qWord) || qWord.startsWith(lWord)) {
//                     wordMatches += 1;
//                 }
//             });
//         });

//         score += wordMatches * 5;

//         // Bonus for Purchase College URLs
//         if (link.url && link.url.includes('purchase.edu')) {
//             score += 20;
//         }

//         return score;
//     }

//     // Score all links
//     const scoredLinks = fallbackPurchaseLinks
//         .filter(link => link && link.url && link.text) // Filter out invalid links
//         .map(link => ({
//             link: link,
//             score: scoreMatch(link, query)
//         }))
//         .sort((a, b) => b.score - a.score); // Sort by score descending

//     // Add these two log statements right here
//     console.log('Scored links for query:', query);
//     console.log('All scored links:', scoredLinks);

//     console.log('Top 5 link matches:', scoredLinks.slice(0, 5));
    

//     // Get the best match that has a non-zero score
//     const bestMatch = scoredLinks.find(item => item.score > 0);

//     if (bestMatch) {
//         if (voiceStatus) {
//             voiceStatus.innerHTML = `<span style="color:var(--success-color)">Found match: "${bestMatch.link.text}"</span>`;
//         }
//         console.log(`Navigating to best match: ${bestMatch.link.text} (${bestMatch.link.url}) - Score: ${bestMatch.score}`);
//         navigateToWebsite(bestMatch.link.url);
//         return;
//     }

//     // If no good match found, try a fuzzy match on individual words
//     const queryWords = query.split(/\s+/).filter(word => word.length > 2);

//     if (queryWords.length > 0) {
//         // Try to match based on individual important words
//         const wordMatchLinks = fallbackPurchaseLinks
//             .filter(link => link && link.text)
//             .map(link => {
//                 let wordMatchScore = 0;
//                 queryWords.forEach(word => {
//                     if (link.text.toLowerCase().includes(word)) {
//                         wordMatchScore += 10 * (word.length / link.text.length);
//                     }
//                     if (link.title && link.title.toLowerCase().includes(word)) {
//                         wordMatchScore += 5 * (word.length / link.title.length);
//                     }
//                 });
//                 return { link, score: wordMatchScore };
//             })
//             .filter(item => item.score > 0)
//             .sort((a, b) => b.score - a.score);

//         if (wordMatchLinks.length > 0) {
//             if (voiceStatus) {
//                 voiceStatus.innerHTML = `<span style="color:var(--warning-color)">Found partial match: "${wordMatchLinks[0].link.text}"</span>`;
//             }
//             console.log(`Navigating to word match: ${wordMatchLinks[0].link.text} (${wordMatchLinks[0].link.url}) - Score: ${wordMatchLinks[0].score}`);
//             navigateToWebsite(wordMatchLinks[0].link.url);
//             return;
//         }
//     }

//     // If still no match, try the more advanced pattern matching logic or construct a URL
//     // We'll analyze path patterns from existing links to guess what section this belongs in
//     const mainSections = ['academics', 'admissions', 'campus-life', 'about', 'offices'];
//     let bestSection = '';

//     // Check if query directly mentions a main section
//     for (const section of mainSections) {
//         if (query.includes(section)) {
//             bestSection = section;
//             break;
//         }
//     }

//     // If no direct section match, try to infer from keywords
//     if (!bestSection) {
//         // Check keywords associated with each section
//         const sectionKeywords = {
//             'academics': ['program', 'major', 'school', 'course', 'class', 'study', 'degree', 'faculty', 'professor', 'department'],
//             'admissions': ['apply', 'application', 'tuition', 'financial', 'aid', 'scholarship', 'enroll', 'admit'],
//             'campus-life': ['campus', 'housing', 'dorm', 'dining', 'student', 'club', 'activity', 'life', 'residence'],
//             'about': ['history', 'mission', 'contact', 'about', 'leadership', 'president', 'board'],
//             'offices': ['office', 'service', 'support', 'administration', 'registrar', 'bursar', 'career', 'health', 'veteran']
//         };

//         const sectionScores = {};
//         Object.keys(sectionKeywords).forEach(section => {
//             sectionScores[section] = 0;
//             sectionKeywords[section].forEach(keyword => {
//                 if (query.includes(keyword)) {
//                     sectionScores[section] += 1;
//                 }
//             });
//         });

//         // Find section with highest score
//         let highestScore = 0;
//         Object.keys(sectionScores).forEach(section => {
//             if (sectionScores[section] > highestScore) {
//                 highestScore = sectionScores[section];
//                 bestSection = section;
//             }
//         });
//     }

//     // Construct a URL using the best section or direct path
//     let constructedUrl;
//     if (bestSection) {
//         const cleanPath = query.replace(/\s+/g, '-');
//         constructedUrl = `https://www.purchase.edu/${bestSection}/${cleanPath}/`;
//         if (voiceStatus) {
//             voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No direct match found. Trying: ${bestSection}/${cleanPath}/</span>`;
//         }
//     } else {
//         const cleanPath = query.replace(/\s+/g, '-');
//         constructedUrl = `https://www.purchase.edu/${cleanPath}/`;
//         if (voiceStatus) {
//             voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No match found. Trying direct path: ${cleanPath}/</span>`;
//         }
//     }

//     console.log(`No match found, constructed URL: ${constructedUrl}`);
//     navigateToWebsite(constructedUrl);
// }



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

    recognition.onstart = function () {
        isListening = true;
        voiceStatus.textContent = "Listening...";
        voiceStatus.style.color = "green";
        startListeningBtn.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
    };

    recognition.onend = function () {
        isListening = false;
        voiceStatus.textContent = "Inactive";
        voiceStatus.style.color = "";
        startListeningBtn.innerHTML = '<i class="fas fa-microphone"></i> Start Listening';
    };

    recognition.onresult = function (event) {
        handleVoiceCommand(event, recognition);
    };

    recognition.onerror = function (event) {
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
        return;
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

    // Section navigation with expanded command options
    else if (command.includes("show voice commands") || command.includes("voice commands") ||
        command.includes("available commands") || command.includes("what can i say") ||
        command.includes("voice help") || command.includes("voice options") ||
        command.includes("voice features") || command === "commands") {
        showSection("voice-commands");
    }
    else if (command.includes("show bookmarks") || command.includes("bookmarks") ||
        command.includes("saved sites") || command.includes("my bookmarks") ||
        command.includes("favorite sites") || command.includes("favorites") ||
        command.includes("saved pages") || command === "saved" ||
        command === "show my bookmarks") {
        showSection("bookmarks");
    }
    else if (command.includes("show history") || command.includes("history") ||
        command.includes("browsing history") || command.includes("recent sites") ||
        command.includes("recently visited") || command.includes("past sites") ||
        command.includes("show my history") || command.includes("what did i visit") ||
        command === "recent") {
        showSection("history");
    }
    else if (command.includes("show settings") || command.includes("settings") ||
        command.includes("preferences") || command.includes("options") ||
        command.includes("configuration") || command.includes("app settings") ||
        command.includes("change settings") || command.includes("setup") ||
        command === "configure") {
        showSection("settings");
    }
    else if (command.includes("show help") || command.includes("help") ||
        command.includes("support") || command.includes("assistance") ||
        command.includes("how to use") || command.includes("instructions") ||
        command.includes("guide") || command.includes("tutorial") ||
        command === "how do i use this") {
        showSection("help");
    }
    else if (command.includes("show accessibility") || command.includes("accessibility") ||
        command.includes("accessible options") || command.includes("access features") ||
        command.includes("accessibility settings") || command.includes("a11y") ||
        command.includes("accommodations") || command.includes("assistive features") ||
        command === "access") {
        showSection("accessibility");
    }
    else if (command.includes('show purchase links')) {
        showSection('purchase-links');
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
        navigateToWebsite('https://www.purchase.edu/');
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--success-color)">Navigating to Purchase College homepage</span>`;
        }
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
        navigateToWebsite(`https://www.purchase.edu/${cleanPath}/`);
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
        navigateToWebsite(bestMatch.link.url);
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
            navigateToWebsite(wordMatchLinks[0].link.url);
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
    } else {
        const cleanPath = query.replace(/\s+/g, '-');
        constructedUrl = `https://www.purchase.edu/${cleanPath}/`;
        if (voiceStatus) {
            voiceStatus.innerHTML = `<span style="color:var(--warning-color)">No match found. Trying direct path: ${cleanPath}/</span>`;
        }
    }

    console.log(`No match found, constructed URL: ${constructedUrl}`);
    navigateToWebsite(constructedUrl);
}


















































































