import {
  formatCurrency
} from 'ember-getting-started/helpers/format-currency';
import { test, module } from 'qunit';

module('FormatCurrencyHelper');

test('it defaults to zero when passed no argument', function(assert) {
  var result = formatCurrency();
  assert.equal(result, '$0');
});

test('it prefixes number with a $', function(assert) {
  var result = formatCurrency(55);
  assert.equal(result, '$55');
});

test('it rounds to the nearest integer', function(assert) {
  assert.expect(2);

  var roundDown = formatCurrency(41.1);
  assert.equal(roundDown, '$41');

  var roundUp = formatCurrency(77.9);
  assert.equal(roundUp, '$78');
});
