function fetchData(callback){
    setTimeout(() => {
       console.log("Fetching data...")
       callback(); 
    }, 2000);
}
function callback(){
    console.log("Data fetched succesfully!");
}

fetchData(callback);

let successCallback = () => {
    console.log("Data fetched successfully!");
}

let errorCallback = () => {
    console.log("Error fetching data!");
}