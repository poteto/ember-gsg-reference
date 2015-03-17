import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.expect(1);
  var adapter = this.subject();

  assert.ok(adapter);
});

test('it has a firebase property', function(assert) {
  assert.expect(1);
  var adapter = this.subject();

  assert.ok(adapter.get('firebase'));
});
