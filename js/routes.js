'use strict';

var
  Router  = require('static-router'),
  query   = require('query'),
  router  = new Router();

module.exports = function () {

  router.route('*', function(){
    require('./features/common');
    App.Features.common.init();
  });

  router.route('', function(){
    require('./views/home');
    App.Views.home.init();
  });
  //
  // router.route('*/features', function(){
  //   require('../views/features');
  //   App.Views.features.init();
  //   App.Features.connectors.init();
  // });
  //
  // router.route('*/features/*', function(){
  //   console.log("Features View");
  //   require('../features/slider');
  //
  //   var StickyNav = require('../components/stickynav');
  //   new StickyNav( query('.Nav--sectionNav') );
  //
  //   App.Features.slider.init();
  //
  // });
  //
  // router.route('*/features/dashboard.html', function(){
  //   require('./views/featuresDashboard');
  //   App.Views.featuresDashboard.init();
  // });
  //
  // router.route('*/features/mobility.html', function(){
  //   require('../views/featuresMobility');
  //   App.Views.featuresMobility.init();
  // });
  //
  router.route('*/platform', function(){
    require('./views/platform');
    App.Views.platform.init();
  });
  // router.route('*/applications', function(){
  //   require('../views/applications');
  //   App.Views.applications.init();
  // });
  //
  // router.route('*/applications/markets/corporate.html', function(){
  //   require('../features/slideNav');
  //   App.Features.slideNav.init();
  // });

};
