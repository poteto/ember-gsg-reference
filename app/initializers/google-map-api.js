import Ember from 'ember';
import injectScript from 'ember-inject-script';

export function initialize(/* container, application */) {
  window.initialize = () => Ember.K;

  const url = 'https://maps.googleapis.com/maps/api/js?v=3&callback=initialize';
  injectScript(url).then(() => {
    return true;
  });
}

export default {
  name: 'google-map-api-service',
  initialize: initialize
};
