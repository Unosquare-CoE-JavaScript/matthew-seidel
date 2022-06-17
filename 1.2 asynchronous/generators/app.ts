function genTest(){
    let x = 0;
    console.log("start");
    x++;
    console.log("x:", x);
    x++;
    console.log("x:", x);
    x++;
    console.log("x:", x);
    console.log("end");
}

let gen = genTest();

//creating as generator
function *genTest2(){
    let x = 0;
    console.log("start");
    yield ++x;
    console.log("x:", x);
    x++;
    yield;
    console.log("x:", x);
    x++;
    yield;
    console.log("x:", x);
    console.log("end");
}

let gen2 = genTest2();

 console.log(gen2.next());


 // another way to create a generator

 const test = function*(){
     yield 10;
        yield 20;
        yield 30;
    }

    let g = test();
    