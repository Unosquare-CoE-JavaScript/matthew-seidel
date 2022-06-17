"use strict";

let arr1 = ["a", "b", "c", "d"];

let str = "string";

let obj = {
    1: "one",
    2: "two",
    3: "three"
}

for(let v of arr1){
    console.log(v);
}

for(let v of str){
    console.log(v);
}
//throws an error
// for(let v of obj){
//     console.log(v);
// }

obj[Symbol.iterator] = function*(){
    for(let v in this){
        yield this[v];
    }
}

//ignore the error
for(let v of obj){
    console.log(v);
}