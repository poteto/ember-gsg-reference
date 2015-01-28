import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('state', { path: '/:state_id' }, function() {
    this.route('listing');
  });

});

export default Router;
