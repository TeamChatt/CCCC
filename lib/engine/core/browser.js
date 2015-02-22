'use strict';

var Bacon = require('baconjs');

var browser = {};

browser.visible = Bacon.fromEventTarget(document, 'visibilitychange')
  .map('.target.visibilityState')
  .toProperty(document.visibilityState)
  .decode({'hidden': false, 'visible': true});

browser.orientation = Bacon.fromEventTarget(window, 'orientationchange')
  .map('.target.orientation')
  .toProperty(window.orientation);

browser.resize = Bacon.mergeAll(
    Bacon.fromEventTarget(window, 'resize'),
    Bacon.fromEventTarget(window, 'orientationchange')
  );

module.exports = browser;