// do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 
const fs = require('fs/promises');
const path = require('path');



async function createDirectory(dirPath, numberOfFiles) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        for (let index = 1; index <= numberOfFiles; index++) {
            const fileName = `file${index}.json`;
            const filePath = path.join(dirPath, fileName);
            await fs.writeFile(filePath, "file data");

        }
        console.log(`Created ${numberOfFiles} files in: ${dirPath}`)

    }
    catch (err) {
        console.error('Error creating files:', err);
    }
}

async function deleteFiles(dirPath) {
    try {
        const files = await fs.readdir(dirPath);
        for (const file of files) {
            let filePath = path.join(dirPath, file);
            await fs.unlink(filePath)
        }

        console.log("All files deleted successfully");
    }
    catch (err) {
        console.log("error in deleting files", err);
    }

}

module.exports = { createDirectory, deleteFiles };