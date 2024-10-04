// do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 

const fs = require('fs').promises;
const path = require('path');

function createDirectory(dirPath) {
    return fs.mkdir(dirPath, { recursive: true })
        .then(() => {
            console.log(`Directory created at ${dirPath}`);
            return dirPath
        })
        .catch((err) => {
            console.error(`Error in creating directory ->  ${err}`);
            throw err;
        })
}

function createFile(dirPath, fileCount) {
    const filePromises = [];
    for (let index = 1; index <= fileCount; index++) {
        const newFileName = `file${index}.json`;
        const newFilePath = path.join(dirPath, newFileName);
        let filePromise = fs.writeFile(newFilePath, "json data")
            .then(() => {
                console.log(`File created : ${newFileName}`);
            })
            .catch((err) => {
                console.error(`Error in creating ${newFileName} -> ${err}`);
            })
        filePromises.push(filePromise);

    }
    return Promise.all(filePromises).then(() => {
        console.log(`All files created successfully`);
        return dirPath;
    })
}

function deleteFiles(dirPath) {
    return fs.readdir(dirPath, 'utf-8')
        .then((files) => {
            console.log("All files read successfully");
            let deletePromises = files.map((file) => {
                const filePath = path.join(dirPath, file);
                return fs.unlink(filePath)
                    .then(() => {
                        console.log(`file deleted : ${file}`);
                    })
                    .catch((err) => {
                        console.error(`Error in deleting ${file} -> ${err}`);
                    })
            })
            return Promise.all(deletePromises);

        })
        .catch((err) => {
            console.error(`Error in reading directory at -> ${err}`);
        })
}


module.exports = { createDirectory, createFile, deleteFiles };
