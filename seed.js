// import environment variables .env
require('dotenv').load();

var _        = require('lodash');
var faker    = require('faker');
var Firebase = require('firebase');
var RSVP     = require('rsvp');
var geocoder = require('geocoder');
var geocode  = RSVP.denodeify(geocoder.geocode.bind(geocoder));

var LISTINGS_PER_STATE = 10, lastListingId = 0, CITIES, firebaseUrl, firebaseRoot, statesRef, listingsRef;

CITIES = [
  {
    name: 'California',
    geocoderQuery: 'San Francisco, CA, USA',
    defaultCity: 'San Francisco',
    abbreviation: 'CA'
  },
  {
    name: 'New York',
    defaultCity: 'New York City',
    geocoderQuery: 'Times Square, New York, USA',
    abbreviation: 'NY'
  }
];

// fail fast!
if(!process.env['FIREBASE_URL']) {
  console.error('Missing environment variable "FIREBASE_URL".');
  process.exit(1);
}

firebaseUrl = 'https://' + process.env['FIREBASE_URL'] + '.firebaseIO.com';
firebaseRoot = new Firebase('https://' + process.env['FIREBASE_URL'] + '.firebaseIO.com');
statesRef    = firebaseRoot.child('states');
listingsRef  = firebaseRoot.child('listings');

console.log('Generating seed data at FIREBASE_URL', firebaseUrl);

RSVP.all(CITIES.map(getStateData))
.then(function(states) {
  return RSVP.all(states.map(saveState));
})
.then(function(states) {
  return RSVP.all(states.map(createListingsForState));
})
.then(function() {
  console.log('All done!');
  process.exit(0);
})
.catch(function(error) {
  console.error(error);
  process.exit(1);
});

// helpers
function getStateData(stateInfo, index) {
  console.log('Fetching geodata for ' + stateInfo.name);

  return geocode(stateInfo.geocoderQuery).then(function (data) {
    var result = data.results[0];
    var geometry = result.geometry.location;
    var firebaseId = 'state_id_' + (index + 1);

    return {
      lat:          geometry.lat,
      lng:          geometry.lng,
      abbreviation: stateInfo.abbreviation,
      name:         stateInfo.name,
      id:           index + 1,
      firebaseId:   firebaseId,
      defaultCity:  stateInfo.defaultCity
    };
  });
}

function saveState(stateData) {
  var childRef   = statesRef.child(stateData.firebaseId);
  var writeStateToFirebase = RSVP.denodeify(childRef.set.bind(childRef));
  console.log('Saving state ' + stateData.name);

  // properties for the ember data model
  var data = {
    name:            stateData.name,
    abbreviation:    stateData.abbreviation,
    lat:             stateData.lat,
    lng:             stateData.lng,
    backgroundImage: getBackgroundImage(stateData.id)
  };

  return writeStateToFirebase(data).then(_.constant(stateData));
}

function createListingsForState(stateData) {
  console.log('Generating listings for ' + stateData.defaultCity);

  var promises = _.range(LISTINGS_PER_STATE).map(function() {
    var coordinates = generateRandomPoint(stateData.lat, stateData.lng, 4000);

    var newListingId           = generateNewListingId();
    var childRef               = listingsRef.child(newListingId);
    var writeListingToFirebase = RSVP.denodeify(childRef.set.bind(childRef));

    // firebase reference to update state's listing collection
    var stateListingRef     = statesRef.child(stateData.firebaseId + '/listings/' + newListingId);
    var updateStateListings = RSVP.denodeify(stateListingRef.set.bind(stateListingRef));

    var data = {
      city:        stateData.defaultCity,
      description: faker.lorem.sentence(),
      name:        faker.lorem.sentence(),
      lat:         coordinates.lat,
      lng:         coordinates.lng,
      price:       Math.round((Math.random() * 200) + 100),
      state:       stateData.firebaseId,
      image:       getListingImage()
    };

    return writeListingToFirebase(data).then(updateStateListings(true));
  });

  return RSVP.all(promises);
}

function getBackgroundImage(id) {
  return "http://lorempixel.com/1920/1080/city/" + id;
}

function getListingImage() {
  return "https://placeimg.com/400/200/arch?id=" + lastListingId;
}

function generateNewListingId() {
  return "listing_id_" + ++lastListingId;
}

// https://gist.github.com/mkhatib/5641004
function generateRandomPoint(lat, lng, radius) {

  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();
  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);
  var xp = x / Math.cos(lat);

  // Resulting point.
  return {
    lat: y + lat,
    lng: xp + lng
  };
}
