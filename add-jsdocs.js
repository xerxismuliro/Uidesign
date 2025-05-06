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
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;


const rootDir = __dirname; 
const currentScriptName = path.resolve(__filename); 
console.log(`Current script: ${currentScriptName} - This file will be excluded from processing`);

const attributionComment = {
  js: `\n\n`
};


function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const absolutePath = path.resolve(filePath);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.')) {
      
      findJsFiles(filePath, fileList);
    } else if (stat.isFile() && path.extname(filePath).toLowerCase() === '.js') {
      
      if (absolutePath !== currentScriptName && !absolutePath.includes('add-jsdocs.js')) {
        fileList.push(filePath);
      } else {
        console.log(`Skipping self: ${filePath}`);
      }
    }
  });
  
  return fileList;
}


function analyzeFunctionName(name) {
  if (!name) return "Performs a function";
  
  
  const prefixMap = {
    'get': 'Retrieves',
    'fetch': 'Fetches',
    'set': 'Sets',
    'update': 'Updates',
    'create': 'Creates',
    'delete': 'Deletes',
    'remove': 'Removes',
    'add': 'Adds',
    'calculate': 'Calculates',
    'check': 'Checks',
    'is': 'Checks if',
    'has': 'Checks if has',
    'validate': 'Validates',
    'format': 'Formats',
    'convert': 'Converts',
    'parse': 'Parses',
    'handle': 'Handles',
    'process': 'Processes',
    'render': 'Renders',
    'display': 'Displays',
    'init': 'Initializes',
    'setup': 'Sets up',
    'load': 'Loads',
    'save': 'Saves',
    'find': 'Finds',
    'search': 'Searches for',
    'filter': 'Filters',
    'sort': 'Sorts',
    'transform': 'Transforms',
    'build': 'Builds',
    'generate': 'Generates',
    'compute': 'Computes',
    'toggle': 'Toggles',
    'show': 'Shows',
    'hide': 'Hides',
    'on': 'Handles',
    'off': 'Disables',
    'enable': 'Enables',
    'disable': 'Disables',
    'reset': 'Resets',
    'clear': 'Clears',
    'open': 'Opens',
    'close': 'Closes',
    'start': 'Starts',
    'stop': 'Stops',
    'pause': 'Pauses',
    'resume': 'Resumes'
  };
  
  
  for (const [prefix, description] of Object.entries(prefixMap)) {
    if (name.startsWith(prefix) && (prefix === name || name[prefix.length].toUpperCase() === name[prefix.length])) {
      
      const restOfName = name.substring(prefix.length);
      const readable = restOfName
        
        .replace(/([A-Z])/g, ' $1')
        
        .replace(/ Id/g, ' ID')
        
        .trim()
        .toLowerCase();
      
      return `${description} ${readable}`;
    }
  }
  
  
  const readable = name
    .replace(/([A-Z])/g, ' $1')
    .replace(/ Id/g, ' ID')
    .trim();
  
  return `Handles ${readable.toLowerCase()}`;
}


function inferParamType(paramName, functionBody) {
  const lowerName = paramName.toLowerCase();

  
  if (/id$/i.test(paramName) || paramName === 'id') return 'string|number';
  if (/count$/i.test(paramName) || /number$/i.test(paramName) || /index$/i.test(paramName) || /length$/i.test(paramName)) return 'number';
  if (/name$/i.test(paramName) || /title$/i.test(paramName) || /text$/i.test(paramName) || /description$/i.test(paramName)) return 'string';
  if (/enabled$/i.test(paramName) || /visible$/i.test(paramName) || /active$/i.test(paramName) || /checked$/i.test(paramName) || /selected$/i.test(paramName) || paramName.startsWith('is') || paramName.startsWith('has')) return 'boolean';
  if (/\bdate\b/i.test(paramName) || /time$/i.test(paramName)) return 'Date';
  if (/arr/i.test(paramName) || /list$/i.test(paramName) || /items$/i.test(paramName) || paramName.endsWith('s') && !/(ss|[aeiouy]s)$/i.test(paramName)) return 'Array';
  if (/obj/i.test(paramName) || /options$/i.test(paramName) || /config$/i.test(paramName) || /props$/i.test(paramName) || /params$/i.test(paramName)) return 'Object';
  if (/cb$/i.test(paramName) || /callback$/i.test(paramName) || /func$/i.test(paramName) || /handler$/i.test(paramName) || /fn$/i.test(paramName)) return 'function';
  if (/event$/i.test(paramName) || paramName === 'e' || paramName === 'evt') return 'Event';
  if (/element$/i.test(paramName) || /el$/i.test(paramName) || /node$/i.test(paramName)) return 'HTMLElement';
  
  
  if (functionBody) {
    const bodyStr = functionBody.toString();
    if (bodyStr.includes(`typeof ${paramName} === 'string'`) || bodyStr.includes(`${paramName}.charAt`) || bodyStr.includes(`${paramName}.substring`)) return 'string';
    if (bodyStr.includes(`typeof ${paramName} === 'number'`) || bodyStr.includes(`${paramName} <`) || bodyStr.includes(`${paramName} >`)) return 'number';
    if (bodyStr.includes(`typeof ${paramName} === 'boolean'`)) return 'boolean';
    if (bodyStr.includes(`Array.isArray(${paramName})`) || bodyStr.includes(`${paramName}.forEach`) || bodyStr.includes(`${paramName}.map`)) return 'Array';
    if (bodyStr.includes(`${paramName}.then`) || bodyStr.includes(`await ${paramName}`)) return 'Promise';
  }
  
  return '*';
}


