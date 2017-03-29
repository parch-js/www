import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('guide', function() {
    this.route('page', { path: '/:page' });
  });

  this.route('getting-started', function() {
    this.route('page', { path: '/:page' });
  });
});

export default Router;
