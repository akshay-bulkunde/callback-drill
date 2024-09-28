const { createDirectory, deleteFiles } = require('../problem1.js');
const path = require('path');


const dirPath = path.join(__dirname, 'asyncAwaitDir');
const numberOfFiles = 5;

async function testFileOperations() {
    try {

        await createDirectory(dirPath, numberOfFiles);
        console.log('Directory and files created.');

        await deleteFiles(dirPath);

    } catch (error) {
        console.error('An error occurred during the file operations:', error);
    }
}


testFileOperations();
