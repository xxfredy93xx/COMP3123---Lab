const mixedArray = ['PIZZA', 10, true, 25, false, 'Wings']

function lowerCaseWords(mixedArray){
return new Promise((resolve, reject) =>{
    if(!Array.isArray(mixedArray)) {
        
        reject("needs to be an array");
        return;
    }

    let words = [];
    for (let item of mixedArray) {
        if (typeof item === 'string'){

            words.push(item.toLowerCase());
        }
    }

    resolve(words);
});

}

lowerCaseWords(mixedArray)
.then(result => console.log(result))
.catch(error => console.log(error));