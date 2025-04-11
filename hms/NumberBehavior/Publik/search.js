// // Search functionality for Number Behavior application

// document.addEventListener('DOMContentLoaded', () => {
//   const searchInput = document.getElementById('search-input');
//   const searchBtn = document.getElementById('search-btn');
  
//   // Elements that should be searched
//   const searchableElements = [
//     '.intro', '.analysis-step', '.calculation', '.factorial-analysis',
//     '.scale', '.conclusion', '.parent-child-relation', '.process',
//     'h1', 'h2', 'h3', 'h4', 'h5', 'p', '.steps'
//   ];
  
//   // Keep track of current matches and position
//   let currentMatches = [];
//   let currentMatchIndex = -1;
  
//   // Highlight all matches and scroll to the first one
//   function performSearch() {
//     // Get search term
//     const searchTerm = searchInput.value.trim().toLowerCase();
    
//     if (!searchTerm) {
//       clearHighlights();
//       return;
//     }
    
//     clearHighlights();
//     currentMatches = [];
//     currentMatchIndex = -1;
    
//     // Find all elements that can contain searchable text
//     const elements = document.querySelectorAll(searchableElements.join(', '));
    
//     elements.forEach(element => {
//       // Get the element's text content
//       const text = element.textContent.toLowerCase();
      
//       // Check if the element contains the search term
//       if (text.includes(searchTerm)) {
//         // Highlight the matches in the element's HTML
//         const originalHTML = element.innerHTML;
//         const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
//         const newHTML = originalHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
        
//         // Only update if there was a change to avoid unnecessary reflows
//         if (newHTML !== originalHTML) {
//           element.innerHTML = newHTML;
          
//           // Add all highlighted elements to the matches array
//           const highlights = element.querySelectorAll('.search-highlight');
//           highlights.forEach(highlight => {
//             currentMatches.push(highlight);
//           });
//         }
//       }
//     });
    
//     // Scroll to the first match if any were found
//     if (currentMatches.length > 0) {
//       currentMatchIndex = 0;
//       scrollToMatch(currentMatches[currentMatchIndex]);
      
//       // Show result count
//       showSearchResults(currentMatches.length);
//     } else {
//       showNoResults();
//     }
//   }
  
//   // Display search result count
//   function showSearchResults(count) {
//     // Create or update results notification
//     let resultsNotification = document.getElementById('search-results-count');
    
//     if (!resultsNotification) {
//       resultsNotification = document.createElement('div');
//       resultsNotification.id = 'search-results-count';
//       resultsNotification.className = 'search-results-count';
//       document.querySelector('.search-container').appendChild(resultsNotification);
//     }
    
//     resultsNotification.textContent = `${count} match${count === 1 ? '' : 'es'} found`;
//     resultsNotification.style.display = 'block';
    
//     // Add navigation buttons if there's more than one result
//     if (count > 1) {
//       resultsNotification.innerHTML += `
//         <div class="search-navigation">
//           <button id="prev-match" title="Previous match"><i class="fas fa-chevron-up"></i></button>
//           <span id="match-position">1/${count}</span>
//           <button id="next-match" title="Next match"><i class="fas fa-chevron-down"></i></button>
//         </div>
//       `;
      
//       // Set up navigation buttons
//       document.getElementById('prev-match').addEventListener('click', navigateToPrevMatch);
//       document.getElementById('next-match').addEventListener('click', navigateToNextMatch);
//     }
//   }
  
//   // Show no results message
//   function showNoResults() {
//     let resultsNotification = document.getElementById('search-results-count');
    
//     if (!resultsNotification) {
//       resultsNotification = document.createElement('div');
//       resultsNotification.id = 'search-results-count';
//       resultsNotification.className = 'search-results-count';
//       document.querySelector('.search-container').appendChild(resultsNotification);
//     }
    
//     resultsNotification.textContent = 'No matches found';
//     resultsNotification.style.display = 'block';
//   }
  
//   // Navigate to the next match
//   function navigateToNextMatch() {
//     if (currentMatches.length === 0) return;
    
//     currentMatchIndex = (currentMatchIndex + 1) % currentMatches.length;
//     scrollToMatch(currentMatches[currentMatchIndex]);
//     updateMatchPosition();
//   }
  
//   // Navigate to the previous match
//   function navigateToPrevMatch() {
//     if (currentMatches.length === 0) return;
    
