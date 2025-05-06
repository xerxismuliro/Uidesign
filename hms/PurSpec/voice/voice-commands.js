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

      if (command === linkText || command === `go to ${linkText}` || command === `open ${linkText}`) {
        console.log(`Direct match with link text: "${link.text}"`);
        handlePurchaseLinkVoiceCommand(command);
        return;
      }
    }

    const commonSections = [
    'admissions', 'academics', 'campus life', 'about',
    'arts', 'art', 'design', 'programs', 'majors',
    'apply now', 'housing', 'tuition', 'financial aid'];


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
  } else


  if (command.includes("dark mode")) {
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: 'dark' } }));
    playAudioFeedback('success');
    speakFeedback("Dark mode activated");
    return;
  } else
  if (command.includes("light mode")) {
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: 'light' } }));
    playAudioFeedback('success');
    speakFeedback("Light mode activated");
    return;
  } else


  if (command.includes("show voice commands") || command.includes("voice commands") ||
  command.includes("available commands") || command.includes("what can i say") ||
  command.includes("voice help") || command.includes("voice options") ||
  command.includes("voice features") || command === "commands") {
    showSection("voice-commands");
    playAudioFeedback('success');
    speakFeedback("Showing voice commands");
    return;
  } else
  if (command.includes("show bookmarks") || command.includes("bookmarks") ||
  command.includes("saved sites") || command.includes("my bookmarks") ||
  command.includes("favorite sites") || command.includes("favorites") ||
  command.includes("saved pages") || command === "saved" ||
  command === "show my bookmarks") {
    showSection("bookmarks");
    playAudioFeedback('success');
    speakFeedback("Showing bookmarks");
    return;
  } else
  if (command.includes("show history") || command.includes("history") ||
  command.includes("browsing history") || command.includes("recent sites") ||
  command.includes("recently visited") || command.includes("past sites") ||
  command.includes("show my history") || command.includes("what did i visit") ||
  command === "recent") {
    showSection("history");
    playAudioFeedback('success');
    speakFeedback("Showing browser history");
    return;
  } else
  if (command.includes("show settings") || command.includes("settings") ||
  command.includes("preferences") || command.includes("options") ||
  command.includes("configuration") || command.includes("app settings") ||
  command.includes("change settings") || command.includes("setup") ||
  command === "configure") {
    showSection("settings");
    playAudioFeedback('success');
    speakFeedback("Showing settings");
    return;
  } else
  if (command.includes("show help") || command.includes("help") ||
  command.includes("support") || command.includes("assistance") ||
  command.includes("how to use") || command.includes("instructions") ||
  command.includes("guide") || command.includes("tutorial") ||
  command === "how do i use this") {
    showSection("help");
    playAudioFeedback('success');
    speakFeedback("Showing help information");
    return;
  } else
  if (command.includes("show accessibility") || command.includes("accessibility") ||
  command.includes("accessible options") || command.includes("access features") ||
  command.includes("accessibility settings") || command.includes("a11y") ||
  command.includes("accommodations") || command.includes("assistive features") ||
  command === "access") {
    showSection("accessibility");
    playAudioFeedback('success');
    speakFeedback("Showing accessibility options");
    return;
  } else
  if (command.includes('show purchase links')) {
    showSection('purchase-links');
    playAudioFeedback('success');
    speakFeedback("Showing Purchase College links");
    return;
  } else


  if (command.includes("stop listening")) {
    recognition.stop();
    playAudioFeedback('stop');
    speakFeedback("Stopping voice recognition", true);
    return;
  } else
  if (command.includes("home") || command.includes("go home")) {
    showSection("default");
    playAudioFeedback('success');
    speakFeedback("Going to home page");
    return;
  } else
  if (command.includes("refresh") || command.includes("reload")) {
    speakFeedback("Refreshing page");
    playAudioFeedback('success');
    setTimeout(() => {
      refreshCurrentContent();
    }, 500);
    return;
  } else
  {

    playAudioFeedback('error');
    speakFeedback("Sorry, I didn't understand that command");
  }
}