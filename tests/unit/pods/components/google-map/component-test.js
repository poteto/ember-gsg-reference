/* global sinon */
import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var { run } = Ember;
var component;

moduleForComponent('google-map', 'GoogleMapComponent', {

});

test('it renders', function() {
  expect(2);

  var component = this.subject();
  equal(component._state, 'preRender');

  var googleMapApi = {
    maps: {
      LatLng() {
      },

      MapTypeId: {
        ROADMAP: ''
      },

      Map() {
      }
    }
  };

  var googleMapApiStub = sinon.stub(googleMapApi);

  run(() => {
    component.set('api', googleMapApiStub);
  });

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
