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
            navigateToWebsite('https://www.purchase.edu/');
            if (voiceStatus) {
                voiceStatus.innerHTML = `<span style="color:var(--success-color)">Navigating to Purchase College homepage</span>`;
            }
            playAudioFeedback('success');
        }, 100);
        return;
    }

    query = query.replace(/dot com|\.com|dotcom|dot|com$/gi, '').trim().toLowerCase();

    if (typeof fallbackPurchaseLinks === 'undefined' || !fallbackPurchaseLinks || !fallbackPurchaseLinks.length) {
        console.warn('No fallback links available for Purchase.edu matching');
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

    // Define scoring function
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

    // Score all links
    const scoredLinks = fallbackPurchaseLinks
        .filter(link => link && link.url && link.text)
        .map(link => ({
            link: link,
            score: scoreMatch(link, query)
        }))
        .sort((a, b) => b.score - a.score);

    console.log('Scored links for query:', query);
    console.log('Top 5 link matches:', scoredLinks.slice(0, 5));
    
    // Get the best match
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

    // Try word-based matching
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

    // If still no match, try pattern matching
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
    
    setTimeout(() => {
        navigateToWebsite(constructedUrl);
    }, 300);
}