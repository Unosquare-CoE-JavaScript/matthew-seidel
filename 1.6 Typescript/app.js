function add(n1, n2, showResult, phrase) {
    var result = n1 + n2;
    if (showResult) {
        console.log("".concat(phrase, " ").concat(result));
    }
    else
        return result;
}
var number1 = 10;
var number2 = 20;
var printResults = false;
var resultPhrase = 'Result is: ';
var result = add(number1, number2, printResults, resultPhrase);
