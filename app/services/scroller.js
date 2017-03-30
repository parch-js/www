import Ember from 'ember';

const {
  $,
  computed,
  get,
  run
} = Ember;

export default Ember.Service.extend({
  duration: 750,
  scrollable: computed(() => $("html, body")),

  setup() {
    run.next(() => {
      $('.scrollable').bind('click', run.bind(this, this._doScroll));
    });
  },

  tearDown() {
    run.next(() => {
      $('.scrollable').unbind('click');
    });
  },

  _doScroll(evt) {
    const $scrollable = get(this, 'scrollable');
    const targetId = $(evt.currentTarget).attr("href");

    $scrollable.animate({
      scrollTop: $scrollable.scrollTop() - $scrollable.offset().top + this._getVerticalCoords(targetId)
    }, 750, "swing");
  },

  _getVerticalCoords(targetId) {
    const offset = $(targetId).offset();

    return offset ? offset.top : 0;
  }
});
