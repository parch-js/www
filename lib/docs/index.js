/*jshint node:true*/
var EngineAddon = require('ember-engines/lib/engine-addon');
module.exports = EngineAddon.extend({
  name: 'docs',

  isDevelopingAddon: function() {
    return true;
  },

  lazyLoading: false
});
