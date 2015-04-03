import Ember from 'ember';

const {
  computed,
  get: get,
  getWithDefault
} = Ember;

export default Ember.Component.extend({
  classNames: [ 'auto-complete' ],

  placeholder  : '',
  value        : '',
  content      : [],
  searchPath   : null,

  hasContent   : computed.bool('filteredResults.length'),
  hasValue     : computed.notEmpty('value'),
  showDropdown : computed.and('hasContent', 'hasValue'),

  actions: {
    submit(listing) {
      this.sendAction('action', listing);
    }
  },

  filteredResults: computed('content', 'value', function() {
    let value      = getWithDefault('value', '').replace(/\W/g, '');
    let regex      = new RegExp(value, 'i');
    let content    = get('content') || [];
    let searchPath = get('searchPath');

    if (value.length === 0) { return []; }

    return content.filter((record) => {
      let result = searchPath ? record.get(searchPath) : record;

      if (result) {
        return result.match(regex);
      }
    }).slice(0, 5);
  })
});
