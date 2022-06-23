//Create a function that will retrieve the posts from the jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). Set up the function so you can pass in the userID and the function will assign only the posts for that user to a variable. The data should be stored in an array.

async function getDataPostsFromUser(){
    var data = [];
    const getData = async () => {
        if(data.length > 0){
            return;
        }
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        data = await response.json();
    }
    return async (userId) => {
        await getData();
        return data.filter(post => post.userId === userId);
    }
}

var getData = getDataPostsFromUser().then(async function(data){
    console.log(await data(1));
    console.log(await data(3));

});