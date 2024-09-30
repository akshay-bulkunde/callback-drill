function runProgram() {
    console.log("Program started");
    let newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Program failure")
        }, 2000);

        setTimeout(() => {
            resolve("Program complete");
        }, 3000);
    })
    console.log(newPromise);
    console.log("Program in progress...");
    newPromise
        .then((message) => {
            console.log(message);
        })
        .catch((err) => {
            console.error(err);
        });
}

runProgram();