//     currentMatchIndex = (currentMatchIndex - 1 + currentMatches.length) % currentMatches.length;
//     scrollToMatch(currentMatches[currentMatchIndex]);
//     updateMatchPosition();
//   }
  
//   // Update the current position counter
//   function updateMatchPosition() {
//     const positionElement = document.getElementById('match-position');
//     if (positionElement) {
//       positionElement.textContent = `${currentMatchIndex + 1}/${currentMatches.length}`;
//     }
//   }
  
//   // Scroll to a specific match with smooth animation
//   function scrollToMatch(element) {
//     // Remove active class from all matches
//     currentMatches.forEach(match => {
//       match.classList.remove('search-highlight-active');
//     });
    
//     // Add active class to current match
//     element.classList.add('search-highlight-active');
    
//     // Scroll the element into view
//     element.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center'
//     });
//   }
  
//   // Clear all search highlights
//   function clearHighlights() {
//     // Remove the results notification
//     const resultsNotification = document.getElementById('search-results-count');
//     if (resultsNotification) {
//       resultsNotification.style.display = 'none';
//     }
    
//     // Find all highlights and unwrap them
//     const highlights = document.querySelectorAll('.search-highlight');
//     highlights.forEach(highlight => {
//       const parent = highlight.parentNode;
//       while (highlight.firstChild) {
//         parent.insertBefore(highlight.firstChild, highlight);
//       }
//       parent.removeChild(highlight);
//     });
//   }
  
//   // Escape special characters for use in regex
//   function escapeRegExp(string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   }
  
//   // Add event listeners
//   searchBtn.addEventListener('click', performSearch);
  
//   // Also perform search when Enter key is pressed in the search box
//   searchInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//       performSearch();
//     }
//   });
  
//   // Clear search when the input is cleared
//   searchInput.addEventListener('input', () => {
//     if (searchInput.value.trim() === '') {
//       clearHighlights();
//     }
//   });
// });



