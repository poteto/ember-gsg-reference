import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findById('listing', params.listing_id);
  },

  setupController: function(controller, model) {
    controller.set('listing', model);
  }
});