function inferReturnType(node) {
  let returnType = null;
  
  traverse(node, {
    ReturnStatement(path) {
      const arg = path.node.argument;
      
      if (!arg) {
        returnType = returnType || 'void';
        return;
      }
      
      
      if (arg.type === 'StringLiteral' || arg.type === 'TemplateLiteral') {
        returnType = 'string';
      } else if (arg.type === 'NumericLiteral') {
        returnType = 'number';
      } else if (arg.type === 'BooleanLiteral') {
        returnType = 'boolean';
      } else if (arg.type === 'ArrayExpression') {
        returnType = 'Array';
      } else if (arg.type === 'ObjectExpression') {
        returnType = 'Object';
      } else if (arg.type === 'NewExpression' && arg.callee.name === 'Promise') {
        returnType = 'Promise';
      } else if (arg.type === 'NewExpression' && arg.callee.name === 'Date') {
        returnType = 'Date';
      } else if (arg.type === 'FunctionExpression' || arg.type === 'ArrowFunctionExpression') {
        returnType = 'function';
      } else if (arg.type === 'CallExpression' && arg.callee.name === 'require') {
        returnType = 'object';
      } else {
        
        if (arg.type === 'Identifier') {
          const name = arg.name.toLowerCase();
          if (name.includes('element') || name.endsWith('el')) {
            returnType = 'HTMLElement';
          } else if (name.includes('arr') || name.endsWith('s') && !name.endsWith('ss')) {
            returnType = 'Array';
          } else if (name.includes('obj') || name.includes('data') || name.includes('config')) {
            returnType = 'Object';
          } else if (name.includes('promise') || name.includes('async')) {
            returnType = 'Promise';
          } else if (name.includes('count') || name.includes('num') || name.includes('index')) {
            returnType = 'number';
          } else if (name.includes('text') || name.includes('name') || name.includes('str')) {
            returnType = 'string';
          } else if (name.includes('bool') || name.startsWith('is') || name.startsWith('has')) {
            returnType = 'boolean';
          }
        }
        
        
        returnType = returnType || '*';
      }
    }
  }, { node });
  
  return returnType || 'void';
}


function extractFunctionBody(node) {
  let body;
  
  if (node.body && node.body.type === 'BlockStatement') {
    body = node.body;
  } else if (node.body) {
    body = node.body; 
  }
  
  return body;
}