// Search functionality for Number Behavior application

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  // Elements that should be searched
  const searchableElements = [
    '.intro', '.analysis-step', '.calculation', '.factorial-analysis',
    '.scale', '.conclusion', '.parent-child-relation', '.process',
    'h1', 'h2', 'h3', 'h4', 'h5', 'p', '.steps'
  ];
  
  // Keep track of current matches and position
  let currentMatches = [];
  let currentMatchIndex = -1;
  let originalContent = new Map(); // Store original content
  
  // Highlight all matches and scroll to the first one
  function performSearch() {
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
      restoreOriginalContent();
      return;
    }
    
    // Restore previous search content first
    restoreOriginalContent();
    
    currentMatches = [];
    currentMatchIndex = -1;
    
    // Find all elements that can contain searchable text
    const elements = document.querySelectorAll(searchableElements.join(', '));
    
    elements.forEach(element => {
      // Skip elements that are inside highlights to avoid nesting issues
      if (element.closest('.search-highlight')) {
        return;
      }
      
      // Get the element's text content
      const text = element.textContent.toLowerCase();
      
      // Check if the element contains the search term
      if (text.includes(searchTerm)) {
        // Store original content before modification
        if (!originalContent.has(element)) {
          originalContent.set(element, {
            html: element.innerHTML,
            classes: [...element.classList]
          });
        }
        
        // Use a more careful approach for highlighting
        highlightTextInNode(element, searchTerm);
      }
    });
    
    // Get all the highlighted elements
    const highlights = document.querySelectorAll('.search-highlight');
    currentMatches = Array.from(highlights);
    
    // Scroll to the first match if any were found
    if (currentMatches.length > 0) {
      currentMatchIndex = 0;
      scrollToMatch(currentMatches[currentMatchIndex]);
      
      // Show result count
      showSearchResults(currentMatches.length);
    } else {
      showNoResults();
    }
  }
  
  // More careful text highlighting using DOM manipulation instead of innerHTML
  function highlightTextInNode(element, searchTerm) {
    // Skip script, style and other non-content elements
    if (['SCRIPT', 'STYLE', 'META', 'LINK'].includes(element.tagName)) {
      return;
    }
    
    // Create a temporary container to work with
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = element.innerHTML;
    
    // Process text nodes within the element
    const textNodes = getTextNodesIn(tempContainer);
    const regex = new RegExp(escapeRegExp(searchTerm), 'gi');
    
    let matchFound = false;
    
    textNodes.forEach(node => {
      const text = node.textContent;
      if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchFound = true;
        
        // Replace the text with highlighted version
        const parts = text.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));
        const fragment = document.createDocumentFragment();
        
        parts.forEach(part => {
          if (part.toLowerCase() === searchTerm.toLowerCase()) {
            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = part;
            fragment.appendChild(mark);
          } else if (part.length > 0) {
            fragment.appendChild(document.createTextNode(part));
          }
        });
        
        // Replace the original text node with our fragment
        node.parentNode.replaceChild(fragment, node);
      }
    });
    
    if (matchFound) {
      // Update the element with our modified content
      element.innerHTML = tempContainer.innerHTML;
    }
  }
  
  // Get all text nodes within an element
  function getTextNodesIn(node) {
    const textNodes = [];
    
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      const children = node.childNodes;
      for (let i = 0; i < children.length; i++) {
        textNodes.push(...getTextNodesIn(children[i]));
      }
    }
    
    return textNodes;
  }
  
  // Restore original content before search
  function restoreOriginalContent() {
    originalContent.forEach((content, element) => {
      if (element && element.parentNode) {
        element.innerHTML = content.html;
        
        // Restore original classes
        element.className = content.classes.join(' ');
      }
    });
    
    originalContent.clear();
    currentMatches = [];
    
    // Hide the results notification
    const resultsNotification = document.getElementById('search-results-count');
    if (resultsNotification) {
      resultsNotification.style.display = 'none';
    }
  }
  
  // Display search result count
  function showSearchResults(count) {
    // Create or update results notification
    let resultsNotification = document.getElementById('search-results-count');
    
    if (!resultsNotification) {
      resultsNotification = document.createElement('div');
      resultsNotification.id = 'search-results-count';
      resultsNotification.className = 'search-results-count';
      document.querySelector('.search-container').appendChild(resultsNotification);
    }
    
    resultsNotification.textContent = `${count} match${count === 1 ? '' : 'es'} found`;
    resultsNotification.style.display = 'block';
    
    // Add navigation buttons if there's more than one result
    if (count > 1) {
      resultsNotification.innerHTML += `
        <div class="search-navigation">
          <button id="prev-match" title="Previous match"><i class="fas fa-chevron-up"></i></button>
          <span id="match-position">1/${count}</span>
          <button id="next-match" title="Next match"><i class="fas fa-chevron-down"></i></button>
        </div>
      `;
      
      // Set up navigation buttons
      document.getElementById('prev-match').addEventListener('click', navigateToPrevMatch);
      document.getElementById('next-match').addEventListener('click', navigateToNextMatch);
    }
  }
  
  // Show no results message
  function showNoResults() {
    let resultsNotification = document.getElementById('search-results-count');
    
    if (!resultsNotification) {
      resultsNotification = document.createElement('div');
      resultsNotification.id = 'search-results-count';
      resultsNotification.className = 'search-results-count';
      document.querySelector('.search-container').appendChild(resultsNotification);
    }
    
    resultsNotification.textContent = 'No matches found';
    resultsNotification.style.display = 'block';
  }
  
  // Navigate to the next match
  function navigateToNextMatch() {
    if (currentMatches.length === 0) return;
    
    currentMatchIndex = (currentMatchIndex + 1) % currentMatches.length;
    scrollToMatch(currentMatches[currentMatchIndex]);
    updateMatchPosition();
  }
  
  // Navigate to the previous match
  function navigateToPrevMatch() {
    if (currentMatches.length === 0) return;
    
    currentMatchIndex = (currentMatchIndex - 1 + currentMatches.length) % currentMatches.length;
    scrollToMatch(currentMatches[currentMatchIndex]);
    updateMatchPosition();
  }
  
  // Update the current position counter
  function updateMatchPosition() {
    const positionElement = document.getElementById('match-position');
    if (positionElement) {
      positionElement.textContent = `${currentMatchIndex + 1}/${currentMatches.length}`;
    }
  }
  
  // Scroll to a specific match with smooth animation
  function scrollToMatch(element) {
    // Remove active class from all matches
    currentMatches.forEach(match => {
      match.classList.remove('search-highlight-active');
    });
    
    // Add active class to current match
    element.classList.add('search-highlight-active');
    
    // Scroll the element into view
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
  
  // Escape special characters for use in regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Add event listeners
  searchBtn.addEventListener('click', performSearch);
  
  // Also perform search when Enter key is pressed in the search box
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Clear search when the input is cleared
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      restoreOriginalContent();
    }
  });
});



