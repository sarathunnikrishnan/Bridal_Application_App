const fs = require('fs');
const path = require('path');

function findCssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findCssFiles(fullPath, fileList);
    } else if (fullPath.endsWith('.css')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const cssFiles = findCssFiles(path.join(__dirname, 'frontend', 'src'));
console.log(`Found ${cssFiles.length} CSS files.`);

cssFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const mediaQueries = content.match(/@media\s*\([^)]+\)/g);
  if (mediaQueries) {
    console.log(`\n${path.basename(file)}:`);
    mediaQueries.forEach(mq => console.log(`  - ${mq}`));
  } else {
    // console.log(`\n${path.basename(file)}: NO MEDIA QUERIES`);
  }
});
