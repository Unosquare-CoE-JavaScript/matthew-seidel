var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    */
    let p1 = fetch(url + 'posts').then(response => response.json());
    let p2 = fetch(url + 'comments').then(response => response.json());
    let p3 = fetch(url + 'todos').then(response => response.json());
    let p4 = Promise.reject("testing static methods")
    Promise.allSettled([p1, p2, p3, p4]).then(function(results) {
       
       console.log(results);
        nsp.posts = results[0];
        nsp.comments = results[1];
        nsp.todos = results[2];
    });

    Promise.any([p1, p2, p3, p4]).then(function(results) {
       console.log("-----------any-----------");
        console.log(results);
    });

    // Promise.all([p1, p2, p3]).then(function(results) {
    //     nsp.posts = results[0];
    //     nsp.comments = results[1];
    //     nsp.todos = results[2];
    // });


    // fetch(url + 'posts/')
    // .then(response1 => response1.json())
    // .then(posts => nsp.posts = posts)
    // .catch(err => console.log(`Problem retrieving posts: ${err}`));

    // fetch(url + 'comments/')
    // .then(response2 => response2.json())
    // .then(comments => nsp.comments = comments)
    // .catch(err => console.log(`Problem retrieving comments: ${err}`));

    // fetch(url + 'todos/')
    // .then(response3 => response3.json())
    // .then(todos => nsp.todos = todos)
    // .catch(err => console.log(`Problem retrieving todos: ${err}`));

    

    //public
    return nsp;
})(MAINAPP || {});