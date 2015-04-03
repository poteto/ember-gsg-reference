import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      listings: this.store.findAll('listing')
    });
  },

  setupController: function(controller, model) {
    controller.set('listings', model.listings);
  }
});
