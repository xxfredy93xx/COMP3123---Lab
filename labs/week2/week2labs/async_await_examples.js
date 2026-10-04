function fetchData(a) {
    let p1 = new Promise(function(resolve, reject){
    setTimeout(() => {
        if(a > 10){
            reject({
                status: 400,
                message: "error"
            });
        }
        else{
            resolve ({
                status: 200,
                message: "success"
            });
        }
    }, 1000);
});
return p1;
}
fetchData(5)
    .then((success) =>  {
        console.log(success);
    }).catch((error) => {
        console.log(error);
    })


fetchData(15)
    .then((success) =>  {
        console.log(success);
    }).catch((error) => {
        console.log(error);
    })

// async function
async function fetchDataAsync() {
    return fetchData(5);

}

fetchDataAsync().then((success) => {
    console.log("this is the async function result");
    console.log(success);
}).catch((error) => {
    console.log("this is the async function error")
    console.log(error);
})

async function manageAccount() {
    try{
    console.log("start of fetching data using async")
    let response = await fetchData(5);
    console.log(response);
    response = await fetchData(15)
    console.log("--end of async/await example --")
    }catch(error) {
        console.log(error)
    }
}

manageAccount();