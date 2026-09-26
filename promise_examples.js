let p1 = new Promise(function(resolve, reject){
    setTimeout(() => {
        let error = true;
        if(error) {
            reject("Error: Something went wrong!");
        }
        else{
            resolve ({
                status: 200,
                message: "success"
            })
        }
    }, 1000);
});

// p1.then ((success) => {
//     console.log(success);
// }).catch ((error) => {
//     console.log(error);
// }).finally(() =>{
//     console.log("Promises has been settled")
// });

// Promise chaining
p1.then((success) => {
    console.log(success);
    return success.message
}).then((data) => {
    console.log("this is the second then block.");
    console.log("Data from the first then block:", data);
    return data
}).then((data) =>{
    console.log("this is the third then block.");
    console.log("data from the second then block", data);
}).catch((error) => {
    console.log(error);
}).finally(() =>{
    console.log("promises has been settled(either resolved or rejected).")
});

