'use strict';

var path = require('path');
var parseBundle = require('nodecg-bundle-parser');
var express = require('express');
var app = express();
var injectScripts = require('./script_injector');

module.exports = function(bundlePath) {
    var bundle = parseBundle(path.resolve(bundlePath));

    app.listen(9999);
    app.use('/components', express.static(path.resolve(__dirname, '../../bower_components')));
    app.use('/stubs', express.static('stubs'));

    app.get('/:panel', function(req, res, next) {
        var panelName = req.params.panel;
        var panel = null;
        bundle.dashboard.panels.some(function(p) {
            if (p.name === panelName) {
                panel = p;
                return true;
            } else {
                return false;
            }
        });
        if (!panel) {
            next();
            return;
        }

        var fileLocation = path.join(bundle.dashboard.dir, panel.file);
        var html = injectScripts(fileLocation);

        res.send(html);
    });

    return app;
};
