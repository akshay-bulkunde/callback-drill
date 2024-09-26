const fs = require('fs');
const path = require('path')

function createDirectory(dirPath , numberOfFiles , callback){
    fs.mkdir(dirPath , (error) => {
        if(error){
            console.error(error);
            return;
        }
        console.log("Directory Created Successfully");
        callback(dirPath , numberOfFiles);
        
    })
    
}

function createFiles(dirPath , numberOfFiles , callback){
    let filesCreated = 0;
    for(let i=1;i<=numberOfFiles;i++){
        let fileName = `file${i}.json`;
        let filePath = path.join(dirPath, fileName);
        fs.writeFile(filePath , 'file data' , (error) => {
            if(error){
                console.error(error);
            }else{
                console.log(`file${i}.json created`);
                filesCreated++;
                if(filesCreated === numberOfFiles){
                    callback(dirPath);
                } 
            }
        })
    }
    
}

function deleteFiles(dirPath){
    fs.readdir(dirPath, (error, files) => {
        if (error) {
            console.error(error);
            return;
        }
        let countOfDeletedFiles = 0;
        if (files.length === 0) {
            console.log("No files to delete.");
            return;
        }
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log(error);
                    return;
                }
                countOfDeletedFiles++;
                if (countOfDeletedFiles === files.length) {
                    console.log("All files deleted successfully");
                }
            });
        });
    });
}

module.exports = { createDirectory , createFiles , deleteFiles};