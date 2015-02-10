import Ember from 'ember';

const RSVP = Ember.RSVP;

export default Ember.Route.extend({
  model: function() {
    return RSVP.hash({
      listings: this.store.findAll('listing')
    });
  },
  setupController: function(controller, model) {
    controller.set('listings', model.listings);
  }
});