function generateJSDoc(node, functionName = null) {
  const params = [];
  const functionBody = extractFunctionBody(node);
  
  
  let name = functionName;
  if (!name && node.id) {
    name = node.id.name;
  }
  
  
  const description = analyzeFunctionName(name);
  
  
  if (node.params) {
    node.params.forEach(param => {
      if (param.name) {
        const paramType = inferParamType(param.name, functionBody);
        const lowerName = param.name.toLowerCase();
        let paramDesc = '';
        
        
        if (lowerName.includes('callback')) {
          paramDesc = 'Callback function to execute';
        } else if (lowerName.includes('options')) {
          paramDesc = 'Configuration options';
        } else if (lowerName.includes('event')) {
          paramDesc = 'The event object';
        } else if (lowerName.includes('element')) {
          paramDesc = 'DOM element to operate on';
        } else if (lowerName.includes('id')) {
          paramDesc = 'Unique identifier';
        } else if (lowerName.includes('data')) {
          paramDesc = 'Data to process';
        } else {
          
          paramDesc = param.name
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase();
        }
        
        params.push(`@param {${paramType}} ${param.name} ${paramDesc}`);
      }
    });
  }

  
  const returnType = inferReturnType(node);
  
  
  let returnDesc = 'The result';
  if (returnType === 'boolean') {
    returnDesc = name && name.startsWith('is') ? 'True if condition is met, false otherwise' : 'Success flag';
  } else if (returnType === 'Promise') {
    returnDesc = 'A promise that resolves when operation completes';
  } else if (returnType === 'HTMLElement') {
    returnDesc = 'The DOM element';
  } else if (returnType === 'Array') {
    returnDesc = 'Array of results';
  } else if (returnType === 'Object') {
    returnDesc = 'Result object';
  }

  
  let jsDoc = '';

  return jsDoc;
}


function addJSDocToFile(filePath) {
  
  const absolutePath = path.resolve(filePath);
  if (absolutePath === currentScriptName || absolutePath.includes('add-jsdocs.js')) {
    console.log(`Skipping self (double-check): ${filePath}`);
    return false;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    
    
    content = content.replace(/^\/\*\*[\s\S]*?\*\/\s*/, '');
    content = attributionComment.js + content;

    
    const ast = parser.parse(content, {
      sourceType: "module",
      plugins: ["jsx"]
    });
    
    
    let insertedPositions = [];
    
    
    traverse(ast, {
      FunctionDeclaration(path) {
        
        if (path.node.leadingComments && 
            path.node.leadingComments.some(comment => comment.type === 'CommentBlock' && 
            comment.value.includes('*'))) {
          return;
        }
        
        
        const jsDoc = generateJSDoc(path.node);
        
        
        path.addComment('leading', jsDoc.slice(3, -3)); 
        insertedPositions.push(path.node.start);
      },
      
      ArrowFunctionExpression(path) {
        
        if (path.parent.type === 'VariableDeclarator' && 
            !path.findParent(parent => insertedPositions.includes(parent.node.start))) {
          
          
          const parentPath = path.findParent(p => p.isVariableDeclaration());
          if (parentPath && parentPath.node.leadingComments && 
              parentPath.node.leadingComments.some(comment => comment.type === 'CommentBlock' && 
              comment.value.includes('*'))) {
            return;
          }
          
          
          let functionName = null;
          if (path.parent.id && path.parent.id.name) {
            functionName = path.parent.id.name;
          }
          
          
          const jsDoc = generateJSDoc(path.node, functionName);
          
          
          if (parentPath) {
            parentPath.addComment('leading', jsDoc.slice(3, -3));
            insertedPositions.push(parentPath.node.start);
          }
        }
      },
      
      ClassMethod(path) {
        
        if (path.node.leadingComments && 
            path.node.leadingComments.some(comment => comment.type === 'CommentBlock' && 
            comment.value.includes('*'))) {
          return;
        }
        
        
        const methodName = path.node.key.name;
        
        
        const jsDoc = generateJSDoc(path.node, methodName);
        
        
        path.addComment('leading', jsDoc.slice(3, -3));
        insertedPositions.push(path.node.start);
      }
    });
    
    
    const output = generate(ast, {
      retainLines: true,
      comments: true
    }, content);
    
    
    if (output.code !== originalContent) {
      fs.writeFileSync(filePath, output.code);
      console.log(`Added intelligent JSDoc to: ${filePath}`);
      return true;
    } else {
      console.log(`No changes needed for: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}


function main() {
  console.log('Starting to add intelligent JSDoc comments to JavaScript files...');
  
  
  try {
    require('@babel/parser');
    require('@babel/traverse');
    require('@babel/generator');
  } catch (err) {
    console.error('Missing required dependencies. Please install them first:');
    console.error('npm install @babel/parser @babel/traverse @babel/generator');
    process.exit(1);
  }
  
  const files = findJsFiles(rootDir);
  let modifiedFiles = 0;
  
  console.log(`Found ${files.length} JavaScript files (excluding this script).`);
  
  files.forEach(file => {
    if (addJSDocToFile(file)) {
      modifiedFiles++;
    }
  });
  
  console.log(`Done! Added intelligent JSDoc to ${modifiedFiles} out of ${files.length} JavaScript files.`);
}

main();