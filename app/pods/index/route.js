import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('state');
  },

  setupController: function(controller, model) {
    this.controller.set('states', model);
  }
});
