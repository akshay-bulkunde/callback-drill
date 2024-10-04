function runProgram() {
    console.log("Program started");
    const firstPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Hello, friend!", error: null })
        }, 5000);
    })
    console.log(firstPromise);
    console.log("Program in progress...");
    firstPromise.then((message) => {
        console.log(message);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("First promise chain complete!");
            }, 2000);

        });
    })
    .then((message) => {
        console.log(message);
    })

    firstPromise
        .then((result) => {
            console.log(result);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve("Second promise chain complete!")
                }, 10000);
            })
        })
        .then((message) => {
            console.log(message);
        })

}

runProgram();
