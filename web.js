require('newrelic');
require('./find');

var express = require('express');
var app = express();

app.use(require('response-time')());
app.use(require('compression')());

var database = {
  regions: require('./data/regions'),
  types: require('./data/types'),
  systems: require('./data/systems'),
};

app.get('/', function(request, response) {
  var base = request.protocol + '://' + request.hostname + '/';

  response.json({
    collections: {
      regions: base + 'regions.json',
      regions: base + 'types.json',
      regions: base + 'systems.json',
    },
    querystring: {
      id: 'integer, find by id',
      name: 'string, find by exact name',
      match: 'string, match name by regular expression, case insensitive'
    },
    examples: [
      base + '/regions.json?name=Sinq%20Laison',
      base + '/systems.json?id=30042715',
      base + '/types.json?match=miner',
    ]
  });
};

app.get('/:collection.json', function(request, response) {
  if('name' in request.query) {
    response.json([database[request.params.collection].find(function(item) {
      return item.name == request.query.name;
    })]);
  } else if('id' in request.query) {
    response.json([database[request.params.collection].find(function(item) {
      return item.id == request.query.id;
    })]);
  } else if('match' in request.query) {
    response.json(database[request.params.collection].filter(function(item) {
      return item.name.match(new RegExp(request.query.q, 'i'));
    }));
  } else {
    response.json(database[request.params.collection]);
  }
});

app.listen(process.env.PORT);
