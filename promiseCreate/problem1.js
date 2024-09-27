// do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously 

const fs = require('fs');
const path = require('path');

function createDirectory(dirPath){
    return new Promise((resolve , reject) => {
        fs.mkdir(dirPath, {recursive : true} ,  (err) => {
            if(err){
                reject(err);
            }else{
                resolve("directory created successfully");
            }
        })
    })
}

function createFiles(dirPath , numberOfFiles){
    const filePromises = [];
    for(let index = 1;index <= numberOfFiles ; index++){
        const fileName = `file${index}.json`;
        const filePath = path.join(dirPath , fileName);
        const filePromise =  new Promise((resolve , reject) => {
            fs.writeFile(filePath , 'file data' , (err) => {
                if(err){
                    console.error("error in creating file" , err);
                    reject(err);
                }else{
                    console.log("successfully file created");
                    resolve()
                }
            })
        })
        filePromises.push(filePromise);
    }
    return Promise.all(filePromises).then(() => {
        console.log("files created successfully");
    }).catch((err) => {
        console.error("error in creating files" , err);
    })
}

function deleteFiles(dirPath) {
    return new Promise((resolve , reject) => {
        return fs.readdir(dirPath , (err , files) => {
            if(err){
                console.error("error reading directory");
                reject(err);
                return;
            }
            if(files.length === 0){
                console.log("no files to delete");
                resolve();
                return ;
            }

            const deletePromise = files.map((file) => {
                return new Promise((resolve , reject) => {
                    const filePath = path.join(dirPath , file)
                    return fs.unlink(filePath , (err) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log(`${file} deleted successfully`);
                            resolve();
                        }
                    })
                })

            })
            Promise.all(deletePromise).then(() => {
                console.log("all files are deleted successfully");
                resolve();
            }).catch((err) => {
                reject(err);
            })
        })
    })
}


createDirectory('./promiseCreateDir')
    .then(() => createFiles('./promiseCreateDir', 3))  
    .then(() => deleteFiles('./promiseCreateDir'))     
    .catch((err) => console.error(err));