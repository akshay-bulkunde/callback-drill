const { createDirectory, createFiles, deleteAllFiles } = require('../problem1.js');
const path = require('path');
const dirPath = path.join(__dirname , 'jsonFolder');
let numberOfFiles = 3;

createDirectory(dirPath , (dirPath) => {
    createFiles(dirPath , numberOfFiles , () => {
        console.log("All files are created. Now Deleting....");
        deleteAllFiles(dirPath , () => {
            console.log("All Files are deleted successfully");
        })
    })
})