// do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 

const fs = require('fs/promises');
const path = require('path');

function createDirectory(dirPath) {
    fs.mkdir(dirPath)
        .then(() => {
            console.log("directory created successfully");
        })
        .catch((error) => {
            console.error("error creating directory -> ", error);
        });
}

