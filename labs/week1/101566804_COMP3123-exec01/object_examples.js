//object literal 
let person = {
    name: "John",
    age: 30, 
    city: "New York",
    null: null,
    undefined: undefined,
    "full name": "John Doe",

    displayInfo: function(){
        console.log(`name: ${this.name}, age: ${this.age}, city: ${this.city}`);

    },

    // Arrow function does not have 'this' context,
    //it uses the 'this' value from the enclosed lexical context
    displayArrow:() => {
        console.log(this)
        console.log(`name: ${this.name}, age: ${this.age}, city: ${this.city}`);
    
    }
};

console.log(typeof person);
console.log(person);
person.displayInfo();
person.displayArrow();

console.log(person.name);
console.log(person["name"]);
console.log(person.null)
console.log(person["full name"])
const fnm = "full name"
console.log(person[fnm])

//destructing assignment
const {
    name,
    age,
    city: myCityName,
    null:n

} = person

console.log(name, age, myCityName, n)

//more about function
function printData(fnm, lnm, city){
    this.name = fnm
    console.log(`this: ${this}, ${this.name}`)
    console.log(`First name: ${fnm}, Last Name: ${lnm}, City: ${city}`);

    console.log(arguments)
    console.log(`arguments[0]: ${arguments [0]}, arguments[1]: ${arguments [1]}`);
}

printData("Fredy", "Godoy", "Kitchener")

let printDataArrow = (fnm, lnm, city) => {
    console.log(`First Name: ${fnm}, Last Name: ${lnm}, City: ${city}`);

    console.log(arguments) // Error: Arguments is not defined in arrow function

}

printDataArrow("Fredy", "Godoy", "Kitchener")