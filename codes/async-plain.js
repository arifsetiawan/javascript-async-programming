
// Request and process JSON - Async approach with no helper

var path = require('path');
var fs = require('fs');
var request = require('request');

var filename = path.join(process.cwd(), 'data/articles.json');

// execute each item in array asynchronously
function eachAsync(arr, func, cb) {
    var doneCounter = 0;
    var results = [];
    arr.forEach(function(item) {
        func(item, function(err, res) {
            if (err) {
                cb(err);
            } else {
                doneCounter += 1;
                results.push(res);
                if (doneCounter === arr.length) {
                    cb(null, results);
                }
            }
        });
    });
}

function processJson(json, callback) {

    eachAsync(json, function(item, cbi) {
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
