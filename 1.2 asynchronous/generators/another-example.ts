"use strict"

let arr = ["a", "b", "c", "d"];

// let it = arr[Symbol.iterator]();

function* arrIt(arr:string[]): Generator<string, void, unknown> {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}
let it = arrIt(arr);

console.log("remain code");
