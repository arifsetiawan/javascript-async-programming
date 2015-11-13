
// Async execution with timeout

function sayHello(name) {
    console.log('Hello ' + name);
}

function sayHelloLater(name) {
    console.log('Wait ...');
    var salutation = 'Mr.';

    setTimeout(function() {
        console.log('Hello ' + salutation + ' ' + name);
    }, 5000);
}

sayHello('John');

sayHelloLater('Jim');
