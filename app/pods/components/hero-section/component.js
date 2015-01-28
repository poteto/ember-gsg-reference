import Ember from 'ember';

var get = Ember.get;

export default Ember.Component.extend({
  tagName: 'section',
  classNames: [ 'heroSection' ],
  attributeBindings: [ 'style' ],

  style: Ember.computed('backgroundImage', function() {
    var backgroundImage = get(this, 'backgroundImage');
    return `background-image: url('${backgroundImage}')`;
  })

});
