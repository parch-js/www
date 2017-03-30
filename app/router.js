import Ember from 'ember';

import ScrollTrackingRouter from 'scroll-tracker/scroll-tracking-router';
import config from './config/environment';

const Router = ScrollTrackingRouter.extend({
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
