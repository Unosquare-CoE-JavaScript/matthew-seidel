# Synchronous vs Asynchronous
Synchronous code is code that runs in the same thread as the main thread, and is executed sequentially.

Asynchronous code is code that runs in a separate thread, and is executed concurrently.

```
"use strict";
const test = function(){
    console.log("start of code");
    alert("Hello World");
    console.log("end of code");
};

const test2 = function(){
    console.log("now i get attention");
}

test();
test2();
```

now let's try to do this code more asynchronous way:

```
"use strict";
const test = function(){
    setTimeout(function(){
        console.log("start of code");
        alert("Hello World");
        console.log("end of code");
    }, 0);
};

const test2 = function(){
    console.log("now i get attention");
}

test();
test2();
```

## Advantage of Synchronous code
- Advantage: easy to write and to reason about
- Disadvantage: may create blocking code
- Disadvantage: less performant

## Advantage of Asynchronous code
- Advantage: very performant
- Advantage: Eliminates blocking code
- Disadvantage: it can be difficult to reason about
- disadvantage: it can be hard to write

## Event loop   
In JavaScript, the event loop is the process that runs in the background, waiting for events to happen.

# Callbacks
## Problem with callbacks

- Callback hell
- Difficult to reason about
- Inversion of control

# Promises
promises are a way to handle asynchronous code in a synchronous way.