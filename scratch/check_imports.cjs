const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      const content = fs.readFileSync(filepath, 'utf8');
      const imports = content.match(/from\s+['"](.*?)['"]/g);
      if (imports) {
        imports.forEach(imp => {
          const relPath = imp.match(/['"](.*?)['"]/)[1];
          if (relPath.startsWith('.')) {
            const dirName = path.dirname(filepath);
            const fullPath = path.resolve(dirName, relPath);
            const extensions = ['', '.tsx', '.ts', '.jsx', '.js', '.json', '/index.tsx', '/index.ts', '/index.jsx', '/index.js'];
            let found = false;
            for (let ext of extensions) {
              const testPath = fullPath + ext;
              if (fs.existsSync(testPath)) {
                found = true;
                const actualPath = fs.realpathSync(testPath);
                // On Windows, realpathSync returns the actual casing of the file.
                // We compare the basenames to see if there's a mismatch.
                if (path.basename(actualPath) !== path.basename(testPath)) {
                   console.log(`CASE MISMATCH: ${filepath} imports "${relPath}" (expected ${path.basename(testPath)} but found ${path.basename(actualPath)})`);
                }
                break;
              }
            }
            if (!found) {
              console.log(`MISSING: ${filepath} imports "${relPath}"`);
            }
          }
        });
      }
    }
  });
};

walk('src');
