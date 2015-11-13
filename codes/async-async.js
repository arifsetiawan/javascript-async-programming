
// Request and process JSON - Async with async lib

var path = require('path');
var fs = require('fs');
var request = require('request');
var async = require('async');

var filename = path.join(process.cwd(), 'data/articles.json');

function processJson(jsonArr, callback) {
    async.map(jsonArr, function(item, cbi) {
        request(item.url, function(err, response, body) {
            if (err) {
                cbi(err);
            } else {
                item.content = body.substring(0, 200);
                item.processed = true;
                cbi(null, item);
            }
        });
    }, callback);
}

fs.readFile(filename, function(err, raw) {
    var json = JSON.parse(raw.toString());
    processJson(json, function(err, result) {
        if (err) {
            console.error('error', err);
        } else {
            console.log('result', result);
        }
    });
});
