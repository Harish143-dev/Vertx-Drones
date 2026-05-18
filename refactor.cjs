const fs = require('fs');
const path = require('path');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findTsxFiles(path.join(__dirname, 'src'));

let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  const fadeUpRegex = /const fadeUp: Variants = \{\s*hidden: \{ opacity: 0, y: 24 \},\s*show: \(delay = 0\) => \(\{\s*opacity: 1,\s*y: 0,\s*transition: \{ duration: 0\.65, delay: delay as number, ease: \[0\.22, 1, 0\.36, 1\] \},\s*\}\),\s*\};\s*/g;
  
  if (fadeUpRegex.test(content)) {
    content = content.replace(fadeUpRegex, '');
    
    // Add import { fadeUp } from "@/lib/motion"; if not present
    if (!content.includes('import { fadeUp }')) {
      // find the last import
      const importMatches = [...content.matchAll(/^import .*;$/gm)];
      if (importMatches.length > 0) {
        const lastImport = importMatches[importMatches.length - 1];
        const insertionIndex = lastImport.index + lastImport[0].length;
        content = content.slice(0, insertionIndex) + '\nimport { fadeUp } from "@/lib/motion";' + content.slice(insertionIndex);
      } else {
        content = 'import { fadeUp } from "@/lib/motion";\n' + content;
      }
    }
    
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Finished. Updated ${changedFiles} files.`);
