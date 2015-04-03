/* jshint node: true */

// import environment variables .env
require('dotenv').load();

const _        = require('lodash');
const faker    = require('faker');
const Firebase = require('firebase');
const RSVP     = require('rsvp');
const geocoder = require('geocoder');
const geocode  = RSVP.denodeify(geocoder.geocode.bind(geocoder));
const exit     = require('exit');

let lastListingId = 0;
let firebaseUrl, firebaseRoot, statesRef, listingsRef;

const LISTINGS_PER_STATE = 10;
const CITIES = [
  {
    name          : 'California',
    geocoderQuery : 'San Francisco, CA, USA',
    defaultCity   : 'San Francisco',
    abbreviation  : 'CA'
  },
  {
    name          : 'New York',
    defaultCity   : 'New York City',
    geocoderQuery : 'Times Square, New York, USA',
    abbreviation  : 'NY'
  }
];

// fail fast!
if(!process.env['FIREBASE_URL']) {
  console.error('Missing environment variable "FIREBASE_URL".');
  exit(1);
}

firebaseUrl  = `https://${process.env['FIREBASE_URL']}.firebaseIO.com`;
firebaseRoot = new Firebase(`https://${process.env['FIREBASE_URL']}.firebaseIO.com`);
statesRef    = firebaseRoot.child('states');
listingsRef  = firebaseRoot.child('listings');

console.log('Generating seed data at FIREBASE_URL', firebaseUrl);

RSVP.all(CITIES.map(getStateData))
.then((states) => {
  return RSVP.all(states.map(saveState));
})
.then((states) => {
  return RSVP.all(states.map(createListingsForState));
})
.then(() => {
  console.log('All done!');
  exit(0);
})
.catch((error) => {
  console.error(error);
  exit(1);
});

// helpers
function getStateData(stateInfo, index) {
  console.log(`Fetching geodata for ${stateInfo.name}'...`);

  return geocode(stateInfo.geocoderQuery).then((data) => {
    const result     = data.results[0];
    const geometry   = result.geometry.location;
    const firebaseId = `state_id_${(index + 1)}`;

    return {
      lat          : geometry.lat,
      lng          : geometry.lng,
      abbreviation : stateInfo.abbreviation,
      name         : stateInfo.name,
      id           : index + 1,
      firebaseId   : firebaseId,
      defaultCity  : stateInfo.defaultCity
    };
  });
}

function saveState(stateData) {
  const childRef             = statesRef.child(stateData.firebaseId);
  const writeStateToFirebase = RSVP.denodeify(childRef.set.bind(childRef));
  console.log(`Saving state: ${stateData.name}`);

  // properties for the ember data model
  const data = {
    name            : stateData.name,
    abbreviation    : stateData.abbreviation,
    lat             : stateData.lat,
    lng             : stateData.lng,
    backgroundImage : getBackgroundImage(stateData.id)
  };

  return writeStateToFirebase(data).then(_.constant(stateData));
}

function createListingsForState(stateData) {
  console.log(`Generating listings for: ${stateData.defaultCity}`);

  const promises = _.range(LISTINGS_PER_STATE).map(() => {
    const coordinates            = generateRandomPoint(stateData.lat, stateData.lng, 4000);
    const newListingId           = generateNewListingId();
    const childRef               = listingsRef.child(newListingId);
    const writeListingToFirebase = RSVP.denodeify(childRef.set.bind(childRef));

    // firebase reference to update state's listing collection
    const stateListingRef     = statesRef.child(`${stateData.firebaseId}/listings/${newListingId}`);
    const updateStateListings = RSVP.denodeify(stateListingRef.set.bind(stateListingRef));

    const data = {
      city        : stateData.defaultCity,
      description : faker.lorem.sentence(),
      name        : faker.lorem.sentence(),
      lat         : coordinates.lat,
      lng         : coordinates.lng,
      price       : Math.round((Math.random() * 200) + 100),
      state       : stateData.firebaseId,
      image       : getListingImage()
    };

    return writeListingToFirebase(data).then(updateStateListings(true));
  });

  return RSVP.all(promises);
}

function getBackgroundImage(id) {
  return `http://lorempixel.com/1920/1080/city/${id}`;
}

function getListingImage() {
  return `https://placeimg.com/400/200/arch?id=${lastListingId}`;
}

function generateNewListingId() {
  lastListingId += 1;
  return `listing_id_${lastListingId}`;
}

// https://gist.github.com/mkhatib/5641004
function generateRandomPoint(lat, lng, radius) {

  // Convert Radius from meters to degrees.
  const rd = radius / 111300;

  const u  = Math.random();
  const v  = Math.random();
  const w  = rd * Math.sqrt(u);
  const t  = 2 * Math.PI * v;
  const x  = w * Math.cos(t);
  const y  = w * Math.sin(t);
  const xp = x / Math.cos(lat);

  // Resulting point.
  return {
    lat : y + lat,
    lng : xp + lng
  };
}
