import {
  formatCurrency
} from 'ember-getting-started/helpers/format-currency';

module('FormatCurrencyHelper');


test('it defaults to zero when passed no argument', function() {
  var result = formatCurrency();
  equal(result, '$0');
});

test('it prefixes number with a $', function() {
  var result = formatCurrency(55);
  equal(result, '$55');
});

test('it rounds to the nearest integer', function() {
  expect(2);

  var roundDown = formatCurrency(41.1);
  equal(roundDown, '$41');

  var roundUp = formatCurrency(77.9);
  equal(roundUp, '$78');
});
