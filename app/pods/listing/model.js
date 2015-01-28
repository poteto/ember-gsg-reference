import DS from 'ember-data';

export default DS.Model.extend({
  name        : DS.attr('string'),
  lat         : DS.attr('number'),
  lng         : DS.attr('number'),
  price       : DS.attr('number'),
  description : DS.attr('string'),
  state       : DS.belongsTo('state', { async: true }),
  city        : DS.attr('string')
});
