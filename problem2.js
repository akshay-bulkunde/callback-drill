// Problem 2:

//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.



const fs = require('fs');
const path = require('path');

const filenamesPath = path.join(__dirname, 'filenames.txt');

function readFiles(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error in file reading 1: ${err}`);
        } else {
            console.log(`File read successfully : ${data}`);
            callback(data);
        }
    })
}

function updateFilenames(fileName, callback) {


    fs.appendFile(filenamesPath, `${fileName}\n`, (err) => {
        if (err) {
            console.error(`Erron in appending ${fileName} in filenames.txt`);
        } else {
            console.log(`${fileName} is appended successfully`);
            callback();
        }
    })
}

function writeUpperCaseFile(data, callback) {
    const upperCaseData = data.toUpperCase();
    const newFileName1 = 'file1.txt';
    const newFilePath1 = path.join(__dirname, newFileName1);
    fs.writeFile(newFilePath1, upperCaseData, (err) => {
        if (err) {
            console.error(`Error in writing data ti ${newFileName1} : ${err}`);
        } else {
            console.log(`UpperCaseData added in ${newFileName1} successfully`);
            updateFilenames(newFileName1, () => {
                callback(newFilePath1);
            })
        }
    })
}

function writeLowerCaseFile(newFilePath1, callback) {
    readFiles(newFilePath1, (data) => {
        const lowerCaseData = data.toLowerCase().split('.').join('.\n');
        let newFileName2 = 'file2.txt';
        const newFilepath2 = path.join(__dirname, newFileName2);
        fs.writeFile(newFilepath2, lowerCaseData, (err) => {
            if (err) {
                console.error(`Error in writing lowerCaseData in ${newFileName2}`);
            } else {
                console.log(`lowerCaseData added in ${newFileName2} successfully`);
                updateFilenames(newFileName2, () => {
                    callback(newFilepath2);
                })
            }
        })
    })
}

function sortData(filePath, callback) {
    readFiles(filePath, (data) => {

        console.log(`File read successfully`);
        const sortedData = data.split('.').map(s => s.trim()).sort().join('. ');
        const newFileName3 = 'file3.txt';
        const newFilepath3 = path.join(__dirname, newFileName3);
        fs.writeFile(newFilepath3, sortedData, (err) => {
            if (err) {
                console.error(`Error in adding sortedData in ${newFileName3} : ${err}`);
            } else {
                console.log(`${sortedData} is added in ${newFileName3} successfully`);
                updateFilenames(newFileName3, () => {
                    callback(newFilepath3);
                })
            }
        })

    })
}

function deleteFiles(callback) {
    readFiles(filenamesPath, (data) => {
        const filesToBeDeleted = data.split('\n').filter(Boolean);
        console.log(`Files to be Deleted : ${filesToBeDeleted}`);
        let deletedFiles = 0;
        filesToBeDeleted.forEach((file) => {
            let filePath = path.join(__dirname, file);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Erron in deleting ${file}`);
                } else {
                    console.log(`${file} deleted successfully`);
                    deletedFiles++;
                    if (deletedFiles === filesToBeDeleted.length) {
                        callback();
                    }
                }
            })
        })
    })
}

module.exports = { readFiles, updateFilenames, writeUpperCaseFile, writeLowerCaseFile, sortData, deleteFiles }