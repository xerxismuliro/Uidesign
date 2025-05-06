/**
 * Code developed by Isaac Muliro - UI/UX Designer, Web and Mobile app developer and Developer
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

// Configuration
const rootDir = __dirname; // Current directory
const attributionComment = {
  html: `<!--
  Code developed by Isaac Muliro - UI/UX Designer, Web and Mobile app developer and Developer
  
  Usage Guidelines:
  -  Code developed by Isaac Muliro - UI/UX Designer, Web and Mobile app developer and Developer
  - Maintain the responsive design principles when making changes mainly using flexbox
  - Follow established color schemes in the CSS variables for more controll over theme when changinh mode.
  - For questions or contributions, contact isaac.muliro@purchase.edu
  - Last updated: ${new Date().toISOString().split('T')[0]}
-->\n\n`,
  css: `/*
   Code developed by Isaac Muliro - UI/UX Designer, Web and Mobile app developer and Developer
  
  Usage Guidelines:
  - Maintain the CSS variable structure for theming
  - Mobile-first approach for all responsive styling
  - Class names follow BEM methodology
  - For questions or contributions, contact isaac.muliro@purchase.edu
  - Last updated: ${new Date().toISOString().split('T')[0]}
*/\n\n`,
  js: `/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: ${new Date().toISOString().split('T')[0]}
 */\n\n`
};

// File extensions to process
const extensions = ['.html', '.css', '.js'];

// Find all files recursively
/*
 * Function description
 * @param {*} dir
 * @returns {*} Return description
*/function findFiles(dir, fileList = []) {const files = fs.readdirSync(dir);files.forEach((file) => {const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.')) {
      // Recursively search directories, but skip hidden ones
      findFiles(filePath, fileList);
    } else if (stat.isFile() && extensions.includes(path.extname(filePath).toLowerCase())) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Remove comments from code
/*
 * Function description
 * @param {*} content
 * @param {*} fileExt
 * @returns {*} Return description
*/function removeComments(content, fileExt) {switch (fileExt) {case '.html': // Remove HTML comments
      return content.replace(/<!--[\s\S]*?-->/g, '');case '.css': // Remove CSS comments
      return content.replace(/\/\*[\s\S]*?\*\//g, '');
    case '.js':
      // Remove JS single-line comments
      let result = content.replace(/\/\/.*$/gm, '');
      // Remove JS multi-line comments
      return result.replace(/\/\*[\s\S]*?\*\//g, '');
    default:
      return content;
  }
}

// Process each file
/*
 * Function description
 * @param {*} filePath
*/function processFile(filePath) {const ext = path.extname(filePath).toLowerCase();let content = fs.readFileSync(filePath, 'utf8');
  // Remove existing comments
  content = removeComments(content, ext);

  // Add attribution comment at the top
  const comment = attributionComment[ext.substring(1)];
  content = comment + content;

  // Write the file back
  fs.writeFileSync(filePath, content);
  console.log(`Processed: ${filePath}`);
}

// Main function
/*
 * Function description
*/function main() {console.log('Starting to process files...');const files = findFiles(rootDir);

  files.forEach((file) => {
    processFile(file);
  });

  console.log(`Done! Processed ${files.length} files.`);
}

main();