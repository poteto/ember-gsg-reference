import Ember from 'ember';

var {
  on,
  computed,
  get,
  getWithDefault
} = Ember;

export default Ember.Component.extend({
  classNames: [ 'googleMap' ],

  _getApi: computed('api', function() {
    return getWithDefault(this, 'api', window.google);
  }),

  _drawMap: on('didInsertElement', function() {
    var el = this.$();
    var google = get(this, '_getApi');

    var options = {
      center: new google.maps.LatLng(this.get('lat'), this.get('lng')),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    new google.maps.Map(el[0], options);
  })
});
