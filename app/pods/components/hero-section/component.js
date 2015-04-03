import Ember from 'ember';

const {
  get:get,
  computed
} = Ember;

export default Ember.Component.extend({
  tagName           : 'section',
  classNames        : [ 'heroSection' ],
  attributeBindings : [ 'style' ],

  style: computed('backgroundImage', function() {
    const backgroundImage = get(this, 'backgroundImage');
    return `background-image: url('${backgroundImage}')`;
  })
});
