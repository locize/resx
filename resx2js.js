const xml2js = require('xml2js');
const parser = new xml2js.Parser();

function resxToJs(str, cb) {
  if (typeof str !== 'string') {
    return cb(new Error('The first parameter was not a string'));
  }

  const result = {};

  parser.parseString(str, (err, data) => {
    if (err) return cb(err);

    if (data && data.root && data.root.data && data.root.data.length > 0) {
      data.root.data.forEach((d) => {
        if (d && d.$ && d.$.name && d.value && d.value.length > 0) {
          const key = d.$.name;
          const value = d.value[0];
          result[key] = value;
        }
      });
    }

    cb(null, result);
  });
}

module.exports = resxToJs;
