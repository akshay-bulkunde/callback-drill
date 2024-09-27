
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const { writeFile, appendFile } = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');
const filePath = './lipsum.txt'
function readFile(filePath) {
    return fs.readFile(filePath, 'utf-8')
        .then((data) => {
            console.log("file read successfully");
            console.log(data);

            const upperCaseData = data.toUpperCase();
            const newFileName1 = 'file1.txt';
            const newFilePath1 = path.join(__dirname, newFileName1);
            return writeFile(newFilePath1, upperCaseData)
                .then(() => {
                    console.log(`upperCaseData successfully added in ${newFileName1}`);
                    return appendFile('filenames.txt', newFileName1 + '\n')

                }).then(() => {
                    console.log(`${newFileName1} is appended in filenames.txt successfully`);
                    return readAndSplit(newFilePath1);
                });

        })
        .catch((err) => {
            console.error("error in reading file", err);
        });



}

function readAndSplit(newFilePath) {
    fs.readFile(newFilePath, 'utf-8')
        .then((data) => {
            console.log("data read successfully");
            console.log(data);

            const lowerCaseData = data.toLowerCase().split('. ').join('\n');
            const newFileName2 = 'file2.txt';
            const newFilePath2 = path.join(__dirname, newFileName2);
            return fs.writeFile(newFilePath2, lowerCaseData)
                .then(() => {
                    console.log(`lowerCaseData is added in ${newFileName2} successfully`);
                    console.log(lowerCaseData)
                    return appendFile('filenames.txt', newFileName2)
                        .then(() => {
                            console.log(`${newFileName2} is added in filenames.txt`);
                        })
                })


        }).catch((err) => {
            console.error("error in reading file", err);
        })
}

readFile(filePath).then((newFilePath1) => {
    return readAndSplit(newFilePath1)
}).catch((err) => {
    console.error(err);
})
