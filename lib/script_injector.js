'use strict';

var fs = require('fs');
var cheerio = require('cheerio');

module.exports = function (fileLocation) {
    var file = fs.readFileSync(fileLocation);
    var $ = cheerio.load(file);

    // All injections need nodecg-api, duh
    var scripts = [
        '<script src="/components/eventemitter2/lib/eventemitter2.js"></script>',
        '<script src="/stubs/nodecg-api.js"></script>'
    ];

    scripts = scripts.join('\n');

    var currentHead = $('head').html();
    $('head').html(scripts + currentHead);
    return $.html();
};
