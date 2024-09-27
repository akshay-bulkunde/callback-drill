// do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 

// const { promises } = require('dns');
const fs = require('fs/promises');
const path = require('path');

function createDirectory(dirPath) {
    return fs.mkdir(dirPath, { recursive: true })
        .then(() => {
            console.log("directory created successfully");
        })
        .catch((error) => {
            console.error("error creating directory -> ", error);
        });
}

function createFiles(dirPath, numberOfFiles) {
    let filePromises = [];
    for (let index = 1; index <= numberOfFiles; index++) {
        const fileName = `file${index}.json`;
        const filePath = path.join(dirPath, fileName);
        const filePromise = fs.writeFile(filePath, 'file1 data')
            .then(() => {
                console.log(`${fileName} created`)
            })
            .catch((error) => {
                console.error(`error creating ${fileName} `, error);
            })
        filePromises.push(filePromise);

    }

    return Promise.all(filePromises)
        .then(() => {
            console.log(`${numberOfFiles} are created successfully`);
        })
        .catch((error) => {
            console.error("error is process ", error);
        })
}

function deleteFiles(dirPath) {
    return fs.readdir(dirPath) 
        .then((files) => {
            if (files.length === 0) {
                console.log("No files to delete.");
                return;
            }

            
            let deletePromises = files.map((file) => {
                const filePath = path.join(dirPath, file);
                return fs.unlink(filePath)  // Delete the file
                    .then(() => {
                        console.log(`${file} deleted`);
                    })
                    .catch((error) => {
                        console.error(`Error deleting ${file}:`, error);
                    });
            });

           
            return Promise.all(deletePromises)
                .then(() => {
                    console.log("All files deleted successfully.");
                });
        })
        .catch((error) => {
            console.error("Error reading directory:", error);
        });
}



createDirectory('./promiseDir')
    .then(() => createFiles('./promiseDir', 3))  
    .then(() => deleteFiles('./promiseDir'))      
    .catch((err) => {
        console.log("Error in the process", err);
    });

