
// Request and process JSON - Async yield - With helper

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

// http://pag.forbeslindesay.co.uk/#/22
// http://2013.jsconf.eu/speakers/forbes-lindesay-promises-and-generators-control-flow-utopia.html
// https://www.promisejs.org/generators/
function async(makeGenerator) {
    return function() {
        var generator = makeGenerator.apply(this, arguments);

        function handle(result) { // { done: [Boolean], value: [Object] }
            if (result.done) return result.value;

            return result.value.then(function(res) {
                return handle(generator.next(res));
            }, function(err) {

                return handle(generator.throw(err));
            });
        }

        return handle(generator.next());
    };
}

var run = async(function*() {
    try {
        var json = yield getJson(filename);
        var processed = yield processJson(json);
        console.log('result', processed);
    }
    catch (ex) {
        console.error('error', ex);
    }
});

run();

