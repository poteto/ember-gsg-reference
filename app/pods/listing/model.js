import DS from 'ember-data';

export default DS.Model.extend({
  name        : DS.attr('string'),
  lat         : DS.attr('number'),
  lng         : DS.attr('number'),
  price       : DS.attr('number'),
  description : DS.attr('string'),
  country     : DS.belongsTo('country', { async: true }),
  state       : DS.attr('string'),
  city        : DS.attr('string')
});
