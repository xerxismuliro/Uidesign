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


const rootDir = __dirname; 
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
  css: `\n\n`,
  js: `\n\n`
};


const extensions = ['.html', '.css', '.js'];


function findFiles(dir, fileList = []) {const files = fs.readdirSync(dir);files.forEach((file) => {const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.')) {
      
      findFiles(filePath, fileList);
    } else if (stat.isFile() && extensions.includes(path.extname(filePath).toLowerCase())) {
      fileList.push(filePath);
    }
  });

  return fileList;
}


function removeComments(content, fileExt) {switch (fileExt) {case '.html': 
      return content.replace(/<!--[\s\S]*?-->/g, '');case '.css': 
      return content.replace(/\/\*[\s\S]*?\*\
    case '.js':
      
      let result = content.replace(/\/\/.*$/gm, '');
      
      return result.replace(/\/\*[\s\S]*?\*\
    default:
      return content;
  }
}


function processFile(filePath) {const ext = path.extname(filePath).toLowerCase();let content = fs.readFileSync(filePath, 'utf8');
  
  content = removeComments(content, ext);

  
  const comment = attributionComment[ext.substring(1)];
  content = comment + content;

  
  fs.writeFileSync(filePath, content);
  console.log(`Processed: ${filePath}`);
}


function main() {console.log('Starting to process files...');const files = findFiles(rootDir);

  files.forEach((file) => {
    processFile(file);
  });

  console.log(`Done! Processed ${files.length} files.`);
}

main();