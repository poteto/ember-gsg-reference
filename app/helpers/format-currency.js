import Ember from 'ember';

export function formatCurrency(prefix='$', price=0.0) {
  // round to nearest whole number
  let roundedPrice = Math.round(price, 0);
  return `${prefix}${roundedPrice}`;
}

export default Ember.Handlebars.makeBoundHelper(formatCurrency);
