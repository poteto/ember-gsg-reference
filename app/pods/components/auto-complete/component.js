import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  classNames:   ['auto-complete'],

  // default values
  placeholder:  '',
  value:        '',
  content:      [],
  searchPath:    null,

  hasContent:   computed.bool('filteredResults.length'),
  hasValue:     computed.notEmpty('value'),
  showDropdown: computed.and('hasContent', 'hasValue'),

  actions: {
    submit: function() {
      this.sendAction('action', this.get('value'));
    }
  },

  filteredResults: function() {
    let value      = this.get('value');
    let regex      = new RegExp(value, 'i');
    let content    = this.get('content') || [];
    let searchPath = this.get('searchPath');

    if (value.length === 0) { return []; }

    return content.filter(function(record) {
      let result = searchPath ? record.get(searchPath) : record;

      if (result) {
        return result.match(regex);
      }
    }).slice(0, 5);
  }.property('content', 'value')
});
