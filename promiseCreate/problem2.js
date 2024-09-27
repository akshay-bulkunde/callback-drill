//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.

const fs = require('fs');
const path = require('path');
const filePath = './lipsum';
function readFile(filePath) {
    return new Promise((resolve , reject) => {
        fs.readFile(filePath ,'utf-8', (err, data) => {
            if(err){
                console.log("error in reading file");
                reject(err);
            }else{
                console.log("file read successfully");
                resolve(data);
            }
        })
    })
}

function writeFile(filePath , data){
    return new Promise((resolve , reject) => {
        fs.writeFile(filePath , data , (err) => {
            if(err){
                reject(`Error writing to file ${filePath}: ${err}`)
            }else{
                resolve();
            }
        })
    })

}

function appendFile(filePath , data){
    return new Promise((resolve , reject) => {
        fs.appendFile(filePath , data , (err) => {
            if(err){
                reject(`Error appending to file ${filePath}: ${err}`);
            }else{
                resolve();
            }
        })
    })
}

function deleteFile(filePath){
    return fs.unlink(filePath , (err) => {
        if(err){
            reject(`Error deleting file ${filePath}: ${err}`);
        }else{
            resolve();
        }
    })
}

