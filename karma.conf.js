var path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: [ 'mocha' ],
    browsers: [ 'chrome_without_security' ],

    customLaunchers: {
      // if you want to use this (for CI or to debug a ScriptError), run karma
      // with:
      //
      // karma start --browsers "chrome_without_security"
      chrome_without_security: {
        base: 'Chrome',
        flags: [
          '--no-default-browser-check',
          '--no-first-run',
          '--disable-default-apps',
          '--disable-popup-blocking',
          '--disable-translate',

          // This is necessary in order to get useful error messages that
          // happen outside of the test suites (e.g, script load errors).
          //
          // Without this flag, we get the dreaded "Script Error." message with
          // no explanation, and that is due to the cross-origin policies (since
          // karma loads our tests files using socket.io from another "origin").
          //
          // Additional reading:
          //
          //   - https://github.com/karma-runner/karma/issues/543
          //   - http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox
          //   - https://bugs.webkit.org/show_bug.cgi?id=70574
          //   - https://groups.google.com/forum/#!topic/angular/VeqlVgUa6Wo
          //
          '--disable-web-security',
        ]
      }
    },

    files: [
      'test/index.js',
    ],

    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'dots' ],

    mochaReporter: {
      ignoreSkipped: true
    },

    client: {
      captureConsole: true,

      mocha: {
        reporter: 'html', // change Karma's debug.html to the mocha web reporter
        ui: 'bdd'
      }
    },

    webpack: {
      devtool: 'eval',
      resolve: {
        alias: {
          'test': path.resolve(__dirname, 'test')
        },
      },

      module: {
        loaders: [
          {
            test: /\.test\.js$|test\/.*\.js$/,
            include: [
              path.resolve(__dirname, 'lib'),
              path.resolve(__dirname, 'test')
            ],
            loader: 'babel-loader',
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
