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



const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'scrappers', 'purchase_edu_links.json');
const outputPath = path.join(__dirname, 'link-text-content.js'); function cleanTextForVoice(text) {if (!text) return '';


  let cleaned = text.replace(/^[\d\-–—\(\)\[\]\{\}.,:#@]+\s*/g, '');


  if (/^\d{4,}-[a-z0-9-]+$/.test(cleaned)) {

    cleaned = cleaned.replace(/^\d+-(.*)/g, '$1').replace(/-/g, ' ');
  }


  cleaned = cleaned.replace(/^\d+\s+total$/i, '');


  cleaned = cleaned.replace(/\s+[•|\-:]\s+/g, ' ');


  cleaned = cleaned.replace(/\s+•\s+Purchase College$/i, '');
  cleaned = cleaned.replace(/\s+at Purchase College$/i, ' at Purchase');


  cleaned = cleaned.
  replace(/^SUNY /i, 'S U N Y ').
  replace(/^FAQ/i, 'F A Q ').
  replace(/^A\+D /i, 'A and D ');


  if (cleaned.length > 60 && cleaned.includes(',')) {

    cleaned = cleaned.split(',')[0].trim();
  }


  if (/^\d+$/.test(cleaned)) return '';


  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

try {

  const rawData = fs.readFileSync(inputPath, 'utf8');
  const linksData = JSON.parse(rawData);


  let textValues = [];


  linksData.forEach((link) => {
    if (link.text) {
      const cleanedText = cleanTextForVoice(link.text);
      if (cleanedText) textValues.push(cleanedText);
    }


    if (Array.isArray(link.children)) {
      link.children.forEach((child) => {
        if (child.text) {
          const cleanedChildText = cleanTextForVoice(child.text);
          if (cleanedChildText) textValues.push(cleanedChildText);
        }
      });
    }
  });


  const uniqueTextValues = [...new Set(textValues)];


  const filteredValues = uniqueTextValues.filter((text) => text.length > 2);


  filteredValues.sort();


  const originalMapping = {};

  linksData.forEach((link) => {
    if (link.text) {
      const cleaned = cleanTextForVoice(link.text);
      if (cleaned) {
        originalMapping[cleaned] = link.url;
      }
    }
  });


  const jsContent = `

const linkTextContent = ${JSON.stringify(filteredValues, null, 2)};


const linkTextToUrlMap = ${JSON.stringify(originalMapping, null, 2)};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    linkTextContent,
    linkTextToUrlMap
  };
} else {
  
  window.linkTextContent = linkTextContent;
  window.linkTextToUrlMap = linkTextToUrlMap;
}
`;


  fs.writeFileSync(outputPath, jsContent, 'utf8');

  console.log(`Successfully extracted and cleaned ${filteredValues.length} unique text values from ${linksData.length} links.`);
  console.log(`Original mappings preserved: ${Object.keys(originalMapping).length}`);
  console.log(`Output written to: ${outputPath}`);


  const textFilePath = path.join(__dirname, 'cleaned-link-text.txt');
  fs.writeFileSync(textFilePath, filteredValues.join('\n'), 'utf8');
  console.log(`Clean text list for review: ${textFilePath}`);

} catch (error) {
  console.error('Error processing links data:', error);
}