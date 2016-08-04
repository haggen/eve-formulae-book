const fs = require('fs');
const csv = require('csv-parse');

const eve = {};

['invTypes', 'mapSolarSystems', 'mapRegions'].forEach(function (name) {
  fs.readFile(`./${name}.csv`, { encoding: 'utf8' }, function (err, content) {
    if (err) {
      console.error(err);
    } else {
      csv(content, { columns: true }, function (err, data) {
        if (err) {
          console.error(err);
        } else {
          eve[name] = data;
        }
      });
    }
  });
});

exports = eve;
