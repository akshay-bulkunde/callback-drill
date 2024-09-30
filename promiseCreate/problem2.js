//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'lipsum.txt');;
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log("error in reading file");
                reject(err);
            } else {
                console.log("file read successfully");
                resolve(data);
            }
        })
    })
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(`Error writing to file ${filePath}: ${err}`)
            } else {
                resolve(filePath);
            }
        })
    })

}

function appendFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) {
                reject(`Error appending to file ${filePath}: ${err}`);
            } else {
                resolve(filePath);
            }
        })
    })
}

function deleteFile(filePath) {
    return new Promise((resolve , reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(`Error deleting file ${filePath}: ${err}`);
            } else {
                resolve(filePath);
            }
        })
    })
    
}

function fileProcess() {
    return readFile(filePath)
        .then((data) => {
            console.log("Original file read successfully");

            const upperCaseData = data.toUpperCase();
            const newFilePath1 = path.join(__dirname, 'file1.txt');
            return writeFile(newFilePath1, upperCaseData);
        })
        .then((newFilePath1) => {
            console.log("Uppercase data written to file1.txt.");
            return appendFile('filenames.txt', 'file1.txt\n').then(() => newFilePath1);
        })
        .then((newFilePath1) => {
            console.log("file1.txt appended to filenames.txt.");
            return readFile(newFilePath1).then((data) => {
                const lowerCaseData = data.toLowerCase().split('. ').join('\n');
                const newFilePath2 = path.join(__dirname, 'file2.txt');
                return writeFile(newFilePath2, lowerCaseData)
            });
        })
        .then((newFilePath2) => {
            console.log("Lowercase data written to file2.txt.");
            return appendFile('filenames.txt', 'file2.txt\n').then(() => newFilePath2);
        })
        .then((newFilePath2) => {
            console.log("file2.txt appended to filenames.txt.");
            return readFile(newFilePath2).then((data) => {
                const sortedData = data.split('\n').sort().join('\n');
                const newFilePath3 = path.join(__dirname, 'file3.txt');
                return writeFile(newFilePath3, sortedData);
            })
        })
        .then((newFilePath3) => {
            console.log("Sorted data written to file3.txt.");
            return appendFile('filenames.txt', 'file3.txt\n');
        }).then(() => {
            console.log("file3.txt appended to filenames.txt.")
        })
        .catch((err) => {
            console.error(err);
        })
}

function deleteAllFiles() {
    return readFile(path.join(__dirname , 'filenames.txt')).then((fileNames) => {
        const files = fileNames.trim().split('\n');
        console.log("file to be deleted :" , files)
        const deletePromises = files.map((file) => deleteFile(file));

        return Promise.all(deletePromises);
    }).then(() => {
        console.log("All files deleted successfully");
    }).catch((err) => {
        console.error(err);
    })
}



module.exports = { fileProcess, deleteAllFiles };