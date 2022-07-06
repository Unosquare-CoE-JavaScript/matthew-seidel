function add (n1:number, n2:number, showResult: boolean, phrase:string): string | number {
    const result = n1 + n2;
    if(showResult) {
        console.log(`${phrase} ${result}`);
    } else return result;
}

const number1 = 10;
const number2 = 20;
let printResults = false;
const resultPhrase = 'Result is: ';

const result = add(number1, number2, printResults, resultPhrase);