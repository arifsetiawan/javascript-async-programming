
// Request and process JSON - Sync

var path = require('path');
var fs = require('fs');
var request = require('sync-request');

var filename = path.join(process.cwd(), 'data/articles.json');

function processJson(jsonArr) {

    var jsonProcessed = jsonArr.map(function(item) {
        var res = request('GET', item.url);
        item.content = res.getBody().toString().substring(0, 200);
        item.processed = true;
        return item;
    });

    return jsonProcessed;
}

try {
    var raw = fs.readFileSync(filename);
    var json = JSON.parse(raw.toString());
    var processed = processJson(json);
    console.log('result', processed);
}
catch (ex) {
    console.error('error', ex);
}
