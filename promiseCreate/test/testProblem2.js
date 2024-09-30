const { fileProcess, deleteAllFiles } = require('../problem2.js');

fileProcess()
    .then(() => {
        console.log("File process completed successfully!");

        console.log("Deleting all created files...");
        return deleteAllFiles();
    })
    .catch((err) => {
        console.error("An error occurred during testing:", err);
    });