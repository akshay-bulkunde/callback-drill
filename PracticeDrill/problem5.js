function runProgram() {
    const promise1 = new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 3000);
    });

    const promise2 = new Promise((resolve) => {
        setTimeout(() => {
            resolve(20);
        }, 5000);
    });

    Promise.all([promise1, promise2])
        .then((value) => {
            let sum = value[0] + value[1];
            console.log("Sum of resolve values ->", sum);
        })
        .catch((err) => {
            console.error(err);
        });
}

runProgram();