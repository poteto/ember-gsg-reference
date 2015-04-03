/* global sinon */

import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import QUnit from 'qunit';

var { run } = Ember;
var { skip } = QUnit;
var component;

moduleForComponent('google-map', 'GoogleMapComponent', {

});

skip('it renders', function(assert) {
  assert.expect(2);

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
  assert.equal(component._state, 'preRender');

  component.set('api', stub);

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
