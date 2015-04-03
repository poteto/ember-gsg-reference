import {
  formatCurrency
} from 'ember-getting-started/helpers/format-currency';
import { test, module } from 'qunit';

module('FormatCurrencyHelper');

test('it defaults to zero when passed no argument', function(assert) {
  assert.expect(1);

  const result = formatCurrency();
  assert.equal(result, '$0');
});

test('it prefixes number with the right prefix', function(assert) {
  assert.expect(1);

  const result = formatCurrency('€', 55);
  assert.equal(result, '€55');
});

test('it prefixes number with a $ by default', function(assert) {
  assert.expect(1);

  const result = formatCurrency(undefined, 55);
  assert.equal(result, '$55');
});

test('it rounds to the nearest integer', function(assert) {
  assert.expect(2);

  const roundDown = formatCurrency('$', 41.1);
  assert.equal(roundDown, '$41');

  const roundUp = formatCurrency('$', 77.9);
  assert.equal(roundUp, '$78');
});

