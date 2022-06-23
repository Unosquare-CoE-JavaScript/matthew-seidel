// * i am calling the function before it is declared, this is called a closure
console.log(myFunction("Matthew"));

function myFunction(name) {
    return "Hello my name is " + name;
}