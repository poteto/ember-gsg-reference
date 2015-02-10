import Ember from 'ember';

export default Ember.Component.extend({
  classNames:   ['auto-complete'],

  // default values
  value:        '',
  placeholder:  null,
  content:      [],

  hasContent:   Ember.computed.bool('filteredResults.length'),
  hasValue:     Ember.computed.notEmpty('value'),
  showDropdown: Ember.computed.and('hasContent', 'hasValue'),

  actions: {
    submit: function() {
      this.sendAction(this.get('value'));
    }
  },

  filteredResults: function() {
    var value   = this.get('value');
    var regex   = new RegExp(value, 'i');
    var content = this.get('content') || [];

    if (value.length === 0) { return []; }

    return content.filter(function(result) {
      return result.match(regex);
    }).slice(0, 10);
  }.property('content', 'value')
});
