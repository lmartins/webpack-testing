'use strict';

var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins         = gulpLoadPlugins(),
    webpack         = require('webpack'),
    ComponentPlugin = require("component-webpack-plugin"),
    info            = require('./package.json'),
    webpackCompiler;


var config = {

  JS: {
    src: ["js/**/*.js"],
    build: "build/assets/js/",
    buildFiles: "build/assets/js/*.js"
  },

  HTML:{
    src: ['pages/**/*.hbs', 'templates/**/*.hbs'],
    build: "../",
    buildFiles: ["../*.html","../PT/*.html"]
  },

  SASS: {
    src: "sass/**/*.scss",
    build: "build/assets/css/"
  },

  IMAGES: {
    src: ["images/**/*.jpg", "images/**/*.svg", "!images/**/*.png"],
    build: "build/assets/images/",

    png: {
      src: "images/**/*.png",
      build: "build/assets/images/"
    }

  },

  ICONS: {
    src      : 'sass/app/components/icons/svg/*.svg',
    build    : 'build/assets/css/fonts/',
    fontname : 'icon'
  }

}



// SASS -----------------------------------------------------------------------
gulp.task('sass', function() {
  gulp.src( config.SASS.src )
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      outputStyle: 'compressed'
      // sourceComments: 'map'
      }))
    .on("error", plugins.notify.onError())
    .on("error", function (err) {
      console.log("Error:", err);
    })
    .pipe( plugins.autoprefixer (
        "last 2 versions", "> 10%", "ie 9"
        ))
    .pipe( gulp.dest( config.SASS.build ) )
    .pipe( browserSync.reload({ stream: true }) );
    // .pipe( plugins.livereload() );
});


// WEBPACK --------------------------------------------------------------------
gulp.task('webpack', function(callback) {
  webpackCompiler.run(function(err, stats) {
    if (err) {
      throw new plugins.util.PluginError('webpack', err);
    }
    plugins.util.log('webpack', stats.toString({
      colors: true,
    }));
    callback();
  });
});

var webpackConfig = {
  cache: true,
  debug: true,
  progress: true,
  colors: true,
  devtool: 'source-map',
  entry: {
    main: './js/main.js',
  },
  output: {
    path: config.JS.build ,
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/assets/js/',
  },
  module:{
    loaders: [
      { test: /\.html$/, loader: "html" },
      { test: /\.css$/, loader: "css" }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    alias: {
      'owl'     : 'owl.carousel/dist/owl.carousel.js'
      // 'firebase'     : 'firebase/firebase.js',
    }
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  }

};

gulp.task('set-env-dev', function() {
  webpackConfig.plugins = [
    new webpack.BannerPlugin(info.name + '\n' + info.version + ':' + Date.now() + ' [development build]'),
    new ComponentPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ];
  webpackCompiler = webpack( webpackConfig );
});

gulp.task('set-env-prod', function() {
  webpackConfig.debug = false;
  webpackConfig.devtool = "";
  webpackConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new ComponentPlugin(),
    new webpack.ResolverPlugin(
    	new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ];
  webpackCompiler = webpack( webpackConfig );
});


// GLOBAL TASKS ---------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch( config.HTML.buildFiles , ['html'] );
  gulp.watch( config.JS.src , ["webpack"]);
});

gulp.task('default', ['prod'] );
gulp.task('dev', ['set-env-dev', 'watch'] );
gulp.task('prod', ['set-env-prod', 'watch'] );

gulp.task('shipit', ['set-env-prod', 'webpack'] );
