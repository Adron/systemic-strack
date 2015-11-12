var fs = require('fs');
var obj;
var clouds = {};

fs.readFile('file', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});

module.exports = clouds;