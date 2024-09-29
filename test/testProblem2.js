const { readFiles, updateFilenames, writeUpperCaseFile, writeLowerCaseFile, sortData, deleteFiles } = require('../problem2.js');
const path = require('path');
const filePath = path.join(__dirname, 'lipsum.txt');

readFiles(filePath, (data) => {
    writeUpperCaseFile(data, (newFilePath1) => {
        writeLowerCaseFile(newFilePath1, (newFilePath2) => {
            sortData(newFilePath2, () => {
                deleteFiles(() => {
                    console.log("All files deleted successfully");
                })
            })
        })
    })
})


