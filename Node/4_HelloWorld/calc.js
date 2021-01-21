
// refatorar em módulos
/*
function som(a, b){
    return (a + b);
}
function sub(a, b){
    return (a - b);
}
function div(a, b){
    return (a/b);
}
function mul(a, b){
    return (a * b);
}

console.log(sub(2,4));
*/

//função do node para exportação de módulos

var soma = require("./calcSom");
var subt = require("./calcSub");
var divi = require("./calcDiv");
var mult = require("./calcMul");

console.log(soma(1,2));
console.log(subt(1,2));
console.log(divi(1,2));
console.log(mult(1,2));

//npm baixar libs através do require