/* global Typekit */
import injectScript from 'ember-inject-script';
import config from '../config/environment';

export function initialize(/* container, application */) {
  var url = `\/\/use.typekit.net/${config.typekitId}.js`;
  injectScript(url).then(() => {
    Typekit.load();
  });
}

export default {
  name: 'typekit',
  initialize: initialize
};
