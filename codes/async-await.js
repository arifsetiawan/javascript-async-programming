
// Request and process JSON - Async await - Need Regenerator to transpile
// ./node_modules/regenerator/bin/regenerator -r codes/async-await.js | node

var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'));

var filename = path.join(process.cwd(), 'data/articles.json');

function getContent(article) {
    return new Promise(function(resolve, reject) {
        request.getAsync(article.url).then(function(result) {
            article.content = result.body.substring(0, 200);
            article.processed = true;
            resolve(article);
        }).catch(reject);
    });
}

function processJson(jsonArr) {
    return Promise.map(jsonArr, function(article) {
        return getContent(article);
    });
}

function getJson(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFileAsync(filename).then(function(raw) {
            try {
                resolve(JSON.parse(raw.toString()));
            } catch (err) {
                reject(err);
            }
        });
    });
}

async function run() {
    try {
        var json = await getJson(filename);
        var processed = await processJson(json);
        console.log('result', processed);
    }
    catch (ex) {
        console.error('error', ex);
    }
}

run();

