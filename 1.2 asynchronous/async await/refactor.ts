(async function(){
    let data = await fetch('https://jsonplaceholder.typicode.com/todos');
    let todos = await data.json();
    console.log(todos);
    
})()