const express = require('express');
const https = require('https');
const qs = require('qs');

const app = express();
const eve = require('./eve');

app.use(require('response-time')());
app.use(require('morgan')('combined'));

app.get('/', function (req, res) {
  const package = require('./package.json');
  res.json(package);
});

// GET /item?name=Veldspar
//
app.get('/item', function (req, res) {
  const invType = eve.invTypes.find(function (invType) {
    return invType.typeName === req.query.name;
  });
  res.json(invType || {});
});

// GET /region?name=Providence
//
app.get('/region', function (req, res) {
  const mapRegion = eve.mapRegions.find(function (mapRegion) {
    return mapRegion.regionName === req.query.name;
  });
  res.json(mapRegion || {});
});

// GET /system?name=Amarr
//
app.get('/system', function (req, res) {
  const solarSystem = eve.mapSolarSystems.find(function (solarSystem) {
    return solarSystem.solarSystemName === req.query.name;
  });
  res.json(solarSystem || {});
});

function fetchMarketData(region, system, item, minimum, respond) {
  const payload = qs.stringify({
    typeid: item,
    minQ: minimum || 1000,
    usesystem: system,
    regionlimit: region
  });
  const options = {
    hostname: 'api.eve-central.com',
    port: 443,
    method: 'GET',
    path: '/api/marketstat/json',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(payload),
    }
  };
  console.log(options, payload);
  const request = https.request(options, function (response) {
    response.on('data', function(chunk) {
      response.setEncoding('utf-8');
      respond(JSON.parse(chunk));
    });
  });
  request.on('error', function (err) {
    console.error(err);
  });
  request.write(payload);
  request.end();
}

// GET /market?location=Providence&item=Veldspar&minimum=1000
//
app.get('/market', function (req, res) {
  const invType = eve.invTypes.find(function (invType) {
    return invType.typeName === req.query.item;
  }) || {};

  const mapRegion = eve.mapRegions.find(function (mapRegion) {
    return mapRegion.regionName === req.query.location;
  }) || {};

  const solarSystem = eve.mapSolarSystems.find(function (solarSystem) {
    return solarSystem.solarSystemName === req.query.location;
  }) || {};

  const respond = function (response) {
    res.json(response[0]);
  };
  fetchMarketData(mapRegion.regionID, solarSystem.solarSystemID, invType.typeID, req.query.minimum, respond);
});

app.listen(process.env.PORT || 5000);
