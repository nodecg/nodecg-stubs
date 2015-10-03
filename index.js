'use strict';

module.exports = function(bundlePath) {
    return require('./lib/server')(bundlePath);
};
