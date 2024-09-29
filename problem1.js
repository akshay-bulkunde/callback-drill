const fs = require('fs');
const path = require('path');

function createDirectory(dirPath, callback) {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.error(`Error in creating Directory : ${err}`);
        } else {
            console.log(`Directory is created successfully at : ${dirPath}`);
            callback(dirPath);
        }
    })
}

function createFiles(dirPath, fileCount, callback) {
    let createdFiles = 0;
    for (let index = 1; index <= fileCount; index++) {
        const filename = `file${index}.json`;
        const filePath = path.join(dirPath, filename);
        fs.writeFile(filePath, "File data", (err) => {
            if (err) {
                console.error(`Error in creating file : ${err}`);
            } else {
                console.log(`${filename} is created successfully`);
                createdFiles++;
                if (createdFiles === fileCount) {
                    callback(dirPath);
                }
            }
        })
    }
}

function deleteAllFiles(dirPath, callback) {
    fs.readdir(dirPath, 'utf-8', (err, files) => {
        if (err) {
            console.error(`Error in reading directory : ${err}`);
        } else {
            console.log("Directory read successfully");
            let deletedFiles = 0;
            files.forEach((file) => {
                let filePath = path.join(dirPath, file);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error in deleting : ${file}`);
                    } else {
                        console.log(`${file} deleted successfully`);
                        if (deletedFiles === files.length) {
                            callback();
                        }
                    }
                })
            })
        }
    })
}

module.exports = { createDirectory, createFiles, deleteAllFiles }