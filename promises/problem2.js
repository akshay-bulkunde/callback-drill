
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.


const { writeFile, appendFile } = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');
const filePath = './lipsum.txt';

function readFile(filePath) {
    return fs.readFile(filePath, 'utf-8')
        .then((data) => {
            console.log("File read successfully");
            console.log(data);

            const upperCaseData = data.toUpperCase();
            const newFileName1 = 'file1.txt';
            const newFilePath1 = path.join(__dirname, newFileName1);
            return writeFile(newFilePath1, upperCaseData)
                .then(() => {
                    console.log(`Uppercase data successfully added to ${newFileName1}`);
                    return appendFile('filenames.txt', newFileName1 + '\n');
                })
                .then(() => {
                    console.log(`${newFileName1} is appended in filenames.txt successfully`);
                    return newFilePath1;
                });
        })
        .catch((err) => {
            console.error("Error in reading file", err);
        });
}

function readAndSplit(newFilePath) {
    return fs.readFile(newFilePath, 'utf-8')
        .then((data) => {
            console.log("File read successfully");
            console.log(data);

            const lowerCaseData = data.toLowerCase().split('. ').join('\n');
            console.log(lowerCaseData);

            const newFileName2 = 'file2.txt';
            const newFilePath2 = path.join(__dirname, newFileName2);

            return fs.writeFile(newFilePath2, lowerCaseData)
                .then(() => {
                    console.log(`Lowercase data is added to ${newFileName2}`);
                    return fs.appendFile('filenames.txt', newFileName2 + '\n');
                })
                .then(() => {
                    console.log(`${newFileName2} is added in filenames.txt`);
                    return newFilePath2;
                });
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

function sortData(newFilePath2) {
    return fs.readFile(newFilePath2, 'utf-8')
        .then((data) => {
            console.log("File read successfully:");
            console.log(data);

            const sortedData = data.split('. ').sort();
            const newFileName3 = 'file3.txt';
            const newFilePath3 = path.join(__dirname, newFileName3);

            return fs.writeFile(newFilePath3, sortedData.join('. '))
                .then(() => {
                    console.log(`Sorted data added to ${newFileName3}`);
                    return fs.appendFile('filenames.txt', newFileName3 + '\n');
                })
                .then(() => {
                    console.log(`${newFileName3} is added in filenames.txt successfully`);
                    return newFilePath3; path
                });
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

function deleteFiles() {
    return fs.readFile('filenames.txt', 'utf-8')
        .then((filenames) => {
            console.log("Filenames read successfully");
            const files = filenames.trim().split('\n');

            const deletePromises = files.map((file) => {
                return fs.unlink(file)
                    .then(() => {
                        console.log(`${file} successfully deleted`);
                    })
                    .catch((err) => {
                        console.error(`Error deleting ${file}:`, err);
                    });
            });

            return Promise.all(deletePromises);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}


readFile(filePath)
    .then((newFilePath1) => readAndSplit(newFilePath1))
    .then((newFilePath2) => sortData(newFilePath2))
    .then(() => deleteFiles())
    .catch((err) => {
        console.error("Error in process", err);
    });


