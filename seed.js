require('dotenv').load();

var _        = require('lodash');
var faker    = require('faker');
var Firebase = require('firebase');
var RSVP     = require('rsvp');
var geocoder = require('geocoder');
var geocode  = RSVP.denodeify(geocoder.geocode.bind(geocoder));

if(!process.env['FIREBASE_URL']) {
  console.error('Missing environment variable "FIREBASE_URL".');
  process.exit(1);
}
var firebaseUrl = 'https://' + process.env['FIREBASE_URL'] + '.firebaseIO.com';

var CITIES = [
  {
    name: 'California',
    geocoderQuery: 'San Francisco, CA, USA',
    abbreviation: 'CA'
  },
  {
    name: 'New York',
    geocoderQuery: 'Times Square, New York, USA',
    abbreviation: 'NY'
  }
];

console.log('Creating seed data at FIREBASE_URL', firebaseUrl);

var firebaseRoot = new Firebase(firebaseUrl);
var statesRef    = firebaseRoot.child('states');
var listingsRef  = firebaseRoot.child('listings');


RSVP.all(CITIES.map(getStateData)).then(function(states) {

  return RSVP.all(states.map(saveState));
}).catch(function(error) {

  console.error(error);
  process.exit(1)

}).then(function() {

  console.log('All done!');
  process.exit(0)
});


// helpers
function getStateData(stateInfo, index) {

  console.log('Fetching geodata for ' + stateInfo.name);

  return geocode(stateInfo.geocoderQuery).then(function (data) {
    var result = data.results[0];
    var geometry = result.geometry.location;
    return {
      lat:          geometry.lat,
      lng:          geometry.lng,
      abbreviation: stateInfo.abbreviation,
      name:         stateInfo.name,
      id:           index + 1
    };
  })
};

function saveState(stateData) {

  var firebaseId = 'state_id_' + stateData.id;
  var childRef   = statesRef.child(firebaseId);
  var writeStateToFirebase = RSVP.denodeify(childRef.set.bind(childRef));
  console.log('Saving state ' + stateData.name)

  var data = {
    name:            stateData.name,
    abbreviation:    stateData.abbreviation,
    lat:             stateData.lat,
    lng:             stateData.lng,
    backgroundImage: getBackgroundImage(stateData.id)
  };

  return writeStateToFirebase(data).then(function() { return stateData });
}

function saveListing() {

};

function getBackgroundImage(id) {

  return "http://lorempixel.com/1920/1080/city/" + id;
}

function randomLatLngNear(coordinates) {

  return {
    lat: 1,
    lng: 1
  };
}

