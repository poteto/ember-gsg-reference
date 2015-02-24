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

  window.google = function() {};
  var stub = sinon.stub(window, 'google');

  stub.returns({
    maps: {
      LatLng() {
      },

      MapTypeId: {
        ROADMAP: ''
      },

      Map() {
      },

      Marker() {

      }
    }
  });

  var component = this.subject();
  equal(component._state, 'preRender');

  component.set('api', stub);

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
