import Ember from 'ember';

import toc from "parch-web/utils/table-of-contents";

const TABLE_OF_CONTENTS = toc.gettingStarted;

export default Ember.Route.extend({
  model() {
    return TABLE_OF_CONTENTS;
  }
});
