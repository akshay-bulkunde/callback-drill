const { readFile, writeFile, appendFile, deleteFile, fileProcess, deleteAllFiles } = require('../problem2.js');
const path = require('path');

const filePath = path.join(__dirname, 'lipsum.txt');

async function testFileOperations() {
    try {
        console.log("stating file Operations");
        await fileProcess(filePath);
        console.log("file process completed");

        console.log("Starting to delete files simultaneously");
        await deleteAllFiles();
        
    }
    catch (err) {
        console.log(`Error in processing file : ${err}`);
        throw err;
    }
}

testFileOperations();
