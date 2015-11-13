
// Simple multiplication

var a = 2;
var b = 3;

var c = multiply(5, 7);
var d = square(18);

console.log(c);
console.log(d);

function multiply(a, b) {
    return a * b;
}

function square(n) {
    return multiply(n, n);
}
