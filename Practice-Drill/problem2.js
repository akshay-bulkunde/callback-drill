/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
       and rejects after 2 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Program complete" if the promise fulfills
    6. Print out "Program failure" if the promise rejects

    HINT: Use setTimeout for the delay
*/

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