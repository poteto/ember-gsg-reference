import Ember from 'ember';

export function formatCurrency(price = 0.0) {
  // round to nearest whole number
  let roundedPrice = Math.round(price, 0);
  let prefix       = '$';
  return `${prefix}${roundedPrice}`;
}

export default Ember.Handlebars.makeBoundHelper(formatCurrency);
