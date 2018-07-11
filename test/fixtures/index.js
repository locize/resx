const fs = require('fs');
const path = require('path');

module.exports = {
  example: {
    js: require('./example.json'),
    resx: fs.readFileSync(path.join(__dirname, 'example.resx')).toString().replace(/\n$/, '')
  },
  example_comment: {
    js: require('./example_comment.json'),
    resx: fs.readFileSync(path.join(__dirname, 'example_comment.resx')).toString().replace(/\n$/, '')
  }
};
