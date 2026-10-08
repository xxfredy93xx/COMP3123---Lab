const resolvedPromise = () => {
    
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            
            let success = {'message': 'delayed success!'}
            
            resolve(success);
        
        }, 500);
   
    });
}

resolvedPromise()
    .then((success) => {
        console.log(success);
    })
    .catch((error) => {
        console.log(error);
    });

const rejectedPromise = () => {
   
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
           
            reject({error: 'delayed exception!'});
        
        }, 500);
   
    });

}

rejectedPromise()
    .then((success) => {
        console.log(success);
    })
    .catch((error) => {
        console.log(error);
    });