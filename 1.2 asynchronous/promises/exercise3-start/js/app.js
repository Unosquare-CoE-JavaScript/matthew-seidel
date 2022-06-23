"use strict";

//First, add the setTimeout code as shown in the intro to this exercise. Then modify the code by creating a promise so that the code can run asynchronously.

const massiveProcess = function(num) {
    let result = 0; 
    setTimeout(function() {
        for (let i = num ** 7; i >= 0; i--) {        
            result += Math.atan(i) * Math.tan(i);
        };
        return result;
    }, 0);
    
};

const massiveProcessPromise = function(num) {
    return new Promise(function(resolve, reject) {
        if (isNaN(num)) {
            reject("Not a number");
        }
        setTimeout(function() {
            let result = 0;
            for (let i = num ** 7; i >= 0; i--) {
                result += Math.atan(i) * Math.tan(i);
            };
            resolve(result);
        }, 0);
    });
};

massiveProcessPromise(10).then(function(result) {
    console.log(result);
    const amt = result;
    console.log("The number is: " + amt);
}).catch(function(error) {
    console.log(error);
});



//More processing later on
console.log(5 * 5 + 100);
