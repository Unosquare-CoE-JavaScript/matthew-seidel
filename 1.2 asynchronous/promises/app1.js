const axios = require('axios');

const json = "https://jsonplaceholder.typicode.com/todos";
let jsonObject;

axios(json).then(function ({data}) {
    jsonObject = data;
    console.log(jsonObject);
});
let asyncFunction = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Success");
        }, 1000);
    });
}

const result = asyncFunction().then(function (result) {
    console.log(result);
}).then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.log(error);
});