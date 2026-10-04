// Arrow function example

//function decleration

function add(a, b) {
    return a + b
}

var add= function (a, b) {
    return a + b;
}

//arrow function
var add = (a, b) =>{
    return a + b
}

add = (a , b) => a + b; // concice body syntax

var greet = (name) => {
    return `Hello, ${name}!`;
}

greet = name => {
    return `Hello, ${name}!`;
}

greet = name => `hello, ${name}!`;

var checkArrow = () => {
    console.log("this is an arrow function")
    console.log(this); //"this" refers to the enclosing context
    console.log(arguments); //'arguemtns' is not available in arrow functions

}

checkArrow();