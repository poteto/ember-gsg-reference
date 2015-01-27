import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  abbreviation: DS.attr('string'),
  backgroundImage: DS.attr('string'),
  listings: DS.hasMany('listing', { async: true })
});
