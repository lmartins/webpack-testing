

var
  events  = require('./helpers/pubsub'),
  Emitter = require('emitter');  // As soon as I request a component package, the build starts outputting errors.

(function() {
  "use strict";
  var App = {

    // this is out top level module, the module that sets up the
    // namespace and secondary level modules
    Views    : {},
    Features : {},
    Modules  : {}, // Deprecated - Passa a usar módulos CommonJS
    Helpers  : {},

    Events: events,

    init: function () {

      /*
      Makes App object an event emitter
       */
      Emitter(App);

      // Run the routes function binded to the App object
      routes.call(App);

      // var pageFeatures = document.body.getAttribute('data-features').split(',');
      // for (var i = 0; i < pageFeatures.length; i += 1) {
      //   if ( App.Features[ pageFeatures[i] ]) {
      //     App.Features[ pageFeatures[i] ].init();
      //   }
      // }

      // var currentView = document.body.getAttribute('data-view');
      // if (currentView && App.Views[currentView]) {
      //   App.Views[currentView].init();
      // }

      // here we are looping round all of the modules in our app.Modules object. We could have an exclude array for modules
      // that we don't want to be immediately initialised. We could initialise them later on in our application lifecycle
      for (var x in App.Modules) {
        App.Modules[x].init();
      }

      // the most useful part of this is Events. Modules shouldn't know about each other, so they're completely decoupled. We use
      // app.Events to 'trigger' and use 'on' to send/receive messages and data around our application. The 'trigger' function
      // takes data as it's second parameter which is accessible in the 'params' object in the receiving function, i.e. look at the
      // 'render' function within the 'jesse' module
      App.emit('render');

    }
  };

  window.App = App;

}());
