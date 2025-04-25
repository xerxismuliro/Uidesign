
/**
 * This script extracts the text content from the Purchase College links JSON
 * and creates a JavaScript file with the text values for voice command matching.
 */

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'scrappers', 'purchase_edu_links.json');
const outputPath = path.join(__dirname, 'link-text-content.js');

try {
  // Read the input file
  const rawData = fs.readFileSync(inputPath, 'utf8');
  const linksData = JSON.parse(rawData);
  
  // Extract just the text values and remove duplicates
  let textValues = linksData
    .map(link => link.text?.trim())
    .filter(text => text && text.length > 0); // Remove empty or undefined values
  
  // Remove duplicates by converting to Set and back to array
  const uniqueTextValues = [...new Set(textValues)];
  
  // Sort alphabetically for easier reference
  uniqueTextValues.sort();
  
  // Create JavaScript module content
  const jsContent = `/**
 * This file contains all the text values extracted from Purchase College links
 * for use in voice recognition matching.
 */

const linkTextContent = ${JSON.stringify(uniqueTextValues, null, 2)};

// Export the array for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = linkTextContent;
} else {
  // For browser environments
  window.linkTextContent = linkTextContent;
}
`;
  
  // Write to output file
  fs.writeFileSync(outputPath, jsContent, 'utf8');
  
  console.log(`Successfully extracted ${uniqueTextValues.length} unique text values from ${linksData.length} links.`);
  console.log(`Output written to: ${outputPath}`);
  
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