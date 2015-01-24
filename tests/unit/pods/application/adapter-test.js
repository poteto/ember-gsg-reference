import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function() {
  expect(1);
  var adapter = this.subject();

  ok(adapter);
});

test('it has a firebase property', function() {
  expect(1);
  var adapter = this.subject();

  ok(adapter.get('firebase'));
});
