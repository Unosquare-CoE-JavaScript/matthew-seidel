var MAINAPP = (function(nsp) {
    "use strict";
    const url = "https://jsonplaceholder.typicode.com/";


    fetch(url + "posts").then(response => response.json()).then(responsePosts => {
        nsp.posts = responsePosts;
        console.log(nsp.posts);
        return fetch(url + "comments");
    }).then(response => response.json()).then(responseComments => {
        nsp.comments = responseComments;
        console.log(nsp.comments);
        return fetch(url + "todos");
    }).then(response => response.json()).then(responseTodos => {
        nsp.todos = responseTodos;
        console.log(nsp.todos);
    }).catch(error => console.log(error));

    return nsp;
})(MAINAPP || {});

