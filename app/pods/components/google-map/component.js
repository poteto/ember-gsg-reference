/* global google */
import Ember from 'ember';

var on = Ember.on;

export default Ember.Component.extend({
  classNames: [ 'googleMap' ],

  _drawMap: on('didInsertElement', function() {
    var el = this.$();

    var options = {
      center: new google.maps.LatLng(this.get('lat'), this.get('lng')),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    new google.maps.Map(el[0], options);
  })
});
