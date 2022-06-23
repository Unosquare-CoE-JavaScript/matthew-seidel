var MAINAPP = (function (nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    Change this code to use async await. Make sure to use promise.all so that we await all three pieces of data without awaiting each individually which would take much longer.

    Which pattern do you prefer for this application? promises or async await?
    */

    const getData = async (type) => {
        try {
            let response = await fetch(url + type);
            let data = await response.json();
            return data;
        } catch (err) {
            console.log(`Problem retrieving ${type}: ${err}`);
        }
    };

    (async function () {
        try {


            const posts = await getData('posts');
            const comments = await getData('comments');
            const todos = await getData('todos');

            const [postsResolved, commentsResolved, todosResolved] = await Promise.allSettled([posts, comments, todos])
            nsp.posts = postsResolved.value;
            nsp.comments = commentsResolved.value;
            nsp.todos = todosResolved.value;

        } catch (err) {
            console.log(`Problem retrieving posts: ${err}`);
        }
    })();


    // fetch(url + 'posts/')
    //     .then(response1 => response1.json())
    //     .then(posts => nsp.posts = posts)
    //     .catch(err => console.log(`Problem retrieving posts: ${err}`));

    // fetch(url + 'comments/')
    //     .then(response2 => response2.json())
    //     .then(comments => nsp.comments = comments)
    //     .catch(err => console.log(`Problem retrieving comments: ${err}`));

    // fetch(url + 'todos/')
    //     .then(response3 => response3.json())
    //     .then(todos => nsp.todos = todos)
    //     .catch(err => console.log(`Problem retrieving todos: ${err}`));

    console.log("Remaining Code.")

    //public
    return nsp;
})(MAINAPP || {});

