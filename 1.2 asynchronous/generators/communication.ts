"use strict"

function *yieldConsole(){
    let val = yield;
    console.log(val);
}

let it = yieldConsole();

let promp = it.next().value

console.log(promp);
