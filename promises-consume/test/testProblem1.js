const { createDirectory, createFile, deleteFiles } = require('../problem1.js');
const path = require('path');

const dirPath = path.join(__dirname, 'jsonFolder');
const fileCount = 3;

createDirectory(dirPath)
    .then((dirPath) => {
        return createFile(dirPath, fileCount);
    })
    .then((dirPath) => {
        console.log("All files created successfully. Now Deleting...")
        return deleteFiles(dirPath);
    })
    .then(() => {
        console.log("All operations completed successfully");
    })
    .catch((err) => {
        console.error(`Error in the process -> ${err}`);
    })