console.log("Hello, World!");

var a = 100

console.log(a)
a = "Test"
console.log(a);

b = 200
b = "Another Test"
var b = "b re-declared"
console.log(b);

//ES6
let c = 300
//c = "Yet Another Test"
// let c = 400 // This will throw an error because 'c' has been declared
console.log(c);

let d;

d = 500

const x = 600

// x = "Test" //this will throw an error because x was already declared

// const x = 700 //Error

console.log(x);

function testLetConst(){
    const x = 700
    let c = 400
    console.log(`IN BLOCK c: ${c}`)
}
testLetConst();
console.log(`OUT OF BLOCK c: ${c}`);

var flag = false
console.log(typeof a)
console.log(typeof c)
console.log(typeof flag)
console.log(typeof testLetConst)

//declaring a function using function expression
let sayHello = function() {
    console.log("Hello, World! Again");
}
sayHello();

//declaring a function using arrow function
let greet = () => {
    console.log("hello, world! again using arrow function");
}

greet();

//array handling

let arr = [1, "TWO", 3, 4, "FIVE", null, false]
console.log(arr)
console.log(arr)
console.log(arr[1])
console.log(arr.length)

var name = undefined
console.log(name)
console.log(typeof name)

let obj = null
console.log(obj)
console.log(typeof obj)

let city = {}
console.log(city)
console.log(typeof city)


//map
let numbers = [1, 2, 3, 4, 5]
console.log(numbers)
let newnumbers = numbers.map((num) => num * 2)
console.log(newnumbers)

//filter
let evenNumbers = numbers.filter((n) => n % 2 === 0)
console.log(evenNumbers)

//reduce
let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(sum)

//for each
const outNumbers = numbers.map((num) => num * 2)
    .filter((n) => 2)
//.foreach ((num) => console.log(num))

console.log(outNumbers)