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



document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');


  const searchableElements = [
  '.intro', '.analysis-step', '.calculation', '.factorial-analysis',
  '.scale', '.conclusion', '.parent-child-relation', '.process',
  'h1', 'h2', 'h3', 'h4', 'h5', 'p', '.steps'];



  let currentMatches = [];
  let currentMatchIndex = -1;
  let originalContent = new Map(); 
  function performSearch() {

    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
      restoreOriginalContent();
      return;
    }


    restoreOriginalContent();

    currentMatches = [];
    currentMatchIndex = -1;


    const elements = document.querySelectorAll(searchableElements.join(', '));

    elements.forEach((element) => {

      if (element.closest('.search-highlight')) {
        return;
      }


      const text = element.textContent.toLowerCase();


      if (text.includes(searchTerm)) {

        if (!originalContent.has(element)) {
          originalContent.set(element, {
            html: element.innerHTML,
            classes: [...element.classList]
          });
        }


        highlightTextInNode(element, searchTerm);
      }
    });


    const highlights = document.querySelectorAll('.search-highlight');
    currentMatches = Array.from(highlights);


    if (currentMatches.length > 0) {
      currentMatchIndex = 0;
      scrollToMatch(currentMatches[currentMatchIndex]);


      showSearchResults(currentMatches.length);
    } else {
      showNoResults();
    }
  } function highlightTextInNode(element, searchTerm) {
    if (['SCRIPT', 'STYLE', 'META', 'LINK'].includes(element.tagName)) {
      return;
    }


    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = element.innerHTML;


    const textNodes = getTextNodesIn(tempContainer);
    const regex = new RegExp(escapeRegExp(searchTerm), 'gi');

    let matchFound = false;

    textNodes.forEach((node) => {
      const text = node.textContent;
      if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchFound = true;


        const parts = text.split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));
        const fragment = document.createDocumentFragment();

        parts.forEach((part) => {
          if (part.toLowerCase() === searchTerm.toLowerCase()) {
            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = part;
            fragment.appendChild(mark);
          } else if (part.length > 0) {
            fragment.appendChild(document.createTextNode(part));
          }
        });


        node.parentNode.replaceChild(fragment, node);
      }
    });

    if (matchFound) {

      element.innerHTML = tempContainer.innerHTML;
    }
  } function getTextNodesIn(node) {const textNodes = [];

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
  function restoreOriginalContent() {
    originalContent.forEach((content, element) => {
      if (element && element.parentNode) {
        element.innerHTML = content.html;


        element.className = content.classes.join(' ');
      }
    });

    originalContent.clear();
    currentMatches = [];


    const resultsNotification = document.getElementById('search-results-count');
    if (resultsNotification) {
      resultsNotification.style.display = 'none';
    }
  } function showSearchResults(count) {

    let resultsNotification = document.getElementById('search-results-count');

    if (!resultsNotification) {
      resultsNotification = document.createElement('div');
      resultsNotification.id = 'search-results-count';
      resultsNotification.className = 'search-results-count';
      document.querySelector('.search-container').appendChild(resultsNotification);
    }

    resultsNotification.textContent = `${count} match${count === 1 ? '' : 'es'} found`;
    resultsNotification.style.display = 'block';


    if (count > 1) {
      resultsNotification.innerHTML += `
        <div class="search-navigation">
          <button id="prev-match" title="Previous match"><i class="fas fa-chevron-up"></i></button>
          <span id="match-position">1/${count}</span>
          <button id="next-match" title="Next match"><i class="fas fa-chevron-down"></i></button>
        </div>
      `;


      document.getElementById('prev-match').addEventListener('click', navigateToPrevMatch);
      document.getElementById('next-match').addEventListener('click', navigateToNextMatch);
    }
  } 
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
  function navigateToNextMatch() {
    if (currentMatches.length === 0) return;

    currentMatchIndex = (currentMatchIndex + 1) % currentMatches.length;
    scrollToMatch(currentMatches[currentMatchIndex]);
    updateMatchPosition();
  } 
  function navigateToPrevMatch() {
    if (currentMatches.length === 0) return;

    currentMatchIndex = (currentMatchIndex - 1 + currentMatches.length) % currentMatches.length;
    scrollToMatch(currentMatches[currentMatchIndex]);
    updateMatchPosition();
  } 
  function updateMatchPosition() {
    const positionElement = document.getElementById('match-position');
    if (positionElement) {
      positionElement.textContent = `${currentMatchIndex + 1}/${currentMatches.length}`;
    }
  } function scrollToMatch(element) {

    currentMatches.forEach((match) => {
      match.classList.remove('search-highlight-active');
    });


    element.classList.add('search-highlight-active');


    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  } function escapeRegExp(string) {return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  searchBtn.addEventListener('click', performSearch);


  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });


  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      restoreOriginalContent();
    }
  });
});