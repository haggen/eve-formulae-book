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

app.get('/:collection.json', function(request, response) {
  if('name' in request.query) {
    response.json([database[request.params.collection].find(function(item) {
      return item.name == request.query.name;
    })]);
  } else if('id' in request.query) {
    response.json([database[request.params.collection].find(function(item) {
      return item.id == request.query.id;
    })]);
  } else if('q' in request.query) {
    response.json([database[request.params.collection].filter(function(item) {
      return item.name.match(new RegExp(request.query.q, 'i'));
    })]);
  } else {
    response.json(database[request.params.collection]);
  }
});

app.listen(process.env.PORT);
