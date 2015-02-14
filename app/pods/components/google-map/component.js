import Ember from 'ember';

var on             = Ember.on;
var computed       = Ember.computed;
var get            = Ember.get;
var set            = Ember.set;
var observer       = Ember.observer;

export default Ember.Component.extend({
  classNames : [ 'googleMap' ],
  map        : null,
  api        : window.google,

  _drawMap: on('didInsertElement', function() {
    let lat = get(this, 'lat');
    let lng = get(this, 'lng');

    var el     = this.$();
    var google = get(this, 'api');

    var options = {
      center    : new google.maps.LatLng(lat, lng),
      zoom      : 11,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    let map = new google.maps.Map(el[0], options);

    set(this, 'map', map);
  }),

  markers: computed('listings.@each.{lat,lng}', 'api', function() {
    let { maps: GoogleMapsAPI } = get(this, 'api');
    let markers = get(this, 'listings').map((listing) => {
      let lat = listing.get('lat');
      let lng = listing.get('lng');

      return new GoogleMapsAPI.Marker({
        listingId : listing.get('id'),
        position  : new GoogleMapsAPI.LatLng(lat, lng)
      });
    });

    return markers;
  }),

  _mountMarkersToMap: observer('markers.@each', 'map', function() {
    let markers = get(this, 'markers');
    let map     = get(this, 'map');

    if (!map || !markers) { return; }

    markers.forEach((marker) => {
      marker.setMap(map);
    });
  }).on('init')
});
