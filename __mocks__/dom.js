const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;
document.body.innerHTML = fs.readFileSync(path.join(__dirname, '../dist/index.php')).toString();
