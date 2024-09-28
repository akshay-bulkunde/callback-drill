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

async function writeFile(filePath , data){
    try{
        await fs.writeFile(filePath , data);
        console.log(`Data written in file successfully in ${filePath}`);
        return filePath;
    }catch(err){
        console.error("Error in writing data" , err);
        throw err;
    }
}

