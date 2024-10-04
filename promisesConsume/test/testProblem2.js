const {readFile, appendFile, writeFile, deleteFile, fileProcess, deleteAllFiles  } = require('../problem2.js');
const path = require('path');

const filePath = path.join(__dirname , 'lipsum.txt');

fileProcess(filePath).then(() => {
    console.log("All file processes completed. Now deleting files...");
    return deleteAllFiles();
}).then(() => {
    console.log("All operations completed successfully");
}).catch((err) => {
    console.error("Error in process " , err);
})