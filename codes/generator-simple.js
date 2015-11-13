
// simple generator

function* task() {
    yield 12;
    yield 65;
    yield 90;
}

var iterator = task();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
