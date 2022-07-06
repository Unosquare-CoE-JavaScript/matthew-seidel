let firstName = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Billy');
        }, 1000);
    });
}

let middleNAme = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('John');
        }, 1000);
    });
}

let lastName = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Doe');
        }, 1000);
    });
}

(async function(){
    let [name, middle, last ] = await Promise.all([firstName(), middleNAme(), lastName()])
    console.log(`${name} ${middle} ${last}`);
} )()
