//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require('fs/promises');
const path = require('path');

async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        console.log("file read successfully");
        return data;
    }
    catch (err) {
        console.log("error in reading file", err);
        throw err;
    }

}

async function writeFile(filePath, data) {
    try {
        await fs.writeFile(filePath, data);
        console.log(`Data written in file successfully in ${filePath}`);
        return filePath;
    } catch (err) {
        console.error("Error in writing data", err);
        throw err;
    }
}

async function appendFile(filePath, data) {
    try {
        await fs.appendFile(filePath, data);
        console.log(`Data appended in ${filePath}`);
        return filePath;
    }
    catch (err) {
        console.error(`Error in appending to ${filePath} : ${err}`);
        throw err;
    }
}

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath)
        console.log(`File deleted : ${filePath}`);
        return filePath;

    }
    catch (err) {
        console.error(`Error in deleting file : ${filePath}`);
        throw err;
    }

}

async function fileProcess(initialFilePath) {
    try {
        const data = await readFile(initialFilePath);
        console.log("Original file read successfully");

        const upperCaseData = data.toUpperCase();
        const newFileName1 = 'file1.txt';
        const newFilePath1 = path.join(__dirname, newFileName1);
        await writeFile(newFilePath1, upperCaseData);
        console.log(`upperCaseData is added in ${newFileName1}`);

        await appendFile('filenames.txt', `${newFileName1}\n`);
        console.log(`${newFileName1} is appended in filenames.txt`);

        const data1 = await readFile(newFilePath1);
        const lowerCaseData = data1.toLocaleLowerCase().split('. ').join('\n');
        const newFileName2 = 'file2.txt';
        const newFilePath2 = path.join(__dirname, newFileName2);
        await writeFile(newFilePath2, lowerCaseData);
        console.log(`lowerCaseData is added in ${newFileName2} successfully`);

        await appendFile('filenames.txt', `${newFileName2}\n`);
        console.log(`${newFileName2} is appended in filenames.txt successfully`);

        const data2 = await readFile(newFilePath2);
        const sortedData = data2.split('\n').sort().join('\n');
        const newFileName3 = 'file3.txt';
        const newFilePath3 = path.join(__dirname, 'file3.txt');
        await writeFile(newFilePath3, sortedData);
        console.log(`sortedData is added in ${newFileName3}`);

        await appendFile('filenames.txt', `${newFileName3}\n`);
        console.log(`${newFileName3} is appended in filenames.txt`);


    }
    catch (err) {
        console.error(`Error in reading file : ${err}`);
        throw err;
    }
}

async function deleteAllFiles() {
    try {
        const fileNames = await readFile(path.join(__dirname, 'filenames.txt'));
        const files = fileNames.trim().split('\n');
        console.log(`Files to be deleted : ${files}`);

        for(const file of files){
            await deleteFile(file);
        }
        console.log("All files deleted successfully");
    }
    catch (err) {
        console.error(`Error in deleting files : ${err}`);
        throw err;
    }
}

module.exports = { readFile, writeFile, appendFile, deleteFile, fileProcess, deleteAllFiles };