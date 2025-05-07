// HISTORY MANAGEMENT
function addToHistory(website) {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;
    
    // Get hostname for display
    let displayName = getDisplayNameFromUrl(website);
    
    // Create history item
    const newHistoryItem = createHistoryItemElement(displayName, "Just now", website);
    
    // Add to history list
    historyList.insertBefore(newHistoryItem, historyList.firstChild);
    
    // Store in localStorage
    saveHistoryToStorage(website);
}

function getDisplayNameFromUrl(url) {
    try {
        return new URL(url).hostname;
    } catch (e) {
        return url;
    }
}

function createHistoryItemElement(displayName, timeString, website) {
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `
        <i class="fas fa-globe"></i>
        <span>${displayName} - ${timeString}</span>
    `;
    
    // Add click handler
    historyItem.addEventListener('click', () => {
        navigateToWebsite(website);
    });
    
    return historyItem;
}

function saveHistoryToStorage(website) {
    let history = JSON.parse(localStorage.getItem('browsing_history') || '[]');
    
    // Add new item with timestamp
    history.unshift({
        url: website,
        timestamp: new Date().toISOString()
    });
    
    // Limit history to 50 items
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    // Save back to localStorage
    localStorage.setItem('browsing_history', JSON.stringify(history));
}

function loadHistoryFromStorage() {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;
    
    const history = JSON.parse(localStorage.getItem('browsing_history') || '[]');
    
    history.forEach(item => {
        const timeString = formatHistoryTimestamp(item.timestamp);
        const displayName = getDisplayNameFromUrl(item.url);
        
        // Create and add history item
        const historyItem = createHistoryItemElement(displayName, timeString, item.url);
        historyList.appendChild(historyItem);
    });
}

function formatHistoryTimestamp(timestamp) {
    const timestamp_date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - timestamp_date) / (1000 * 60));
    
    if (diffMinutes < 1) {
        return "Just now";
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
        const days = Math.floor(diffMinutes / 1440);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
}