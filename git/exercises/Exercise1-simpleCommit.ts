function getGreeting(message:string){
    return function sayHello(person:string){
        console.log(message + " " + person);
    }
}