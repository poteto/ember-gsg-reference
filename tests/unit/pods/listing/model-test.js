import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('listing', 'Listing', {
  // Specify the other units that are required for this test.
  needs: ['model:country']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
