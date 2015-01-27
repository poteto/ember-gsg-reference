import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('country', 'Country', {
  // Specify the other units that are required for this test.
  needs: ['model:listing']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
