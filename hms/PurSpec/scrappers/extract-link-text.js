
/**
 * This script extracts the text content from the Purchase College links JSON
 * and creates a JavaScript file with the text values for voice command matching.
 */

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'scrappers', 'purchase_edu_links.json');
const outputPath = path.join(__dirname, 'link-text-content.js');

// Function to clean text for better voice recognition
function cleanTextForVoice(text) {
  if (!text) return '';
  
  // Step 1: Remove leading numbers, dashes, and special characters
  let cleaned = text.replace(/^[\d\-–—\(\)\[\]\{\}.,:#@]+\s*/g, '');
  
  // Step 2: Remove file names and numbers that look like IDs (e.g., 71956-creating-unique...)
  if (/^\d{4,}-[a-z0-9-]+$/.test(cleaned)) {
    // Extract just the readable part after the dash
    cleaned = cleaned.replace(/^\d+-(.*)/g, '$1').replace(/-/g, ' ');
  }
  
  // Step 3: Remove "total" when preceded by a number
  cleaned = cleaned.replace(/^\d+\s+total$/i, '');
  
  // Step 4: Remove common separator symbols (• | : etc.) from title text 
  cleaned = cleaned.replace(/\s+[•|\-:]\s+/g, ' ');
  
  // Step 5: Replace Purchase College at the end with just Purchase
  cleaned = cleaned.replace(/\s+•\s+Purchase College$/i, '');
  cleaned = cleaned.replace(/\s+at Purchase College$/i, ' at Purchase');
  
  // Step 6: Handle abbreviations and special cases
  cleaned = cleaned
    .replace(/^SUNY /i, 'S U N Y ')  // Spell out SUNY for voice recognition
    .replace(/^FAQ/i, 'F A Q ')      // Spell out FAQ for voice recognition
    .replace(/^A\+D /i, 'A and D '); // Replace + with "and" for voice
  
  // Step 7: Truncate very long descriptions to the first meaningful phrase
  if (cleaned.length > 60 && cleaned.includes(',')) {
    // Keep only content before the first comma for long texts
    cleaned = cleaned.split(',')[0].trim();
  }
  
  // Step 8: Remove any pure numerical entries
  if (/^\d+$/.test(cleaned)) return '';
  
  // Step 9: Final cleanup of extra spaces and trimming
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

try {
  // Read the input file
  const rawData = fs.readFileSync(inputPath, 'utf8');
  const linksData = JSON.parse(rawData);
  
  // Extract and clean text values
  let textValues = [];
  
  // Process main links
  linksData.forEach(link => {
    if (link.text) {
      const cleanedText = cleanTextForVoice(link.text);
      if (cleanedText) textValues.push(cleanedText);
    }
    
    // Also process text from children if they exist
    if (Array.isArray(link.children)) {
      link.children.forEach(child => {
        if (child.text) {
          const cleanedChildText = cleanTextForVoice(child.text);
          if (cleanedChildText) textValues.push(cleanedChildText);
        }
      });
    }
  });
  
  // Remove duplicates by converting to Set and back to array
  const uniqueTextValues = [...new Set(textValues)];
  
  // Filter out very short entries (likely not useful for voice commands)
  const filteredValues = uniqueTextValues.filter(text => text.length > 2);
  
  // Sort alphabetically for easier reference
  filteredValues.sort();
  
  // Create two arrays: one for cleaned values and one with original mapping
  const originalMapping = {};
  
  linksData.forEach(link => {
    if (link.text) {
      const cleaned = cleanTextForVoice(link.text);
      if (cleaned) {
        originalMapping[cleaned] = link.url;
      }
    }
  });
  
  // Create JavaScript module content
  const jsContent = `/**
 * This file contains all the text values extracted from Purchase College links
 * for use in voice recognition matching.
 * Generated on: ${new Date().toLocaleString()}
 * Total unique values: ${filteredValues.length}
 */

const linkTextContent = ${JSON.stringify(filteredValues, null, 2)};

// Original text to URL mapping for reference
const linkTextToUrlMap = ${JSON.stringify(originalMapping, null, 2)};

// Export the arrays for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    linkTextContent,
    linkTextToUrlMap
  };
} else {
  // For browser environments
  window.linkTextContent = linkTextContent;
  window.linkTextToUrlMap = linkTextToUrlMap;
}
`;
  
  // Write to output file
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  
  console.log(`Successfully extracted and cleaned ${filteredValues.length} unique text values from ${linksData.length} links.`);
  console.log(`Original mappings preserved: ${Object.keys(originalMapping).length}`);
  console.log(`Output written to: ${outputPath}`);
  
  // Also generate a simple text file for review
  const textFilePath = path.join(__dirname, 'cleaned-link-text.txt');
  fs.writeFileSync(textFilePath, filteredValues.join('\n'), 'utf8');
  console.log(`Clean text list for review: ${textFilePath}`);
  
} catch (error) {
  console.error('Error processing links data:', error);
}



















// // LinksContent text extraction Original script.
// // Load the JSON data from purchase_edu_links.json
// const fs = require('fs');
// const path = require('path');

// const inputPath = path.join(__dirname, '..', 'scrappers', 'purchase_edu_links.json');
// const outputPath = path.join(__dirname, 'purchase_link_texts.json');

// try {
//   // Read the input file
//   const rawData = fs.readFileSync(inputPath, 'utf8');
//   const linksData = JSON.parse(rawData);
  
//   // Extract just the text values and remove duplicates
//   let textValues = linksData
//     .map(link => link.text?.trim())
//     .filter(text => text && text.length > 0); // Remove empty or undefined values
  
//   // Remove duplicates by converting to Set and back to array
//   const uniqueTextValues = [...new Set(textValues)];
  
//   // Sort alphabetically for easier reference
//   uniqueTextValues.sort();
  
//   // Write to output file
//   fs.writeFileSync(
//     outputPath, 
//     JSON.stringify(uniqueTextValues, null, 2),
//     'utf8'
//   );
  
//   console.log(`Successfully extracted ${uniqueTextValues.length} unique text values from ${linksData.length} links.`);
//   console.log(`Output written to: ${outputPath}`);
  
// } catch (error) {
//   console.error('Error processing links data:', error);
// }