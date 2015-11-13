
## Asynchronous programming evolution in javascript

* sync [codes/sync.js](codes/sync.js)
* async callback [codes/async-callback.js](codes/async-callback.js) 
* async callback with [async](https://github.com/caolan/async) module [codes/async-async.js](codes/sync.js)
* promise [codes/promise.js](codes/promise.js)
* generator [codes/generator.js](codes/generator.js)
* async with yield [codes/async-yield.js](codes/async-yield.js)
* async await [codes/async-yield.js](codes/async-await.js)

### Notes

* `async callback` is async without helper library. Normal control flow will not work on async programming. We can write helper for that or use [async](https://github.com/caolan/async) module to help us.
* `async with yield` is wrapping generator to combine both generator and promise and provide sync like syntax
* `async await` is ES2016 proposal which provide syntactic sugar to async with yield above.

## How to use

First, install [Node.js](https://nodejs.org/en/download/) first. You will need to use version 4.0 or above for ES2015 support.

```
$ git clone https://github.com/arifsetiawan/javascript-async-programming
$ cd javascript-async-programming
$ npm install
$ node codes/sync.js
$ node codes/async-callback.js
$ ...
```
