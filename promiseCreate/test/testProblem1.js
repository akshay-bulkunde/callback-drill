const { readFile, writeFile, appendFile, deleteFile, fileProcess, deleteAllFiles } = require('../problem2.js');

fileProcess()
    .then(() => {
        console.log("deleting files...");
        return deleteAllFiles();
    })
    .catch((err) => {
        console.error("Error in process: ", err);
    });