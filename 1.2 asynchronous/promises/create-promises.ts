"use strict";

let a = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
});


a.then(function (value) {
    console.log("this is an asynchronous code");
});

console.log("this is synchronous code") ;

let setTimeoutPromise = function(time){
    return new Promise(function(resolve,reject){        
        if(isNaN(time)){
            reject(new Error('time must be a number'));
        }
        setTimeout(resolve,time);
    });
}

setTimeoutPromise("200").then(function(){
    console.log("this is an asynchronous code with setTimeoutPromise");
});