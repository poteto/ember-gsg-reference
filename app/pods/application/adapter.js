/* globals Firebase */

import DS from 'ember-data';
import config from '../../config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(`https://${config.firebaseUrl}.firebaseIO.com`)
});
